import { useState } from "react";
import "./UseState.css";

export function UseState() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>
        The Count is : <span>{count}</span>{" "}
      </h1>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>RESET</button>
    </div>
  );
}
