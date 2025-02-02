import { useEffect, useState } from "react";
import "./firstTwoHookPractice.css";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(10);
    setIsRunning(false);
  };

  return (
    <div className="timer-container">
      <h1>COUNTDOWN : {timeLeft} sec</h1>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
