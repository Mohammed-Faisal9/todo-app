import React from "react";
import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/style.css";
import Header from "./components/header";
import Content from "./components/Content";
import Container from "@mui/material/Container";

// import { light } from '@mui/material/styles/createPalette'

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  // localStorage.clear()
  function changeTheme() {
    localStorage.getItem("theme") === "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");

    setTheme(localStorage.getItem("theme"));
  }

  console.log(theme);

  return (
    <div
      className="page"
      data-theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
    >
      <Container maxWidth="sm">
        <Header changeTheme={changeTheme} />
        <Content />
      </Container>
    </div>
  );
}

export default App;
