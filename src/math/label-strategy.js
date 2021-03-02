export const getLabelStartForSide1 = (point1, point2, padding) => {
  const x = point1.x + (point2.x - point1.x) / 2;
  return { x, y: point1.y + padding };
}

export const getLabelStart = (point1, point2, padding) => {
  const x = point1.x > point2.x ? 
  point2.x + ((point1.x - point2.x) / 2) + padding : 
  point2.x - ((point2.x - point1.x) / 2) + padding;

  const y = point1.y + (point2.y - point1.y) / 2;
  return { x, y };
}