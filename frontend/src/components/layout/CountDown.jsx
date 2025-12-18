// CountDown.jsx
import { useEffect, useState } from "react";

/**
 * Parses various date formats:
 * - ISO string "2025-12-19T00:00:00.000Z"
 * - number (timestamp)
 * - Date instance
 * - Mongo-style object { $date: "..." }
 * Returns a Date or null if invalid.
 */
function parseTarget(target) {
  if (!target) return null;
  if (target instanceof Date) return target;
  if (typeof target === "number") return new Date(target);
  if (typeof target === "string") {
    const d = new Date(target);
    return isNaN(d.getTime()) ? null : d;
  }
  // mongo style: { $date: "..." }
  if (typeof target === "object" && (target.$date || target["$date"])) {
    const iso = target.$date ?? target["$date"];
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function getParts(diffMs) {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalSeconds };
}

/**
 * Props:
 * - target: Date | string | number | { $date: "..." }  <-- the target time
 * - onComplete?: () => void    <-- optional callback when countdown reaches 0
 * - className?: string         <-- optional wrapper classes
 */
export default function CountDown({ target, onComplete, className = "" }) {
  const [parts, setParts] = useState(() => {
    const t = parseTarget(target);
    if (!t) return null;
    return getParts(t - new Date());
  });

  useEffect(() => {
    const targetDate = parseTarget(target);
    if (!targetDate) {
      setParts(null);
      return;
    }

    // initial calc
    const update = () => {
      const diff = targetDate - new Date();
      const p = getParts(diff);
      setParts(p);
      if (p.totalSeconds <= 0) {
        if (typeof onComplete === "function") onComplete();
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target, onComplete]);

  // No valid target or already finished
  if (!parts) {
    return (
      <div className={className}>
        <span className="text-[18px] text-red-500">Time's up!</span>
      </div>
    );
  }

  // Conditionally render only non-zero units to keep it compact
  const segments = [];
  if (parts.days > 0) segments.push(`${parts.days}d`);
  if (parts.hours > 0 || parts.days > 0) segments.push(`${parts.hours}h`);
  if (parts.minutes > 0 || parts.hours > 0 || parts.days > 0)
    segments.push(`${parts.minutes}m`);
  segments.push(`${parts.seconds}s`);

  return (
    <div className={className + " flex items-center space-x-2"}>
      {segments.map((seg, i) => (
        <span key={i} className="text-[20px] font-medium text-blue-600">
          {seg}
        </span>
      ))}
    </div>
  );
}
