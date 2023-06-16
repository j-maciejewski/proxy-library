export const colorToRGB = (color: CSSStyleDeclaration["color"]) => {
  const { style } = new Option();
  style.color = color;
  return style.color;
};
