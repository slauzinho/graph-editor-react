import React from 'react';
import Terminal from 'terminal-in-react';
import { useDispatch, useStore } from 'react-redux';

const Graph = () => {
  const dispatch = useDispatch();
  const store = useStore();
  return (
    <Terminal
      color="white"
      backgroundColor="black"
      barColor="black"
      style={{ fontWeight: 'bold', fontSize: '1em' }}
      commands={{
        I: {
          method: (args, print, runCommand) => {
            dispatch({
              type: 'CREATE_BOARD',
              payload: { columns: args['_'][0], rows: args['_'][1] },
            });
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
            const [column, row, color] = args['_'];
            dispatch({
              type: 'COLOR_PIXEL',
              payload: {
                column: column - 1,
                row: row - 1,
                color,
              },
            });
          },
        },
        V: {
          method: (args, print, runCommand) => {
            const [column, row1, row2, color] = args['_'];
            dispatch({
              type: 'DRAW_VERTICAL',
              payload: {
                column: column - 1,
                row1: row1 - 1,
                row2: row2 - 1,
                color,
              },
            });
          },
        },
        H: {
          method: (args, print, runCommand) => {
            const [column1, column2, row, color] = args['_'];
            dispatch({
              type: 'DRAW_HORIZONTAL',
              payload: {
                column1: column1 - 1,
                column2: column2 - 1,
                row: row - 1,
                color,
              },
            });
          },
        },
        S: {
          method: (args, print, runCommand) => {
            store.getState().map(column => print(column));
          },
        },
        F: {
          method: (args, print, runCommand) => {
            const [column, row, color] = args['_'];
            dispatch({
              type: 'DRAW_REGION',
              payload: {
                column: column - 1,
                row: row - 1,
                color,
              },
            });
          },
        },
      }}
      descriptions={{
        'open-google': 'opens google.com',
        showmsg: 'shows a message',
        alert: 'alert',
        popup: 'alert',
      }}
      msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
    />
  );
};

export default Graph;
