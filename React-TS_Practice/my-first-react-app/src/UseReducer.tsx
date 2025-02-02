// Use Reducer is similar to use State bcoz it also manages the state
// But it is used for complex state logic or conditons.

import { useReducer } from "react";

function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return { count: 0 };
  }
}

export function UseReducer() {
  const initialState = { count: 0 };

  // syntax of Use Reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Current count : {state.count}</h1>
      <br />
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <br />
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <br />
      <button onClick={() => dispatch({ type: "reset" })}>RESET</button>
    </>
  );
}

