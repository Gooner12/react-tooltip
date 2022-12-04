import { useState, useEffect, useRef } from "react";
import { placeCaretAtEnd } from "../utils/TextSelector";

function TextField () {
    const [textValue, setTextValue] = useState("");
    const textRef = useRef();

    useEffect(() => {
        placeCaretAtEnd(textRef.current);
      }, [textValue]);

    const changeHandler = (event) => {
        console.log(event.currentTarget.value);
        setTextValue(event.currentTarget.value);
      }

    return <>
        <textarea ref={textRef} rows={3} cols={80} value={textValue} onChange={changeHandler} />
    </>
}

export default TextField;