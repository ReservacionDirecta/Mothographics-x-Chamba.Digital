import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  MotionValue,
} from "motion/react";

const Orb = ({
  size,
  color,
  x,
  y,
  progress,
  scatterX,
  scatterY,
  assembleAt,
}: {
  size: number;
  color: string;
  x: number;
  y: number;
  progress: MotionValue<number>;
  scatterX: number;
  scatterY: number;
  assembleAt: number;
}) => {
  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.15],
    [0, 0.25],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [0.3, 1],
    { clamp: true }
  );
  const translateX = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [scatterX, 0],
    { clamp: true }
  );
  const translateY = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [scatterY, 0],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: `${x}%`,
        top: `${y}%`,
        filter: "blur(40px)",
        opacity,
        scale,
        x: translateX,
        y: translateY,
      }}
    />
  );
};

const Ring = ({
  size,
  strokeWidth,
  rotationSpeed,
  dashArray,
  opacity: finalOpacity,
  color,
  progress,
  assembleAt,
}: {
  size: number;
  strokeWidth: number;
  rotationSpeed: number;
  dashArray: string;
  opacity: number;
  color: string;
  progress: MotionValue<number>;
  assembleAt: number;
}) => {
  const [isAssembled, setIsAssembled] = useState(false);

  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.15],
    [0, finalOpacity],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [0, 1],
    { clamp: true }
  );
  const assemblyRotate = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [-90, 0],
    { clamp: true }
  );
  const pathLength = useTransform(
    progress,
    [assembleAt + 0.1, assembleAt + 0.35],
    [0, 1],
    { clamp: true }
  );
  const dotOpacity = useTransform(
    progress,
    [assembleAt + 0.2, assembleAt + 0.3],
    [0, 1],
    { clamp: true }
  );

  useMotionValueEvent(progress, "change", (latest) => {
    setIsAssembled(latest > assembleAt + 0.3);
  });

  const containerRotate = isAssembled ? undefined : assemblyRotate;

  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{ opacity, scale, rotate: containerRotate }}
        animate={
          isAssembled
            ? { rotate: 360 * rotationSpeed }
            : undefined
        }
        transition={
          isAssembled
            ? {
                duration: 20 / Math.abs(rotationSpeed),
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
      >
        <motion.svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            style={{ pathLength }}
          />
        </motion.svg>
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          top: 0,
          left: "50%",
          marginLeft: -3,
          boxShadow: `0 0 12px ${color}`,
          opacity: dotOpacity,
        }}
        animate={
          isAssembled
            ? { opacity: [0.5, 1, 0.5] }
            : undefined
        }
        transition={
          isAssembled
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
    </div>
  );
};

const Particle = ({
  x,
  y,
  size,
  progress,
  scatterX,
  scatterY,
  assembleAt,
}: {
  x: number;
  y: number;
  size: number;
  progress: MotionValue<number>;
  scatterX: number;
  scatterY: number;
  assembleAt: number;
}) => {
  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.05, assembleAt + 0.2, assembleAt + 0.35],
    [0, 0, 0.8, 0],
    { clamp: true }
  );
  const translateX = useTransform(
    progress,
    [assembleAt, assembleAt + 0.1, assembleAt + 0.2, assembleAt + 0.35],
    [scatterX, 0, 0, 0],
    { clamp: true }
  );
  const translateY = useTransform(
    progress,
    [assembleAt, assembleAt + 0.1, assembleAt + 0.2, assembleAt + 0.35],
    [scatterY, 0, -60, -80],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [assembleAt, assembleAt + 0.1, assembleAt + 0.2, assembleAt + 0.35],
    [0, 1, 1, 0.3],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        x: translateX,
        y: translateY,
        scale,
      }}
    />
  );
};

const GridLine = ({
  line,
  progress,
  index,
}: {
  line: { id: number; isHorizontal: boolean; position: number };
  progress: MotionValue<number>;
  index: number;
}) => {
  const start = index * 0.03;
  const opacity = useTransform(
    progress,
    [start, start + 0.1, start + 0.3, start + 0.5],
    [0, 0.3, 0.6, 0.3],
    { clamp: true }
  );
  const scaleX = useTransform(
    progress,
    [start, start + 0.2],
    line.isHorizontal ? [0, 1] : [1, 1],
    { clamp: true }
  );
  const scaleY = useTransform(
    progress,
    [start, start + 0.2],
    line.isHorizontal ? [1, 1] : [0, 1],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute"
      style={{
        ...(line.isHorizontal
          ? { left: 0, right: 0, top: `${line.position}%`, height: 1 }
          : { top: 0, bottom: 0, left: `${line.position}%`, width: 1 }),
        background: line.isHorizontal
          ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.08), transparent)"
          : "linear-gradient(180deg, transparent, rgba(59,130,246,0.08), transparent)",
        opacity,
        scaleX,
        scaleY,
      }}
    />
  );
};

