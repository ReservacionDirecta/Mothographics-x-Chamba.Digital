import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    window.addEventListener("mousedown", () => setClicking(true));
    window.addEventListener("mouseup", () => setClicking(false));

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference hidden lg:block"
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-white/40"
        animate={{
          width: hovering ? 56 : clicking ? 28 : 36,
          height: hovering ? 56 : clicking ? 28 : 36,
          borderColor: hovering ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{
          width: hovering ? 6 : clicking ? 10 : 4,
          height: hovering ? 6 : clicking ? 10 : 4,
          backgroundColor: hovering ? "#3b82f6" : "#ffffff",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </motion.div>
  );
};
