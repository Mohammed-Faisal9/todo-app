import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import checkIcon from "../assets/images/icon-check.svg";
import closeIcon from "../assets/images/icon-cross.svg"
import Grid from "@mui/material/Unstable_Grid2";

export default function Content() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [value, setValue] = useState("");
  const [ filter, setFilter ] = useState("all")

  function addTodo(event) {
    event.preventDefault();
    if (value === "") {
      return;
    } else {
      setTodos([...todos, { text: value, completed: false, id: Date.now() }]);
      setValue("");
    }
    console.log(event);
  }

  function clearAll()
  {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  function deleteTodo(id) {
    setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id))
  }
  
  function completeTodo(id) {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}
     : todo ))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filterTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
  })

  const styleButton = {
    padding: "0",
    border: 0,
    backgroundColor: "inherit",
    color: "inherit"
  };
  // localStorage.clear()
  return (
    <div>
      <form className="add-form" onSubmit={addTodo}>
        <button className="check"></button>
        <TextField
          fullWidth
          placeholder="Create a new todo..."
          id="fullWidth"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {todos && todos.length > 0 ? (
        <div>
          <List
            sx={{
              py: 0,
              width: "100%",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "var(--content-bg)",
              marginTop: "1.5rem",
              color: "var(--text-clr-200)",
              position: "relative",
            }}
          >
            {filterTodos.map((todo, index) => (
              <ListItem
                id={todo.id}
                key={index}
                style={{
                  borderBottom: "1px solid",
                  borderColor: "--border-bg",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem"
                }}
              >
                <div>
                  <ListItemText
                    primary={todo.text}
                    style={{
                      marginLeft: "2rem",
                      textDecoration: todo.completed && "line-through",
                    }}
                  />
                  <button
                    onClick={() => completeTodo(todo.id)}
                    className={`${todo.completed ? "completed" : ""} check`}
                  >
                    {todo.completed ? <img src={checkIcon} /> : null}
                  </button>
                </div>
                <button style={styleButton} onClick={() => deleteTodo(todo.id)}>
                  <img src={closeIcon} />
                </button>
              </ListItem>
            ))}
          </List>
          <div
            style={{
              backgroundColor: "var(--content-bg)",
              color: "var(--text-clr-200)",
              padding: "1rem",
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <p>{todos.length} items left</p>
              </Grid>
              <Grid
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <button style={styleButton} onClick={() => setFilter("all")}>All</button>
                <button style={styleButton} onClick={() => setFilter("active")}>ِActive</button>
                <button style={styleButton} onClick={() => setFilter("completed")}>Completed</button>
              </Grid>
              <Grid>
                <button style={styleButton} onClick={clearAll}>Clear Completed</button>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : null}
    </div>
  );
}
