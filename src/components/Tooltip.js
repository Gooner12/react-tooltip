import React, { useState, useRef } from "react";
import Portal from "./Portal";
import styled from "styled-components";

const StyledTooltip = styled.span.attrs((props) => ({
  delay: props.delay || 0.01,
}))`
  position: fixed;
  top: ${(props) => props.positionRef.current.y}px;
  left: ${(props) => props.positionRef.current.x}px;
  font-size: 0.5rem;
  font-weight: bold;
  letter-spacing: 0.02em;
  background-color: var(--tooltip-color);
  color: white;
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  z-index: 10000;
  padding: var(--padding);
  opacity: ${(props) => (props.state ? 1 : 0)};
  transition-duration: 0.06s !important;
  transition-timing-function: cubic-bezier(0.49, 0.04, 0.17, 0.79) !important;
  transition-delay: ${(props) =>
    props.state ? props.delay : 0.02}s !important;
  transform-origin: ${(props) => position(props.placement).flip()};
  transform: scale(${(props) => (props.state ? 1 : 0.7)});
  transition-property: transform, opacity !important;

  &:before {
    content: "";
    position: absolute;
    transform: translateX(${(props) => props.translateXRef.current}%)
      translateY(${(props) => props.translateYRef.current}%)
      rotate(${(props) => props.rotationRef.current}deg);
    top: ${(props) => props.topRef.current}%;
    bottom: ${(props) => props.bottomRef.current}%;
    left: ${(props) => props.leftRef.current}%;
    right: ${(props) => props.rightRef.current}%;
    border: ${(props) => (props.arrow) ? "var(--arrow-size) solid transparent" : 0};
    border-bottom-color: var(--tooltip-color);
  }
`;

const position = (placement) => ({
  current: placement,
  flip() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const coordinateSetter = () => ({
  x: null,
  y: null,
  reset(point) {
    this.x = point.x;
    this.y = point.y;
  },

  restrictBoundary(boundary) {
    if (this.x < boundary.left) this.x = boundary.left;
    else if (this.x > boundary.right) this.x = boundary.right;

    if (this.y < boundary.top) this.y = boundary.top;
    else if (this.y > boundary.bottom) this.y = boundary.bottom;
  },
});

// this function calculates x and y and return the final result
const getCoordinates = (
  element,
  tooltip,
  placement,
  space,
  tooltipPosition
) => {
  let recursionCount = 0;
  const coordinate = coordinateSetter();
  const tooltipZone = {
    left: space,
    top: space,
    right: document.body.clientWidth - (tooltip.clientWidth + space),
    bottom: window.innerHeight - (tooltip.clientHeight + space),
  };
  const elementRectangle = element.getBoundingClientRect();

  // calling the function immediately after declaration
  return (function adjustCoordinates(originalPlacement) {
    recursionCount++;
    const retrievedPosition = position(originalPlacement);

    switch (retrievedPosition.current) {
      case "left":
        coordinate.x = elementRectangle.left - (tooltip.offsetWidth + space);
        coordinate.y =
          elementRectangle.top +
          (element.offsetHeight - tooltip.offsetHeight) / 2;
        tooltipPosition(90, 0, -50, 50, null, 100, null);
        break;

      case "right":
        coordinate.x = elementRectangle.right + space;
        coordinate.y =
          elementRectangle.top +
          (element.offsetHeight - tooltip.offsetHeight) / 2;
        tooltipPosition(270, 0, -50, 50, null, null, 100);
        break;

      case "top":
        coordinate.x =
          elementRectangle.left +
          (element.offsetWidth - tooltip.offsetWidth) / 2;
        coordinate.y = elementRectangle.top - (tooltip.offsetHeight + space);
        tooltipPosition(180, -50, 0, 100, null, 50, null);
        break;

      default: // positioning the tooltip below the element
        coordinate.x =
          elementRectangle.left +
          (element.offsetWidth - tooltip.offsetWidth) / 2;
        coordinate.y = elementRectangle.bottom + space;
        tooltipPosition(0, -50, 0, null, 100, 50, null);
    }

    // limiting the number of recursive call to maximum of 3 times
    if (recursionCount < 3) {
      // checking if we need to flip the position of the tooltip based on the tooltip zone or the boundary
      if (
        (retrievedPosition.isHorizontal() &&
          (coordinate.x < tooltipZone.left ||
            coordinate.x > tooltipZone.right)) ||
        (retrievedPosition.isVertical() &&
          (coordinate.y < tooltipZone.top || coordinate.y > tooltipZone.bottom))
      )
        coordinate.reset(adjustCoordinates(retrievedPosition.flip()));
    }

    // preventing overflow by restricting to the tooltip zone
    coordinate.restrictBoundary(tooltipZone);
    return coordinate;
  })(placement);
};

function Tooltip({
  text,
  placement = "bottom",
  space = 15,
  children,
  disabled = 0,
  clickable = 0,
  delay,
  initialText,
  finalText,
  arrow = 0,
  closeAfter = null
}) {
  const [show, setShow] = useState(0);
  const positionRef = useRef({ x: 0, y: 0 }); // this object changes based on the position of object and mouse. It influences the top and left of the styled component
  const tooltipRef = useRef();
  const rotationRef = useRef(null);
  const translateXRef = useRef(null);
  const translateYRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // sets the position of the tooltip
  const tooltipPosition = (
    rotation,
    translateX,
    translateY,
    top,
    bottom,
    left,
    right
  ) => {
    rotationRef.current = rotation;
    translateXRef.current = translateX;
    translateYRef.current = translateY;
    topRef.current = top;
    bottomRef.current = bottom;
    leftRef.current = left;
    rightRef.current = right;
  };

  const closeTooltip = (timeInMS) => {
    if (timeInMS) {
    setTimeout(() => {
      setShow(0)
    }, timeInMS);
  }
  return;
  }

  const mouseOverHandler = (event) => {
    setShow(1);
    positionRef.current = getCoordinates(
      event.currentTarget,
      tooltipRef.current,
      placement,
      space,
      tooltipPosition
    );
    closeTooltip(closeAfter);
  };

  const mouseOutHandler = () => {
    setShow(0);
  };

  const clickHandler = (event) => {
    setShow(!show);
    if (!show) event.currentTarget.textContent = finalText;
    else event.currentTarget.textContent = initialText;
    positionRef.current = getCoordinates(
      event.currentTarget,
      tooltipRef.current,
      placement,
      space,
      tooltipPosition
    );
    closeTooltip(closeAfter);
    setTimeout(() => {
      if(!show) event.target.textContent = initialText;
    }, closeAfter + 20)
  };
  return (
    <>
      {disabled
        ? children
        : clickable
        ? React.cloneElement(children, {
            onClick: clickHandler,
          })
        : React.cloneElement(children, {
            onMouseOver: mouseOverHandler,
            onMouseOut: mouseOutHandler,
          })}

      {/* adding props to the original elements cloning the original elements */}
      {disabled || (
        <Portal>
          <StyledTooltip
            delay={delay}
            ref={tooltipRef}
            positionRef={positionRef}
            state={show}
            rotationRef={rotationRef}
            translateXRef={translateXRef}
            translateYRef={translateYRef}
            topRef={topRef}
            bottomRef={bottomRef}
            rightRef={rightRef}
            leftRef={leftRef}
            arrow={arrow}
          >
            {text}
          </StyledTooltip>
        </Portal>
      )}
    </>
  );
}

export default Tooltip;