const GridLines = ({
  progress,
}: {
  progress: MotionValue<number>;
}) => {
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
      {lines.map((line, index) => (
        <GridLine key={line.id} line={line} progress={progress} index={index} />
      ))}
    </div>
  );
};

const PulsingCore = ({
  progress,
}: {
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [0.12, 0.22], [0, 1], {
    clamp: true,
  });
  const scale = useTransform(progress, [0.12, 0.22], [0, 1], {
    clamp: true,
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: -25,
        marginTop: -25,
        opacity,
        scale,
      }}
    >
      <motion.div
        className="w-[50px] h-[50px] rounded-full"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          boxShadow:
            "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
            "0 0 80px rgba(59,130,246,0.6), 0 0 160px rgba(59,130,246,0.25)",
            "0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.15)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-[8px] rounded-full bg-white/20"
        style={{ filter: "blur(4px)" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const DataStream = ({
  startX,
  startY,
  endX,
  endY,
  color,
  progress,
  assembleAt,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  progress: MotionValue<number>;
  assembleAt: number;
}) => {
  const left = useTransform(
    progress,
    [assembleAt, assembleAt + 0.3],
    [startX, endX],
    { clamp: true }
  );
  const top = useTransform(
    progress,
    [assembleAt, assembleAt + 0.3],
    [startY, endY],
    { clamp: true }
  );
  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.05, assembleAt + 0.2, assembleAt + 0.3],
    [0, 0, 1, 0],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [assembleAt, assembleAt + 0.05, assembleAt + 0.2, assembleAt + 0.3],
    [0, 0.5, 1, 0.5],
    { clamp: true }
  );
  const leftPercent = useTransform(left, (v) => `${v}%`);
  const topPercent = useTransform(top, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute"
      style={{
        left: leftPercent,
        top: topPercent,
        width: 2,
        height: 2,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}`,
        opacity,
        scale,
      }}
    />
  );
};

const HexNode = ({
  x,
  y,
  size,
  color,
  progress,
  assembleAt,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  progress: MotionValue<number>;
  assembleAt: number;
}) => {
  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.1, assembleAt + 0.2],
    [0, 0.6, 0.4],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [assembleAt, assembleAt + 0.15, assembleAt + 0.2],
    [0, 1.1, 1],
    { clamp: true }
  );
  const rotate = useTransform(
    progress,
    [assembleAt, assembleAt + 0.15],
    [-30, 0],
    { clamp: true }
  );

  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${size / 2 + (size / 2) * Math.cos(angle)},${size / 2 + (size / 2) * Math.sin(angle)}`;
  }).join(" ");

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity,
        scale,
        rotate,
      }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <polygon
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
};

const ConnectionLine = ({
  x1,
  y1,
  x2,
  y2,
  color,
  progress,
  assembleAt,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  progress: MotionValue<number>;
  assembleAt: number;
}) => {
  const pathLength = useTransform(
    progress,
    [assembleAt, assembleAt + 0.2],
    [0, 1],
    { clamp: true }
  );
  const opacity = useTransform(
    progress,
    [assembleAt, assembleAt + 0.15],
    [0, 0.15],
    { clamp: true }
  );

  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth="0.5"
      style={{ pathLength, opacity }}
    />
  );
};

