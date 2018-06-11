// posible options where next field can be

export const moveOptions = [
  [0, 3], [0, -3], [3, 0], [-3, 0], [2, 2], [-2, -2], [-2, 2], [2, -2],
];

// generate options for field

export const createBoard = () => {
  const board = [];
  for (let i = 0; i <= 9; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      board.push(i.toString() + j.toString())
    }
  }
  return board;
};
