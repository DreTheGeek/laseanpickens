import { useState, useCallback, useRef, useEffect } from "react";

const VAPI_PUBLIC_KEY = "8dcd034c-8b77-41aa-b9a8-e9763fe6509a";
const VAPI_AGENT_ID = "8ed29746-98b6-4529-bf51-13882f74acac";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

export function useVapi() {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const vapiRef = useRef<any>(null);

  const addTranscriptMessage = useCallback((role: "user" | "assistant", text: string) => {
    setTranscript((prev) => [...prev, { role, text, timestamp: Date.now() }]);
  }, []);

  const startConversation = useCallback(async () => {
    try {
      setIsLoading(true);
      setTranscript([]);
      const Vapi = (await import("@vapi-ai/web")).default;
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      vapiRef.current = vapi;

      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));
      vapi.on("message", (msg: any) => {
        if (msg.type === "transcript" && msg.transcriptType === "final") {
          addTranscriptMessage(msg.role, msg.transcript);
        }
      });
      vapi.on("call-end", () => {
        setIsActive(false);
        setIsSpeaking(false);
        setIsLoading(false);
      });

      await vapi.start(VAPI_AGENT_ID);
      setIsActive(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Vapi error:", err);
      setIsLoading(false);
    }
  }, [addTranscriptMessage]);

  const stopConversation = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      vapiRef.current = null;
    }
    setIsActive(false);
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const toggleConversation = useCallback(() => {
    if (isActive) {
      stopConversation();
    } else {
      startConversation();
    }
  }, [isActive, startConversation, stopConversation]);

  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  return {
    isActive,
    isSpeaking,
    isLoading,
    transcript,
    toggleConversation,
  };
}
