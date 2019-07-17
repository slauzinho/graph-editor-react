import React from 'react';
import Terminal from 'terminal-in-react';
import { useDispatch, useStore } from 'react-redux';
import {
  validateAxis,
  validateImage,
  validateColor,
} from '../utils/validators';

const Graph = () => {
  const dispatch = useDispatch();
  const store = useStore();
  return (
    <div
      style={{
        isplay: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Terminal
        color="white"
        backgroundColor="black"
        barColor="black"
        style={{ fontWeight: 'bold', fontSize: '1em' }}
        commands={{
          I: {
            method: (args, print) => {
              try {
                if (
                  validateAxis(250, args['_'][0]) &&
                  validateAxis(250, args['_'][1])
                ) {
                  dispatch({
                    type: 'CREATE_BOARD',
                    payload: { columns: args['_'][0], rows: args['_'][1] },
                  });
                } else {
                  print(
                    'Invalid argument provided!\n Type help to know available commands.'
                  );
                }
              } catch {
                print(
                  'Invalid arguments provided. Type help to see the available commands'
                );
              }
            },
          },
          C: {
            method: (args, print, runCommand) => {
              dispatch({
                type: 'CLEAR_BOARD',
              });
            },
          },
          L: {
            method: (args, print, runCommand) => {
              try {
                const [column, row, color] = args['_'];
                if (
                  validateAxis(250, column) &&
                  validateAxis(250, row) &&
                  validateImage(store.getState()) &&
                  validateColor(color)
                ) {
                  dispatch({
                    type: 'COLOR_PIXEL',
                    payload: {
                      column: column - 1,
                      row: row - 1,
                      color,
                    },
                  });
                } else {
                  print(
                    'Invalid argument provided!\n Type help to know available commands.'
                  );
                }
              } catch {
                print(
                  'Invalid arguments provided. Type help to see the available commands'
                );
              }
            },
          },
          V: {
            method: (args, print) => {
              try {
                const [column, row1, row2, color] = args['_'];
                const imageSize = store.getState().length;
                if (
                  validateAxis(imageSize, column) &&
                  validateAxis(imageSize, row1) &&
                  validateAxis(imageSize, row2) &&
                  validateImage(store.getState()) &&
                  validateColor(color)
                ) {
                  dispatch({
                    type: 'DRAW_VERTICAL',
                    payload: {
                      column: column - 1,
                      row1: row1 - 1,
                      row2: row2 - 1,
                      color,
                    },
                  });
                } else {
                  print(
                    'Invalid argument provided!\n Type help to know available commands.'
                  );
                }
              } catch {
                print(
                  'Invalid arguments provided. Type help to see the available commands'
                );
              }
            },
          },
          H: {
            method: (args, print, runCommand) => {
              try {
                const [column1, column2, row, color] = args['_'];
                const imageSize = store.getState().length;
                if (
                  validateAxis(imageSize, column1) &&
                  validateAxis(imageSize, column2) &&
                  validateAxis(imageSize, row) &&
                  validateImage(store.getState()) &&
                  validateColor(color)
                ) {
                  dispatch({
                    type: 'DRAW_HORIZONTAL',
                    payload: {
                      column1: column1 - 1,
                      column2: column2 - 1,
                      row: row - 1,
                      color,
                    },
                  });
                } else {
                  print(
                    'Invalid argument provided!\n Type help to know available commands.'
                  );
                }
              } catch {
                print(
                  'Invalid arguments provided. Type help to see the available commands'
                );
              }
            },
          },
          S: {
            method: (args, print, runCommand) => {
              store.getState().map(column => print(column));
            },
          },
          F: {
            method: (args, print, runCommand) => {
              try {
                const [column, row, color] = args['_'];
                const imageSize = store.getState().length;
                if (
                  validateAxis(imageSize, column) &&
                  validateAxis(imageSize, row) &&
                  validateImage(store.getState()) &&
                  validateColor(color)
                ) {
                  dispatch({
                    type: 'DRAW_REGION',
                    payload: {
                      column: column - 1,
                      row: row - 1,
                      color,
                    },
                  });
                } else {
                  print(
                    'Invalid argument provided!\n Type help to know available commands.'
                  );
                }
              } catch {
                print(
                  'Invalid arguments provided. Type help to see the available commands'
                );
              }
            },
          },
        }}
        descriptions={{
          I:
            '[I M N]. Create a new M x N image with all pixels coloured white (O).',
          C: 'Clears the image',
          clear: 'Clears the console',
          L: '[L X Y C]. Colours the pixel (X,Y) with colour C.',
          V:
            '[V X Y1 Y2 C]. Draw a vertical segment of colour C in column X between rows Y1 and Y2 (inclusive).',
          H:
            '[H X1 X2 Y C]. Draw a horizontal segment of colour C in row Y between columns X1 and X2 (inclusive).',
          F:
            '[F X Y C]. Fill the region R with the colour C. R is defined as: Pixel (X,Y) belongs to R. Any other pixel which is the same colour as (X,Y) and shares a common side with any pixel in R also belongs to this region.',
          S: 'S. Show the contents of the current image',
        }}
        msg={`Graphical editors allow users to edit images in the same way text editors let us modify documents.\n
  Images are represented as an M x N array of pixels with each pixel given colour.\n
  Run "help" to know what commands are available`}
      />
    </div>
  );
};

export default Graph;
