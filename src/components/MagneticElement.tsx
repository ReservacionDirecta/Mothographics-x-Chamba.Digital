import React from "react";
import { motion } from "motion/react";

interface SectionDividerProps {
  variant?: "line" | "dots";
}

export const SectionDivider = ({ variant = "line" }: SectionDividerProps) => {
  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent/30"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    );
  }

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
};