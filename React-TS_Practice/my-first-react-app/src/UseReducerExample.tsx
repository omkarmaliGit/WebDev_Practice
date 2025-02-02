import React, { useReducer } from "react";

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        { id: action.payload.id, name: action.payload.name, quantity: 1 },
      ];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    default:
      return state;
  }
};

export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (id, name) => {
    dispatch({ type: "ADD_ITEM", payload: { id, name } });
  };

  return (
    <div>
      <h1>------------UseReducer-----------</h1>
      <h2>Shopping Cart</h2>
      <button onClick={() => addItem(1, "Apple")}>Add Apple</button>
      <button onClick={() => addItem(2, "Banana")}>Add Banana</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button
              onClick={() =>
                dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
              }
            >
              +
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
              }
            >
              -
            </button>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
