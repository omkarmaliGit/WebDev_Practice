import { useReducer, useState } from "react";

function reducer(
  state: any,
  action: { type: string; text: string; taskId: string }
) {
  switch (action.type) {
    case "add":
      return {
        tasks: [...state.tasks, { text: action.text, id: action.taskId }],
      };
    case "remove":
      return {
        tasks: state.tasks.filter((task: any) => task.id != action.taskId),
      };
    default:
      return { tasks: state.tasks };
  }
}

export function UseReducer2() {
  const [input, setInput] = useState("");
  const initialState = { tasks: [] };

  const [state, dispatch] = useReducer(reducer, initialState);

  function addTask() {
    if (input.trim()) {
      dispatch({
        type: "add",
        text: input,
        taskId: String(new Date().getUTCMilliseconds()),
      });
      setInput("");
    }
  }

  return (
    <>
      <h1>This is a To-Do List</h1>
      <br />
      <input
        type="text"
        placeholder="Task Description here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={addTask}>Add task</button>
      <br />
      {state.tasks.map((task: any) => {
        return (
          <div key={task.id}>
            <h3>{task.text}</h3>
            <p>{task.id}</p>
            <button
              onClick={() =>
                dispatch({ type: "remove", taskId: task.id, text: "" })
              }
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
}
