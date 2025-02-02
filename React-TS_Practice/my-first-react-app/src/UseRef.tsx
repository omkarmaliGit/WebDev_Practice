import { useRef } from "react";

export const UseRef = () => {
  const inputRef: any = useRef(null);

  const focusInput = () => {
    console.log({ inputRef, current: inputRef.current });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="type something" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
