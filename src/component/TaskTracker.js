import React, { useState, useEffect } from "react";

const TaskTracker = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task to the list
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: new Date().getTime(),
        name: newTask,
        dateAdded: new Date().toLocaleDateString(),
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  // Delete task from the list
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Mark task as completed
  const markAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.name}</span>
            <span>{task.dateAdded}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => markAsCompleted(task.id)}>
              {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
