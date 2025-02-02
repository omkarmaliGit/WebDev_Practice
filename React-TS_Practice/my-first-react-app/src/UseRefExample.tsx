import React, { useRef, useState } from "react";

export function TimerExample() {
  const timerRef = useRef(null);
  const [count, setCount] = useState(0);

  const startTimer = () => {
    if (timerRef.current) return; // Prevent multiple timers
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // Clear the ref
  };

  return (
    <div>
      <h1>------------UseRef-----------</h1>
      <h1>Count: {count}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
