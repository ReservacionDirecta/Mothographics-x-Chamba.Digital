import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";

interface ProjectCardThumbnailProps {
  thumb?: string;
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
  const cleanUrl = url.replace(/^https?:\/\//, "");

  // Multi-provider screenshot fallback chain
  const getFallbackSources = (targetUrl: string, customThumb?: string) => {
    const clean = targetUrl.replace(/^https?:\/\//, "");
    const targetFullUrl = clean.includes("penalindamancora")
      ? "https://penalindabungalows.up.railway.app"
      : `https://${clean}`;

    // Priority 1: Local thumbnail if available
    const nameMap: Record<string, string> = {
      "pacificsurfschool.com.pe": "pacificsurfschool",
      "latamabogados.com": "latamabogados",
      "penalindamancora.com": "penalindamancora",
      "www.dupla.work": "dupla",
      "kabsa.pe": "kabsa",
      "puntanegritos.webflow.io": "puntanegritos",
      "haciendadonvicente.com": "haciendadonvicente",
      "fundoachamaqui.com": "fundoachamaqui",
      "sauce.pe": "sauce",
      "jahsurfperu.com": "jahsurfperu",
      "olivosdelperu.com": "olivosdelperu",
      "hothelia.com": "hothelia",
    };
    const localName = nameMap[clean] || clean.split('.')[0];
    const list = [`/thumbs/${localName}.webp`];

    // Priority 2: Custom passed thumb if available
    if (customThumb && !customThumb.includes('mshots')) list.push(customThumb);

    // Priority 3: Thum.io
    list.push(`https://image.thum.io/get/width/600/crop/800/noanimate/${targetFullUrl}`);

    // Priority 4: WordPress mshots
    list.push(`https://s.wordpress.com/mshots/v1/${targetFullUrl}?w=600`);

    // Priority 5: Microlink API
    list.push(`https://api.microlink.io/?url=${encodeURIComponent(targetFullUrl)}&screenshot=true&embed=screenshot.url`);

    return Array.from(new Set(list));
  };

  const sources = getFallbackSources(url, thumb);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setHasError(false);
    setLoaded(false);
  }, [thumb, url]);

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-950 flex items-center justify-center overflow-hidden">
      {!hasError && (
        <img
          key={sources[sourceIndex]}
          src={sources[sourceIndex]}
          alt={label}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Fallback mockup when all screenshot providers fail or are blocked */}
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
              {cleanUrl}
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
