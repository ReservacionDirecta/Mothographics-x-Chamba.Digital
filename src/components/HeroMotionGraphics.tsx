import React, { useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

const Orb = ({
  size, color, x, y, delay, duration, scatterX, scatterY, started,
}: {
  size: number; color: string; x: number; y: number;
  delay: number; duration: number; scatterX: number; scatterY: number; started: boolean;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      left: `${x}%`, top: `${y}%`, filter: "blur(40px)",
    }}
    initial={{ opacity: 0, scale: 0.3, x: scatterX, y: scatterY }}
    animate={started ? {
      opacity: [0, 0.15, 0.35, 0.15], scale: [0.3, 1, 1.3, 1],
      x: [scatterX, 0, 20, -10, 0], y: [scatterY, 0, -15, 10, 0],
    } : { opacity: 0 }}
    transition={{ duration, delay, ease: "easeOut", times: [0, 0.15, 0.5, 0.85, 1] }}
  />
);

const Ring = ({
  size, strokeWidth, rotationSpeed, dashArray, opacity, color, delay, started,
}: {
  size: number; strokeWidth: number; rotationSpeed: number;
  dashArray: string; opacity: number; color: string; delay: number; started: boolean;
}) => (
  <motion.div
    className="absolute"
    style={{ width: size, height: size, left: "50%", top: "50%", marginLeft: -size / 2, marginTop: -size / 2 }}
    initial={{ opacity: 0, scale: 0, rotate: -90 }}
    animate={started ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0 }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      animate={started ? { rotate: 360 * rotationSpeed } : undefined}
      transition={{ duration: 20 / Math.abs(rotationSpeed), repeat: Infinity, ease: "linear" }}
    >
      <motion.circle
        cx={size / 2} cy={size / 2} r={size / 2 - strokeWidth}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={dashArray} opacity={opacity}
        initial={{ pathLength: 0 }}
        animate={started ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.8, delay: delay + 0.3, ease: "easeInOut" }}
      />
    </motion.svg>
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ width: 6, height: 6, top: 0, left: "50%", marginLeft: -3, boxShadow: `0 0 12px ${color}` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={started ? { opacity: [0.5, 1, 0.5], scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 2, delay: delay + 0.8, repeat: started ? Infinity : 0, ease: "easeInOut" }}
    />
  </motion.div>
);

const Particle = ({
  x, y, size, delay, duration, scatterX, scatterY, started,
}: {
  x: number; y: number; size: number; delay: number;
  duration: number; scatterX: number; scatterY: number; started: boolean;
}) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, x: scatterX, y: scatterY, scale: 0 }}
    animate={started ? {
      opacity: [0, 0, 0.8, 0], x: [scatterX, 0, 0, 0],
      y: [scatterY, 0, -60, -80], scale: [0, 1, 1, 0.3],
    } : { opacity: 0 }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeOut", times: [0, 0.1, 0.5, 1] }}
  />
);

