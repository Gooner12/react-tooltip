import classes from "./mainPage.module.css";
import Tooltip from "../components/Tooltip";
import HoverComponent from "./HoverComponent";

function MainPage() {
  return (
    <div className={classes.main_grid}>
      <div className={classes.side_grid}>
        <div className={classes.side_button_container}>
          <Tooltip text="First tooltip" placement="left">
            <button>Side Button</button>
          </Tooltip>
        </div>
      </div>
      <div className={classes.content_grid}>
        <div className={classes.button_container}>
          <Tooltip text="First tooltip" placement="bottom">
            <button>First Button</button>
          </Tooltip>
          <Tooltip text={<HoverComponent />} placement="top">
            <button>Component Tooltip</button>
          </Tooltip>
          <Tooltip text="Last tooltip" placement="bottom">
            <button>Recursion Example</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
