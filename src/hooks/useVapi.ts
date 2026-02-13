import { useState, useCallback, useRef, useEffect } from "react";

// Placeholder Vapi configuration: replace with your real credentials
const VAPI_PUBLIC_KEY = "YOUR_VAPI_PUBLIC_KEY";
const VAPI_AGENT_ID = "YOUR_VAPI_AGENT_ID";

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
    if (VAPI_PUBLIC_KEY === "YOUR_VAPI_PUBLIC_KEY") {
      // Demo mode: simulate a conversation
      setIsLoading(true);
      setTranscript([]);
      setTimeout(() => {
        setIsLoading(false);
        setIsActive(true);
        setIsSpeaking(true);
        addTranscriptMessage("assistant", "What's good? I'm LaSean. Ask me about AI automation, building systems, or scaling your business. What are you working on?");
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1500);
      return;
    }

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
