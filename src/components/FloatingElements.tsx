import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

const ParallaxOrb = ({
  x, y, size, color, progress, yRange,
}: {
  x: number; y: number; size: number; color: string;
  progress: MotionValue<number>;
  yRange: [number, number];
}) => {
  const yVal = useTransform(progress, [0, 1], yRange);
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)", y: yVal,
      }}
    />
  );
};

export const FloatingElements = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  const orbs = useMemo(() => [
    { x: 15, y: 8, size: 240, color: "rgba(59,130,246,0.08)", yRange: [0, -180] as [number, number] },
    { x: 78, y: 18, size: 200, color: "rgba(96,165,250,0.06)", yRange: [0, -120] as [number, number] },
    { x: 40, y: 55, size: 180, color: "rgba(59,130,246,0.05)", yRange: [0, -200] as [number, number] },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((o, i) => (
        <ParallaxOrb key={i} {...o} progress={smooth} />
      ))}
    </div>
  );
};