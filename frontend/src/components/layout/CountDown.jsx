import { useEffect, useState } from "react";

const calculateTime = () => {
  const diff = new Date("2025-07-20") - new Date();
  let timeOut = {};
  if (diff > 0) {
    timeOut = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }
  return timeOut;
};

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-blue-500" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[25px] text-red-500">
          Time's up!
        </span>
      )}
    </div>
  );
};

export default CountDown;
