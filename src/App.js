import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import './App.css';
import logo from './logo.svg'; // Assuming you're using Create React App


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved
      ? JSON.parse(saved)
      : [
        { text: 'Learn React', isCompleted: false, dueDate: '2025-05-01' },
        { text: 'Build a To-Do App', isCompleted: true, dueDate: '2025-05-02' }
        ];
  });

  const [filter, setFilter] = useState("All");
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, isCompleted: false, dueDate: newDueDate }]);
    setNewTodo('');
    setNewDueDate('');
  };  

  const toggleTask = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearAllTodos = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTodos([]);
    }
  };

  const editTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.isCompleted;
    if (filter === "Incomplete") return !todo.isCompleted;
    return true; // All
  });

  return (
    <div className="App">
      <header className="app-header">
      <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    className="react-logo" alt="React Logo"/>
  <h1 className="app-title">TODO</h1>
      </header>
      <div className="app-container">
        <h1>MY TODO LIST</h1>
        <h2>{formattedDate}</h2>
  
        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a task"
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button className="add-button" onClick={handleAddTodo}>Add</button>
        </div>
  
        {/* 🔽 Filter Buttons Section */}
        <div className="filter-buttons">
          <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>All</button>
          <button onClick={() => setFilter("Completed")} className={filter === "Completed" ? "active" : ""}>Completed</button>
          <button onClick={() => setFilter("Incomplete")} className={filter === "Incomplete" ? "active" : ""}>Incomplete</button>
        </div>
  
        {/* Task List */}
        <ul className="todo-list">
          {filteredTodos.map((task, index) => (
            <Todo
              key={index}
              task={task}
              index={index}
              toggleTask={toggleTask}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
          
  {/* ✅ Clear button section is inside the return */}
  <div className="clear-button-container">
          <button className="clear-button" onClick={clearAllTodos}>
            Clear All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
