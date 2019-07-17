import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Graph from './components/Graph';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Graph />
      </div>
    </Provider>
  );
}

export default App;
