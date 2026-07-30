import React, { useState } from "react";
import { Globe } from "lucide-react";

interface ProjectCardThumbnailProps {
  thumb: string;
  label: string;
  url: string;
  emoji?: string;
  className?: string;
}

export const ProjectCardThumbnail: React.FC<ProjectCardThumbnailProps> = ({
  thumb,
  label,
  url,
  emoji,
  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full relative bg-slate-950 flex items-center justify-center overflow-hidden">
      {!hasError && (
        <img
          src={thumb}
          alt={label}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Fallback mockup when screenshot fails or is blocked by client ad-blocker */}
      {(hasError || !loaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 flex flex-col justify-between select-none">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[9px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-full truncate max-w-[140px]">
              {url.replace(/^https?:\/\//, "")}
            </span>
          </div>

          {/* Center Brand Identity */}
          <div className="text-center space-y-1 my-auto">
            {emoji ? (
              <span className="text-3xl block mb-1">{emoji}</span>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-1">
                <Globe className="w-4 h-4" />
              </div>
            )}
            <h5 className="text-[12px] font-black text-white leading-tight px-2 line-clamp-1">{label}</h5>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Sitio Web Activo</p>
          </div>
        </div>
      )}
    </div>
  );
};
