import classes from "./mainPage.module.css";
import Tooltip from "../components/Tooltip";
import HoverComponent from "./HoverComponent";
import { useState, useRef, useEffect } from "react";
import { placeCaretAtEnd } from "../utils/TextFunctions";

function MainPage() {
  const [textValue, setTextValue] = useState("");
  const textRef = useRef();
  useEffect(() => {
    placeCaretAtEnd(textRef.current);
  }, [textValue]);

  const changeHandler = (event) => {
    setTextValue(event.currentTarget.value);
  }

  return (
    <div className={classes.main_grid}>
      <div className={classes.side_grid}>
        <div className={classes.side_button_container}>
          <Tooltip text="Arrow tooltip" placement="left" arrow={1}>
            <button>Arrow Tooltip</button>
          </Tooltip>
        </div>
      </div>
      <div className={classes.content_grid}>
        <div className={classes.button_container}>
          <Tooltip text="First tooltip" placement="bottom">
            <button>First Button</button>
          </Tooltip>
          <Tooltip
            text={<HoverComponent />}
            placement="top"
            interaction="click"
            closeAfter={4500}
          >
            <button>Interactable Tooltip</button>
          </Tooltip>
          <Tooltip text="Last tooltip" placement="bottom">
            <button>Recursion Example</button>
          </Tooltip>
        </div>
        <div className={classes.text_field}>
          <Tooltip text="Tooltip on text selection" placement="top" arrow={1} interaction="select">
            <div id="text_field" contentEditable ref={textRef} value={textValue} onChange={changeHandler}>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
