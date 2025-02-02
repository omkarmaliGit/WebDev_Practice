import { useMemo, useState } from "react";

export const UseMemo = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  const sum = (a: number, b: number) => {
    console.log("Sum Called", { a, b });
    return a + b;
  };

  const memoizedValue = useMemo(() => sum(a, b), [a, b]);

  return (
    <>
      <h1>The sum is {memoizedValue}</h1>
      <button onClick={() => setA(a + 1)}>increment A</button>
      <button onClick={() => setA(a - 1)}>decrement A</button>
      <button onClick={() => setB(b + 1)}>increment B</button>
      <button onClick={() => setB(b - 1)}>decrement B</button>
    </>
  );
};
