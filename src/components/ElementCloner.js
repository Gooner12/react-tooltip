function ElementCloner ({ property, children }) {
    switch (property) {
      case "click":
        return React.cloneElement(children, {
          onClick: clickHandler,
        });
      case "select":
        return React.cloneElement(children, {
          onMouseUp: selectHandler,
          onMouseDown: clearHandler,
        });
      default:
        return React.cloneElement(children, {
          onMouseOver: mouseOverHandler,
          onMouseOut: mouseOutHandler,
        });
    }
};

export default ElementCloner;

