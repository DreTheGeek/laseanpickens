import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SESSION_KEY = "intro_played";

export default function IntroAnimation() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("auto");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "true");

    setVisible(true);
    document.body.style.overflow = "hidden";

    const fadeStart = isMobile ? 1000 : 1800;
    const totalDuration = isMobile ? 1500 : 2500;

    const pointerTimer = setTimeout(() => {
      setPointerEvents("none");
    }, fadeStart);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, totalDuration);

    return () => {
      clearTimeout(pointerTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  if (!visible) return null;

  const fadeDuration = isMobile ? 0.5 : 0.7;
  const textDelay = isMobile ? 0.2 : 0.3;
  const glowDelay = isMobile ? 0.5 : 0.8;
  const overlayFadeDelay = isMobile ? 1.0 : 1.8;

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0f1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents,
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: fadeDuration,
        delay: overlayFadeDelay,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: textDelay, ease: "easeOut" }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <motion.span
          style={{
            display: "block",
            fontSize: "clamp(2rem, 8vw, 5rem)",
            color: "#ffffff",
            lineHeight: 1.1,
          }}
          initial={{ textShadow: "0 0 0px transparent" }}
          animate={{
            textShadow: [
              "0 0 0px transparent",
              "0 0 20px hsl(217 91% 60% / 0.4), 0 0 60px hsl(217 91% 60% / 0.15)",
              "0 0 30px hsl(217 91% 60% / 0.5), 0 0 80px hsl(217 91% 60% / 0.2)",
            ],
          }}
          transition={{ duration: 0.6, delay: glowDelay, ease: "easeOut" }}
        >
          LASEAN
        </motion.span>
        <motion.span
          style={{
            display: "block",
            fontSize: "clamp(2rem, 8vw, 5rem)",
            color: "hsl(217, 91%, 60%)",
            lineHeight: 1.1,
          }}
          initial={{
            textShadow: "0 0 0px transparent",
          }}
          animate={{
            textShadow: [
              "0 0 0px transparent",
              "0 0 25px hsl(217 91% 60% / 0.7), 0 0 80px hsl(217 91% 60% / 0.35)",
              "0 0 40px hsl(217 91% 60% / 0.9), 0 0 110px hsl(217 91% 60% / 0.5)",
            ],
          }}
          transition={{ duration: 0.6, delay: glowDelay, ease: "easeOut" }}
        >
          PICKENS
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
