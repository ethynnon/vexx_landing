"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  accentColor?: string; // HEX или CSS-цвет, например '#a855f7'
  glowColor?: string;   // RGBA-цвет для мягкой тени, например 'rgba(168,85,247,0.2)'
  onClick?: () => void;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  const accentColor = item.accentColor || "rgba(200,56,90,1)";
  const glowColor = item.glowColor || "rgba(200,56,90,0.15)";
  const dotsColor = item.glowColor ? item.glowColor.replace(/[\d\.]+\)$/, "0.04)") : "rgba(200,56,90,0.03)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={item.onClick}
      className={cn(
        "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
        "border border-white/5 bg-[#171616] hover:-translate-y-1 will-change-transform",
        "hover:border-[var(--bento-accent)] hover:shadow-[0_0_30px_-5px_var(--bento-glow)]",
        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
        item.onClick && "cursor-pointer"
      )}
      style={{
        borderColor: item.hasPersistentHover ? `${accentColor}33` : undefined,
        boxShadow: item.hasPersistentHover ? `0 0 20px -5px ${glowColor}` : undefined,
        transform: item.hasPersistentHover ? "translateY(-2px)" : undefined,
        // Передаем переменные для hover-эффектов через CSS Variables
        ["--bento-accent" as any]: accentColor,
        ["--bento-glow" as any]: glowColor,
        ["--bento-dots" as any]: dotsColor,
      }}
    >
      {/* Dot pattern overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300 pointer-events-none",
          item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bento-dots)_1px,transparent_1px)] bg-[length:16px_16px]" 
        />
      </div>

      {/* Top-edge glow line */}
      <div 
        className={cn(
          "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--bento-accent)] to-transparent opacity-60 transition-opacity duration-300 pointer-events-none",
          item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )} 
      />

      <div className="relative flex flex-col space-y-4 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/5 group-hover:bg-[var(--bento-accent)]/10 group-hover:shadow-[0_0_15px_var(--bento-glow)]"
          >
            {item.icon}
          </div>
          {item.status && (
            <span 
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-[var(--color-text-secondary)] border border-white/5 transition-all duration-300 uppercase tracking-wider group-hover:bg-[var(--bento-accent)]/10 group-hover:text-[var(--bento-accent)] group-hover:border-[var(--bento-accent)]/20"
            >
              {item.status}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1.5 flex-1">
          <h3 className="font-bold text-[var(--color-text-primary)] text-[15px] leading-snug tracking-tight group-hover:text-white transition-colors duration-300">
            {item.title}
            {item.meta && (
              <span className="ml-2 text-xs text-[var(--color-text-secondary)] font-normal">
                {item.meta}
              </span>
            )}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center flex-wrap gap-1.5">
            {item.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-[var(--color-text-secondary)] border border-white/5 transition-all duration-200 group-hover:bg-[var(--bento-accent)]/5 group-hover:border-[var(--bento-accent)]/10"
              >
                #{tag}
              </span>
            ))}
          </div>
          {item.cta && (
            <span 
              className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium"
              style={{ color: accentColor }}
            >
              {item.cta} →
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((item, index) => (
        <BentoCard key={index} item={item} index={index} />
      ))}
    </div>
  );
}
