import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const HeroAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rotaciones continuas y suaves
  const rotation1 = frame * 0.4;
  const rotation2 = -frame * 0.6;

  // Efecto de pulso en el núcleo basado en funciones senoidales
  const pulse = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.9, 1.1]
  );

  const glowPulse = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
      {/* Halo Exterior Brillante */}
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)",
          transform: `scale(${pulse})`,
        }}
      />

      {/* Anillo Exterior (Líneas Discontinuas) */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "2px dashed rgba(255, 255, 255, 0.1)",
          transform: `rotate(${rotation1}deg)`,
        }}
      />

      {/* Anillo de Datos (Orbital) */}
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "rgba(59, 130, 246, 0.8)",
          borderBottomColor: "rgba(59, 130, 246, 0.3)",
          transform: `rotate(${rotation2}deg) scale(${pulse * 0.95})`,
          boxShadow: `0 0 30px rgba(59, 130, 246, ${glowPulse})`,
        }}
      >
        <div style={{
          position: "absolute",
          top: -3,
          left: "50%",
          width: 8,
          height: 8,
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0 0 10px #fff",
          transform: "translateX(-50%)"
        }} />
      </div>

      {/* Núcleo Central de Inteligencia */}
      <div
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          boxShadow: `0 0 50px rgba(59, 130, 246, ${glowPulse * 1.5}), inset 0 0 20px rgba(255,255,255,0.5)`,
          transform: `scale(${pulse})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.9)",
          filter: "blur(4px)"
        }} />
      </div>
      
      {/* Nodos flotantes (Datos) */}
      {[...Array(6)].map((_, i) => {
        const speed = 1.5 + (i % 3);
        const offset = (frame * speed + i * 40) % 200;
        const opacity = interpolate(offset, [0, 100, 200], [0, 1, 0]);
        const size = 3 + (i % 4);
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#fff",
              top: `calc(50% - ${offset * 1.2}px)`,
              left: `calc(50% + ${Math.sin(i * 45) * 120}px)`,
              opacity,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
