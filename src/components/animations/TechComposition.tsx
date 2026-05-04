import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import React from "react";

export const TechComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animations
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const cursorBlink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
  
  const text = "Piloto Automático";
  const charsToShow = Math.floor(interpolate(frame, [20, 60], [0, text.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp"
  }));
  const currentText = text.substring(0, charsToShow);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.4)", // Dark glass feel
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
        boxShadow: "0 0 50px rgba(59,130,246,0.1) inset"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
          transform: `scale(${interpolate(Math.sin(frame / 30), [-1, 1], [0.9, 1.1])})`,
        }}
      />
      
      <div style={{ transform: `scale(${scale})`, opacity: logoOpacity, textAlign: "center", zIndex: 10 }}>
        <div style={{ 
          fontSize: 32, 
          fontWeight: 900, 
          color: "white", 
          letterSpacing: "0.2em", 
          marginBottom: 10,
          textTransform: "uppercase" 
        }}>
          Chamba<span style={{ color: "#3B82F6" }}>.Digital</span>
        </div>
        
        <div style={{ 
          fontSize: 24, 
          fontWeight: 500, 
          color: "rgba(255,255,255,0.7)",
          fontFamily: "monospace",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "10px 20px",
          borderRadius: 8,
          border: "1px solid rgba(59,130,246,0.2)"
        }}>
          {">"} status: <span style={{ color: "#10B981" }}>{currentText}</span>
          <span style={{ opacity: cursorBlink, color: "#3B82F6" }}>_</span>
        </div>
      </div>
      
      {/* Decorative tech lines */}
      <AbsoluteFill style={{ top: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)', transform: `translateX(${interpolate(frame % 100, [0, 100], [-width, width])}px)` }} />
      <AbsoluteFill style={{ top: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)', transform: `translateX(${interpolate((frame + 50) % 100, [0, 100], [width, -width])}px)` }} />
    </AbsoluteFill>
  );
};
