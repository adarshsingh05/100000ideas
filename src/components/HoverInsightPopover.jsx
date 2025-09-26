"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HoverInsightPopover({ show, anchorRect, insight }) {
  if (!show || !anchorRect) return null;

  const width = 220;
  const height = 120;
  const padding = 8;
  const sparkPoints = useMemo(() => {
    const values = Array.isArray(insight?.spark) ? insight.spark : [];
    if (values.length === 0) return [];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const stepX = (width - padding * 2) / (values.length - 1);
    return values.map((v, i) => {
      const x = padding + i * stepX;
      const y = height - padding - ((v - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    });
  }, [insight, width, height, padding]);

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const desiredLeft = anchorRect.left + anchorRect.width / 2 - width / 2;
  const clampedLeft = Math.max(
    8,
    Math.min(desiredLeft, viewportWidth - width - 8)
  );
  const aboveTop = anchorRect.top - height - 12;
  const belowTop = anchorRect.bottom + 12;
  let computedTop = aboveTop;
  if (aboveTop < 8) {
    computedTop = Math.min(belowTop, Math.max(8, viewportHeight - height - 8));
  }

  const style = {
    position: "fixed",
    left: clampedLeft,
    top: computedTop,
    zIndex: 60,
    pointerEvents: "none",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 6, scale: 0.98, rotateX: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={style}
        className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-xl w-[220px]"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-wide text-[#2D3748]/70">
              {insight?.label || "Insight"}
            </div>
            <div className="text-[11px] font-semibold text-[#061F59]">
              {insight?.stat || "—"}
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-md bg-gray-50 border border-gray-200">
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
            >
              <defs>
                <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FDCC29" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FDCC29" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* grid */}
              <g>
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1={padding}
                    x2={width - padding}
                    y1={padding + ((height - padding * 2) / 4) * i}
                    y2={padding + ((height - padding * 2) / 4) * i}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
              </g>
              {/* area */}
              {sparkPoints.length > 1 && (
                <polygon
                  fill="url(#sparkGrad)"
                  points={`${sparkPoints.join(" ")} ${width - padding},${
                    height - padding
                  } ${padding},${height - padding}`}
                />
              )}
              {/* line */}
              {sparkPoints.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#061F59"
                  strokeWidth="2"
                  points={sparkPoints.join(" ")}
                />
              )}
            </svg>
          </div>

          <div className="mt-2 text-[11px] text-[#2D3748]/80 leading-snug">
            {insight?.note || "—"}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
