"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="h-1 w-full bg-line/70 rounded-full overflow-hidden"
    >
      <motion.div
        className="h-full bg-sage"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 110, damping: 22 }}
      />
    </div>
  );
}
