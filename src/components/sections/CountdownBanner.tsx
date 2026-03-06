import { useState, useEffect } from "react";

function getTimeLeft(target: number) {
  const now = Date.now();
  const distance = target - now;
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

const CountdownBanner = () => {
  const [target] = useState(() => {
    const stored = localStorage.getItem("lp-countdown-target");
    if (stored) return Number(stored);
    const t = Date.now() + 90 * 24 * 60 * 60 * 1000;
    localStorage.setItem("lp-countdown-target", String(t));
    return t;
  });

  const [time, setTime] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (!time) {
    return (
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center py-2.5 text-sm font-medium">
        Launch Special Ended - Regular Pricing Now Active
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center py-2.5">
      <div className="font-heading font-bold text-base md:text-lg">
        LAUNCH SPECIAL: Save Up To 53% - Limited Time Only!
      </div>
      <div className="text-sm mt-0.5 font-mono tracking-wider">
        Expires in:{" "}
        <span className="font-bold">{pad(time.days)}</span>d{" "}
        <span className="font-bold">{pad(time.hours)}</span>h{" "}
        <span className="font-bold">{pad(time.minutes)}</span>m{" "}
        <span className="font-bold">{pad(time.seconds)}</span>s
      </div>
    </div>
  );
};

export default CountdownBanner;
