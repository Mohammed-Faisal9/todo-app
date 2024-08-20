import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import sunIcon from "../assets/images/icon-sun.svg";
import moonIcon from "../assets/images/icon-moon.svg";

export default function Header({ changeTheme }) {
  return (
    <div style={{ maxWidth: "50rem", marginInline: "auto", zIndex: "100" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <h1>TODO</h1>
        </Grid>
        <Grid>
          <button onClick={changeTheme}>
            {localStorage.getItem("theme") === "dark" ? (
              <img src={sunIcon} />
            ) : (
              <img src={moonIcon} />
            )}
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