const GridLines = ({ started }: { started: boolean }) => {
  const lines = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i, isHorizontal: i < 4, position: 15 + (i % 4) * 22,
    })), []);
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
          initial={{ opacity: 0, scaleX: line.isHorizontal ? 0 : 1, scaleY: line.isHorizontal ? 1 : 0 }}
          animate={started ? { opacity: [0, 0.3, 0.6, 0.3], scaleX: 1, scaleY: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: line.id * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
};

const PulsingCore = ({ started }: { started: boolean }) => (
  <motion.div
    className="absolute"
    style={{ left: "50%", top: "50%", marginLeft: -25, marginTop: -25 }}
    initial={{ opacity: 0, scale: 0 }}
    animate={started ? { opacity: 1, scale: 1 } : { opacity: 0 }}
    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      className="w-[50px] h-[50px] rounded-full"
      style={{
        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        boxShadow: "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
      }}
      animate={started ? {
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
          "0 0 80px rgba(59,130,246,0.6), 0 0 160px rgba(59,130,246,0.25)",
          "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
        ],
      } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    />
    <motion.div
      className="absolute inset-[8px] rounded-full bg-white/20"
      style={{ filter: "blur(4px)" }}
      animate={started ? { opacity: [0.3, 0.6, 0.3] } : undefined}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    />
  </motion.div>
);

const DataStream = ({
  startX, startY, endX, endY, delay, color, started,
}: {
  startX: number; startY: number; endX: number; endY: number;
  delay: number; color: string; started: boolean;
}) => (
  <motion.div
    className="absolute"
    style={{ left: `${startX}%`, top: `${startY}%`, width: 2, height: 2, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={started ? {
      left: [`${startX}%`, `${endX}%`], top: [`${startY}%`, `${endY}%`],
      opacity: [0, 0, 1, 1, 0], scale: [0, 0.5, 1, 1, 0.5],
    } : { opacity: 0 }}
    transition={{ duration: 3, repeat: Infinity, delay, ease: "linear", times: [0, 0.05, 0.3, 0.8, 1] }}
  />
);

const HexNode = ({
  x, y, size, delay, color, started,
}: {
  x: number; y: number; size: number; delay: number; color: string; started: boolean;
}) => {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${size / 2 + (size / 2) * Math.cos(angle)},${size / 2 + (size / 2) * Math.sin(angle)}`;
  }).join(" ");
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={started ? { opacity: [0, 0.6, 0.4], scale: [0, 1.1, 1], rotate: 0 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <polygon points={points} fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      </svg>
    </motion.div>
  );
};

const ConnectionLine = ({
  x1, y1, x2, y2, delay, color, started,
}: {
  x1: number; y1: number; x2: number; y2: number;
  delay: number; color: string; started: boolean;
}) => (
  <motion.line
    x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
    stroke={color} strokeWidth="0.5"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={started ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
    transition={{ duration: 1.2, delay, ease: "easeInOut" }}
  />
);

export const HeroMotionGraphics = () => {
  const ref = useRef(null);
  const started = useInView(ref, { once: true, amount: 0.2 });

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: 40 + Math.random() * 50,
      size: 1.5 + Math.random() * 2.5, delay: 1 + Math.random() * 4,
      duration: 3 + Math.random() * 3,
      scatterX: (Math.random() - 0.5) * 300, scatterY: (Math.random() - 0.5) * 300,
    })), []);

  const dataStreams = useMemo(() => [
    { startX: 20, startY: 30, endX: 50, endY: 50, delay: 1.5, color: "#3b82f6" },
    { startX: 80, startY: 25, endX: 50, endY: 50, delay: 2, color: "#60a5fa" },
    { startX: 15, startY: 70, endX: 50, endY: 50, delay: 2.5, color: "#3b82f6" },
    { startX: 85, startY: 65, endX: 50, endY: 50, delay: 1.8, color: "#60a5fa" },
    { startX: 35, startY: 20, endX: 50, endY: 50, delay: 2.2, color: "#93c5fd" },
    { startX: 70, startY: 80, endX: 50, endY: 50, delay: 2.8, color: "#93c5fd" },
  ], []);

  const hexNodes = useMemo(() => [
    { x: 10, y: 15, size: 28, delay: 0.8, color: "#3b82f6" },
    { x: 85, y: 12, size: 22, delay: 1.0, color: "#60a5fa" },
    { x: 8, y: 65, size: 20, delay: 1.2, color: "#93c5fd" },
    { x: 88, y: 58, size: 26, delay: 1.1, color: "#3b82f6" },
    { x: 25, y: 85, size: 18, delay: 1.3, color: "#60a5fa" },
    { x: 72, y: 80, size: 24, delay: 0.9, color: "#93c5fd" },
    { x: 50, y: 8, size: 16, delay: 1.4, color: "#3b82f6" },
    { x: 50, y: 90, size: 20, delay: 1.5, color: "#60a5fa" },
  ], []);

  const connections = useMemo(() => [
    { x1: 12, y1: 18, x2: 50, y2: 50, delay: 1.6, color: "#3b82f6" },
    { x1: 86, y1: 15, x2: 50, y2: 50, delay: 1.7, color: "#60a5fa" },
    { x1: 10, y1: 67, x2: 50, y2: 50, delay: 1.8, color: "#93c5fd" },
    { x1: 89, y1: 60, x2: 50, y2: 50, delay: 1.9, color: "#3b82f6" },
    { x1: 26, y1: 87, x2: 50, y2: 50, delay: 2.0, color: "#60a5fa" },
    { x1: 73, y1: 82, x2: 50, y2: 50, delay: 2.1, color: "#93c5fd" },
  ], []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <GridLines started={started} />
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {connections.map((c, i) => (
          <ConnectionLine key={i} {...c} started={started} />
        ))}
      </svg>
      {hexNodes.map((n, i) => (
        <HexNode key={i} {...n} started={started} />
      ))}
      <Orb size={300} color="rgba(59,130,246,0.25)" x={20} y={10} delay={0.3} duration={8} scatterX={-200} scatterY={-150} started={started} />
      <Orb size={250} color="rgba(96,165,250,0.2)" x={70} y={15} delay={0.6} duration={10} scatterX={200} scatterY={-100} started={started} />
      <Orb size={200} color="rgba(29,78,216,0.2)" x={45} y={60} delay={0.9} duration={12} scatterX={-100} scatterY={200} started={started} />
      <Ring size={320} strokeWidth={1.5} rotationSpeed={1} dashArray="8 16" opacity={0.15} color="#3b82f6" delay={0.2} started={started} />
      <Ring size={240} strokeWidth={2} rotationSpeed={-1.5} dashArray="12 8" opacity={0.25} color="#60a5fa" delay={0.5} started={started} />
      <Ring size={160} strokeWidth={1} rotationSpeed={2} dashArray="4 12" opacity={0.2} color="#93c5fd" delay={0.8} started={started} />
      <PulsingCore started={started} />
      {dataStreams.map((s, i) => (
        <DataStream key={i} {...s} started={started} />
      ))}
      {particles.map((p) => (
        <Particle key={p.id} {...p} started={started} />
      ))}
    </div>
  );
};
