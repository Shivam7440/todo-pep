import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (input === "") return;

    const newTask = {
      text: input,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function toggleTask(index) {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  }

  let shownTasks = tasks;
  if (filter === "pending") {
    shownTasks = tasks.filter(t => !t.completed);
  } else if (filter === "completed") {
    shownTasks = tasks.filter(t => t.completed);
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div>
      <h2>Simple Todo</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <p>Pending: {pendingCount}</p>
      <p>Completed: {completedCount}</p>

      <ul>
        {shownTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            {task.completed ? <s>{task.text}</s> : task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
