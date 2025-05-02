import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function Todo({ task, index, toggleTask, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      editTodo(index, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${task.isCompleted ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleTask(index)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
        ) : (
          <div className="todo-text">
            <div>{task.text}</div>
          </div>
        )}
      </div>

      <div className="todo-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}><FaSave /></button>
            <button onClick={() => {
              setIsEditing(false);
              setEditText(task.text);
            }}><FaTimes /></button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}><FaEdit /></button>
            <button className="remove-button" onClick={() => removeTodo(index)}><FaTrashAlt /></button>
          </>
        )}
      </div>
    </li>
  );
}

export default Todo;
