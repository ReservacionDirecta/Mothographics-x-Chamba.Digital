import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const FloatingShape = ({
  x, y, size, rotation, speed, shape, color, blur,
}: {
  x: number; y: number; size: number; rotation: number;
  speed: number; shape: "circle" | "square" | "triangle";
  color: string; blur: number;
}) => {
  const cls = shape === "circle" ? "rounded-full" : shape === "square" ? "rounded-lg" : "";
  return (
    <motion.div
      className={`absolute ${cls}`}
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: color,
        filter: `blur(${blur}px)`,
        clipPath: shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
      }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -5, 8, 0],
        rotate: [rotation, rotation + 180, rotation + 360],
        scale: [1, 1.05, 0.98, 1.02, 1],
      }}
      transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const ParallaxOrb = ({
  x, y, size, color, scrollRange, yRange,
}: {
  x: number; y: number; size: number; color: string;
  scrollRange: [number, number]; yRange: [number, number];
}) => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const yVal = useTransform(smooth, scrollRange, yRange);
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(30px)", y: yVal,
      }}
    />
  );
};

export const FloatingElements = () => {
  const shapes = useMemo(
    () => [
      { x: 8, y: 12, size: 6, rotation: 0, speed: 20, shape: "circle" as const, color: "rgba(59,130,246,0.08)", blur: 1 },
      { x: 85, y: 8, size: 10, rotation: 45, speed: 25, shape: "square" as const, color: "rgba(59,130,246,0.06)", blur: 2 },
      { x: 15, y: 35, size: 4, rotation: 120, speed: 18, shape: "triangle" as const, color: "rgba(96,165,250,0.1)", blur: 1 },
      { x: 90, y: 30, size: 8, rotation: 60, speed: 22, shape: "circle" as const, color: "rgba(59,130,246,0.05)", blur: 3 },
      { x: 5, y: 55, size: 5, rotation: 200, speed: 24, shape: "square" as const, color: "rgba(96,165,250,0.07)", blur: 2 },
      { x: 92, y: 60, size: 7, rotation: 30, speed: 19, shape: "triangle" as const, color: "rgba(59,130,246,0.06)", blur: 1 },
      { x: 20, y: 75, size: 4, rotation: 90, speed: 21, shape: "circle" as const, color: "rgba(59,130,246,0.08)", blur: 2 },
      { x: 78, y: 82, size: 6, rotation: 150, speed: 23, shape: "square" as const, color: "rgba(96,165,250,0.06)", blur: 1 },
      { x: 45, y: 90, size: 5, rotation: 270, speed: 26, shape: "triangle" as const, color: "rgba(59,130,246,0.05)", blur: 2 },
      { x: 65, y: 15, size: 3, rotation: 10, speed: 17, shape: "circle" as const, color: "rgba(59,130,246,0.09)", blur: 1 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
      <ParallaxOrb x={10} y={5} size={200} color="rgba(59,130,246,0.1)" scrollRange={[0, 1]} yRange={[0, -200]} />
      <ParallaxOrb x={70} y={15} size={250} color="rgba(96,165,250,0.08)" scrollRange={[0, 1]} yRange={[0, -150]} />
      <ParallaxOrb x={30} y={40} size={180} color="rgba(59,130,246,0.06)" scrollRange={[0, 1]} yRange={[0, -250]} />
      <ParallaxOrb x={80} y={55} size={220} color="rgba(96,165,250,0.07)" scrollRange={[0, 1]} yRange={[0, -180]} />
      <ParallaxOrb x={15} y={75} size={160} color="rgba(59,130,246,0.08)" scrollRange={[0, 1]} yRange={[0, -120]} />
    </div>
  );
};
