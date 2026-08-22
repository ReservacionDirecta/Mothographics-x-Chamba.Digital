import React, { useMemo } from "react";
import { motion } from "motion/react";

const Orb = ({
  size,
  color,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      left: `${x}%`,
      top: `${y}%`,
      filter: "blur(40px)",
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.35, 0.15],
      x: [0, 20, -10, 0],
      y: [0, -15, 10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const Ring = ({
  size,
  strokeWidth,
  rotationSpeed,
  dashArray,
  opacity,
  color,
  delay,
}: {
  size: number;
  strokeWidth: number;
  rotationSpeed: number;
  dashArray: string;
  opacity: number;
  color: string;
  delay: number;
}) => (
  <motion.div
    className="absolute"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  >
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      animate={{ rotate: 360 * rotationSpeed }}
      transition={{ duration: 20 / Math.abs(rotationSpeed), repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        opacity={opacity}
      />
    </motion.svg>
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: 6,
        height: 6,
        top: 0,
        left: "50%",
        marginLeft: -3,
        boxShadow: `0 0 12px ${color}`,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const Particle = ({
  x,
  y,
  size,
  delay,
  duration,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
    }}
    animate={{
      opacity: [0, 0.8, 0],
      y: [0, -60],
      scale: [0.5, 1, 0.3],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
);

const GridLines = () => {
  const lines = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        isHorizontal: i < 4,
        position: 15 + (i % 4) * 22,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute"
          style={{
            ...(line.isHorizontal
              ? { left: 0, right: 0, top: `${line.position}%`, height: 1 }
              : { top: 0, bottom: 0, left: `${line.position}%`, width: 1 }),
            background: line.isHorizontal
              ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.08), transparent)"
              : "linear-gradient(180deg, transparent, rgba(59,130,246,0.08), transparent)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 4 + line.id * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const PulsingCore = () => (
  <motion.div
    className="absolute"
    style={{
      left: "50%",
      top: "50%",
      marginLeft: -25,
      marginTop: -25,
    }}
  >
    <motion.div
      className="w-[50px] h-[50px] rounded-full"
      style={{
        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        boxShadow: "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
      }}
      animate={{
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
          "0 0 80px rgba(59,130,246,0.6), 0 0 160px rgba(59,130,246,0.25)",
          "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-[8px] rounded-full bg-white/20"
      style={{ filter: "blur(4px)" }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const DataStream = ({
  startX,
  startY,
  endX,
  endY,
  delay,
  color,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  color: string;
}) => (
  <motion.div
    className="absolute"
    style={{
      left: `${startX}%`,
      top: `${startY}%`,
      width: 2,
      height: 2,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 8px ${color}`,
    }}
    animate={{
      left: [`${startX}%`, `${endX}%`],
      top: [`${startY}%`, `${endY}%`],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
);

export const HeroMotionGraphics = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 40 + Math.random() * 50,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  const dataStreams = useMemo(
    () => [
      { startX: 20, startY: 30, endX: 50, endY: 50, delay: 0, color: "#3b82f6" },
      { startX: 80, startY: 25, endX: 50, endY: 50, delay: 1, color: "#60a5fa" },
      { startX: 15, startY: 70, endX: 50, endY: 50, delay: 2, color: "#3b82f6" },
      { startX: 85, startY: 65, endX: 50, endY: 50, delay: 0.5, color: "#60a5fa" },
      { startX: 35, startY: 20, endX: 50, endY: 50, delay: 1.5, color: "#93c5fd" },
      { startX: 70, startY: 80, endX: 50, endY: 50, delay: 2.5, color: "#93c5fd" },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <GridLines />

      <Orb size={300} color="rgba(59,130,246,0.25)" x={20} y={10} delay={0} duration={8} />
      <Orb size={250} color="rgba(96,165,250,0.2)" x={70} y={15} delay={2} duration={10} />
      <Orb size={200} color="rgba(29,78,216,0.2)" x={45} y={60} delay={4} duration={12} />

      <Ring
        size={320}
        strokeWidth={1.5}
        rotationSpeed={1}
        dashArray="8 16"
        opacity={0.15}
        color="#3b82f6"
        delay={0.3}
      />
      <Ring
        size={240}
        strokeWidth={2}
        rotationSpeed={-1.5}
        dashArray="12 8"
        opacity={0.25}
        color="#60a5fa"
        delay={0.6}
      />
      <Ring
        size={160}
        strokeWidth={1}
        rotationSpeed={2}
        dashArray="4 12"
        opacity={0.2}
        color="#93c5fd"
        delay={0.9}
      />

      <PulsingCore />

      {dataStreams.map((s, i) => (
        <DataStream key={i} {...s} />
      ))}

      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} duration={p.duration} />
      ))}
    </div>
  );
};