export const HeroMotionGraphics = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: 10 + ((i * 37) % 80),
        y: 40 + ((i * 53) % 50),
        size: 1.5 + ((i * 7) % 5),
        scatterX: (((i * 13) % 200) - 100) * 2,
        scatterY: (((i * 17) % 200) - 100) * 2,
        assembleAt: 0.2 + (i * 0.012),
      })),
    []
  );

  const dataStreams = useMemo(
    () => [
      { startX: 20, startY: 30, endX: 50, endY: 50, color: "#3b82f6", assembleAt: 0.2 },
      { startX: 80, startY: 25, endX: 50, endY: 50, color: "#60a5fa", assembleAt: 0.22 },
      { startX: 15, startY: 70, endX: 50, endY: 50, color: "#3b82f6", assembleAt: 0.24 },
      { startX: 85, startY: 65, endX: 50, endY: 50, color: "#60a5fa", assembleAt: 0.26 },
      { startX: 35, startY: 20, endX: 50, endY: 50, color: "#93c5fd", assembleAt: 0.28 },
      { startX: 70, startY: 80, endX: 50, endY: 50, color: "#93c5fd", assembleAt: 0.3 },
    ],
    []
  );

  const hexNodes = useMemo(
    () => [
      { x: 10, y: 15, size: 28, color: "#3b82f6", assembleAt: 0.08 },
      { x: 85, y: 12, size: 22, color: "#60a5fa", assembleAt: 0.1 },
      { x: 8, y: 65, size: 20, color: "#93c5fd", assembleAt: 0.12 },
      { x: 88, y: 58, size: 26, color: "#3b82f6", assembleAt: 0.14 },
      { x: 25, y: 85, size: 18, color: "#60a5fa", assembleAt: 0.16 },
      { x: 72, y: 80, size: 24, color: "#93c5fd", assembleAt: 0.18 },
      { x: 50, y: 8, size: 16, color: "#3b82f6", assembleAt: 0.2 },
      { x: 50, y: 90, size: 20, color: "#60a5fa", assembleAt: 0.22 },
    ],
    []
  );

  const connections = useMemo(
    () => [
      { x1: 12, y1: 18, x2: 50, y2: 50, color: "#3b82f6", assembleAt: 0.1 },
      { x1: 86, y1: 15, x2: 50, y2: 50, color: "#60a5fa", assembleAt: 0.12 },
      { x1: 10, y1: 67, x2: 50, y2: 50, color: "#93c5fd", assembleAt: 0.14 },
      { x1: 89, y1: 60, x2: 50, y2: 50, color: "#3b82f6", assembleAt: 0.16 },
      { x1: 26, y1: 87, x2: 50, y2: 50, color: "#60a5fa", assembleAt: 0.18 },
      { x1: 73, y1: 82, x2: 50, y2: 50, color: "#93c5fd", assembleAt: 0.2 },
    ],
    []
  );

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <GridLines progress={scrollYProgress} />

      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {connections.map((c, i) => (
          <ConnectionLine key={i} {...c} progress={scrollYProgress} />
        ))}
      </svg>

      {hexNodes.map((n, i) => (
        <HexNode key={i} {...n} progress={scrollYProgress} />
      ))}

      <Orb
        size={300}
        color="rgba(59,130,246,0.25)"
        x={20}
        y={10}
        progress={scrollYProgress}
        scatterX={-200}
        scatterY={-150}
        assembleAt={0.1}
      />
      <Orb
        size={250}
        color="rgba(96,165,250,0.2)"
        x={70}
        y={15}
        progress={scrollYProgress}
        scatterX={200}
        scatterY={-100}
        assembleAt={0.15}
      />
      <Orb
        size={200}
        color="rgba(29,78,216,0.2)"
        x={45}
        y={60}
        progress={scrollYProgress}
        scatterX={-100}
        scatterY={200}
        assembleAt={0.2}
      />

      <Ring
        size={320}
        strokeWidth={1.5}
        rotationSpeed={1}
        dashArray="8 16"
        opacity={0.15}
        color="#3b82f6"
        progress={scrollYProgress}
        assembleAt={0.1}
      />
      <Ring
        size={240}
        strokeWidth={2}
        rotationSpeed={-1.5}
        dashArray="12 8"
        opacity={0.25}
        color="#60a5fa"
        progress={scrollYProgress}
        assembleAt={0.15}
      />
      <Ring
        size={160}
        strokeWidth={1}
        rotationSpeed={2}
        dashArray="4 12"
        opacity={0.2}
        color="#93c5fd"
        progress={scrollYProgress}
        assembleAt={0.2}
      />

      <PulsingCore progress={scrollYProgress} />

      {dataStreams.map((s, i) => (
        <DataStream key={i} {...s} progress={scrollYProgress} />
      ))}

      {particles.map((p) => (
        <Particle
          key={p.id}
          x={p.x}
          y={p.y}
          size={p.size}
          progress={scrollYProgress}
          scatterX={p.scatterX}
          scatterY={p.scatterY}
          assembleAt={p.assembleAt}
        />
      ))}
    </div>
  );
};
