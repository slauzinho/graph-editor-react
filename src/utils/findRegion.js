const neighbors = (coordinate, image, color) => {
  const connectedNeighbors = [
    [coordinate[0] - 1, coordinate[1]],
    [coordinate[0], coordinate[1] - 1],
    [coordinate[0] + 1, coordinate[1]],
    [coordinate[0], coordinate[1] + 1],
  ];

  const validCells = connectedNeighbors.filter(
    pixel =>
      pixel[0] >= 0 &&
      pixel[0] < image[0].length &&
      pixel[1] >= 0 &&
      pixel[1] < image.length
  );

  const successors = validCells.filter(
    pixel => image[pixel[1]][pixel[0]] === color
  );

  return successors;
};

export function findRegion(image, column, row, colorToMatch) {
  const visited = new Set();
  const shouldBeVisited = [[column, row]];
  const coordinatesInR = [];

  while (shouldBeVisited.length) {
    console.log(shouldBeVisited);
    const currentCoordinate = shouldBeVisited.shift();
    visited.add(currentCoordinate.toString());
    const validNeighbors = neighbors(currentCoordinate, image, colorToMatch);

    for (let neighbor of validNeighbors) {
      if (!visited.has(neighbor.toString())) {
        shouldBeVisited.push(neighbor);
        coordinatesInR.push(neighbor);
      }
    }
  }

  return coordinatesInR;
}
