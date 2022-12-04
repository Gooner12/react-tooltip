export const getSelectedText = (removeRange) => {
  const selection = window.getSelection();
  // removing the range targeted to be used on mouseDown event
  if (removeRange) {
    selection.removeAllRanges();
    return null;
  }
  const range = selection.getRangeAt(0);
  selection.removeAllRanges();
  selection.addRange(range);
  console.log(selection);
  return [range.toString(), range, selection];
};

export const placeCaretAtEnd = (inputElement) => {
  const range = document.createRange();
  range.selectNodeContents(inputElement);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

export const getTextWidth = (text, font) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (font) context.font = font;
  const width = context.measureText(text).width;
  return width;
};
