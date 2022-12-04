import classes from "./HoverComponent.module.css";
import { useState } from "react";

function HoverComponent() {
    const [color, setColor] = useState("green");

    const changeColor = () => {
        if (color === "green") {
        setColor("red");
        return;
        }
        setColor("green")
    }
  return (
    <>
      <div className={classes.component_container}>
        <div className={classes.circle} style={{backgroundColor: `${color}`}} onClick={changeColor}></div>
        <div>|</div>
        <div style={{ color: "yellow" }}>Interactable tooltip</div>
      </div>
    </>
  );
}

export default HoverComponent;
