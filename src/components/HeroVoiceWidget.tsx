import { Mic, MicOff, Phone } from "lucide-react";
import headshotImg from "@/assets/headshot.png";
import { motion, AnimatePresence } from "framer-motion";
import { useVapi } from "@/hooks/useVapi";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

const HeroVoiceWidget = () => {
  const { isActive, isSpeaking, isLoading, transcript, toggleConversation } = useVapi();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Avatar with glow ring */}
      <motion.button
        onClick={toggleConversation}
        disabled={isLoading}
        className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden cursor-pointer border-2 border-primary/50 transition-all duration-300 ${
          isActive && isSpeaking
            ? "animate-speaking-pulse"
            : isActive
            ? "glow-blue-strong"
            : "animate-pulse-glow"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Avatar image */}
        <img src={headshotImg} alt="LaSean Pickens" className="w-full h-full object-cover" />

        {/* Overlay when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/10 flex items-center justify-center"
            >
              {isSpeaking && (
                <div className="flex gap-1 items-end">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{
                        height: [8, 20 + Math.random() * 16, 8],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.3,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Status text & CTA */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
          Leverage Beats <span className="text-gradient-blue">Labor</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          I Build the Systems That Prove It.
        </p>

        <motion.button
          onClick={toggleConversation}
          disabled={isLoading}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
            isActive
              ? "bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90 glow-blue"
          }`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Connecting...
            </>
          ) : isActive ? (
            <>
              <Phone className="w-4 h-4" />
              End Conversation
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Talk to LaSean
            </>
          )}
        </motion.button>

        {!isActive && (
          <p className="text-muted-foreground text-xs">Click to start a voice conversation</p>
        )}
      </div>

      {/* Desktop-only transcript box */}
      {!isMobile && isActive && transcript.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg glass-dark rounded-xl p-4 mt-2"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Live Transcript</span>
          </div>
          <div ref={scrollRef} className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
            {transcript.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm ${
                  msg.role === "assistant" ? "text-primary" : "text-foreground/80"
                }`}
              >
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mr-2">
                  {msg.role === "assistant" ? "LaSean" : "You"}
                </span>
                {msg.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroVoiceWidget;
