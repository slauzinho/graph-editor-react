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
  let shouldBeVisited = new Set();
  shouldBeVisited.add([column, row].toString());
  const coordinatesInR = [];

  while (shouldBeVisited.size) {
    const currentCoordinateString = shouldBeVisited.values().next().value;
    let currentCoordinate = currentCoordinateString.split(',');
    currentCoordinate = [
      parseInt(currentCoordinate[0]),
      parseInt(currentCoordinate[1]),
    ];
    if (!visited.has(currentCoordinate.toString())) {
      visited.add(currentCoordinate.toString());
      const validNeighbors = neighbors(currentCoordinate, image, colorToMatch);

      for (let neighbor of validNeighbors) {
        if (!visited.has(neighbor.toString())) {
          shouldBeVisited.add(neighbor.toString());
          coordinatesInR.push(neighbor);
        }
      }
    }

    shouldBeVisited.delete(shouldBeVisited.values().next().value);
  }

  return coordinatesInR;
}
