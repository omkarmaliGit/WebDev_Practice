import { useState } from "react";
import PropTypes from "prop-types";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;
    onSubmit(newItem);

    setNewItem("");
  }

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="header" htmlFor="item">
          New Item
        </label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">ADD</button>
    </form>
  );
}

NewTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a required function
};
