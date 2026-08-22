import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticElement = ({
  children,
  className = "",
  strength = 0.3,
}: MagneticElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowCard = ({ children, className = "" }: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={() => setGlow((p) => ({ ...p, opacity: 0 }))}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.12) 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface SectionDividerProps {
  variant?: "glow" | "line" | "dots";
}

export const SectionDivider = ({ variant = "glow" }: SectionDividerProps) => {
  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent/30"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="flex items-center justify-center py-6">
        <motion.div
          className="h-[1px] w-24 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-20 flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute w-[300px] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
        }}
        animate={{ x: [-150, 450] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[200px] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)",
        }}
        animate={{ x: [350, -150] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
