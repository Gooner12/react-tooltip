import classes from "./HoverComponent.module.css";

function HoverComponent() {
  return (
    <>
      <div className={classes.component_container}>
        <div className={classes.circle}></div>
        <div>|</div>
        <div style={{color: "yellow"}}>Circle</div>
      </div>
    </>
  );
}

export default HoverComponent;
