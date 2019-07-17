import { createReducer, createAction } from 'redux-starter-kit';
import { findRegion } from '../utils/findRegion';

const createBoard = createAction('CREATE_BOARD');
const clearBoard = createAction('CLEAR_BOARD');
const colorPixel = createAction('COLOR_PIXEL');
const drawVertical = createAction('DRAW_VERTICAL');
const drawHorizontal = createAction('DRAW_HORIZONTAL');
const drawRegion = createAction('DRAW_REGION');

const imageReducer = createReducer([], {
  [createBoard]: (state = [], { payload: { columns, rows } }) =>
    Array(rows)
      .fill()
      .map(() => Array(columns).fill('O')),
  [clearBoard]: state => {
    state = state.map(column => column.fill('O'));
  },
  [colorPixel]: (state, { payload: { column, row, color } }) => {
    state[row][column] = color;
  },
  [drawVertical]: (state, { payload: { column, row1, row2, color } }) => {
    state.map((columns, index) => {
      if (row1 <= index && index <= row2) {
        return (columns[column] = color);
      } else {
        return columns;
      }
    });
  },
  [drawHorizontal]: (state, { payload: { column1, column2, row, color } }) => {
    state[row] = state[row].map((item, index) => {
      if (column1 <= index && index <= column2) {
        return color;
      } else {
        return item;
      }
    });
  },
  [drawRegion]: (state, { payload: { column, row, color } }) => {
    const pixelsInR = findRegion(state, column, row, state[row][column]);

    pixelsInR.map(pixel => (state[pixel[1]][pixel[0]] = color));
  },
});

export default imageReducer;
