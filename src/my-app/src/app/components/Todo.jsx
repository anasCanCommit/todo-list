"use client"

import { useState } from "react"

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  })

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium" })
      setIsAddingTask(false)
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEdit = (task) => {
    setEditingTask({ ...task })
  }

  const saveEdit = () => {
    setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
    setEditingTask(null)
  }

  const cancelEdit = () => {
    setEditingTask(null)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#1f2937" }}>Todo List</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          style={{
            backgroundColor: "var(--dark)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          + Add Task
        </button>
      </div>

      {isAddingTask && (
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #e5e7eb",
          }}
        >
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <textarea
            placeholder="Task description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
              minHeight: "60px",
              resize: "vertical",
            }}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            style={{
              padding: "8px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={addTask}
              style={{
                backgroundColor: "var(--dark)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Add Task
            </button>
            <button
              onClick={() => {
                setIsAddingTask(false)
                setNewTask({ title: "", description: "", priority: "medium" })
              }}
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#6b7280",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            No tasks yet. Add your first task to get started!
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: task.completed ? "#f0f9ff" : "white",
                border: `1px solid ${task.completed ? "#bae6fd" : "#e5e7eb"}`,
                borderRadius: "8px",
                padding: "16px",
                opacity: task.completed ? 0.7 : 1,
              }}
            >
              {editingTask && editingTask.id === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "8px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  <textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "8px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "14px",
                      minHeight: "60px",
                    }}
                  />
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    style={{
                      padding: "8px",
                      marginBottom: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={saveEdit}
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{
                        backgroundColor: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "16px",
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "#6b7280" : "#1f2937",
                        }}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          style={{
                            margin: "0 0 8px 0",
                            fontSize: "14px",
                            color: "#6b7280",
                            textDecoration: task.completed ? "line-through" : "none",
                          }}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        backgroundColor: getPriorityColor(task.priority),
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        marginLeft: "12px",
                      }}
                    >
                      {task.priority}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                          style={{ cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                          {task.completed ? "Completed" : "Mark as complete"}
                        </span>
                      </label>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>Created: {task.createdAt}</span>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => startEdit(task)}
                        style={{
                          backgroundColor: "#6b7280",
                          color: "white",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
