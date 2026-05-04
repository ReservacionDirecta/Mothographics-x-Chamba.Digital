import React from "react";
import { Player } from "@remotion/player";
import { TechComposition } from "./TechComposition";

export const HeroAnimation = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative z-10 mt-12 group">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 blur-[50px] -z-10 group-hover:opacity-70 transition-opacity duration-700 opacity-30" />
      <Player
        component={TechComposition}
        durationInFrames={150}
        compositionWidth={600}
        compositionHeight={300}
        fps={30}
        autoPlay
        loop
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "2/1",
          borderRadius: "24px",
        }}
      />
    </div>
  );
};
