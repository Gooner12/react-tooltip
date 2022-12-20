# React Tooltip

This is a reusable tooltip component for react applications, which allows for the creation of informational and interactable tooltip messages with some customisation.

The props accepted by the tooltip are:

| Props | Description |
| --- | --- |
| text | It takes a plain string or a react component: if you wish to display the component inside the tooltip. |
| placement(optional) | It takes a string value to determine the location of the tooltip. Allowed values are "top", "left", "right" and "bottom", and the default value is "bottom". |
| space(optional) | It determines the spacing between the tooltip and the actual component to which the tooltip is attached. Default value is "15 pixels". |
| disabled(optional) | This provides the option to enable or disable the tooltip. Allowed values are "0" and "1". To disable the tooltip, pass "1" as a prop value. |
| interaction (optional | This enables the tooltip to offer the additional functionality of being interactable. Allowed values are "click" and "select". If this prop is not provided then a default tooltip is applied for a component. The "click" interaction enables a click handler on the tooltip. The "select" interaction activates the tooltip upon the selection of a text. In the demo, click interaction is demonstrated by the interactable tooltip button. |
| delay (optional) | Provides an option to delay the display of a tooltip. If no value is provided, the default is 0.01 seconds. |
| arrow (optional) | Customises the tooltip appearance with an arrowhead. Accepted values are "0" and "1". "1" will show the arrow pointer. Default value is "0". |
| closeAfter (optional) | Indicates the time until which the tooltip can be displayed. Accepts a time input in milliseconds. |

*A little heads up. Three files, Tooltip.js, Portal.js and styles.js, contain the core logic for working and styling of the tooltip. Other files are there to support the implementation of the tooltip.*

## Demo of the tooltip:
![](https://github.com/Gooner12/react-tooltip/blob/main/demo/Demo.gif)

