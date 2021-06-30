import './App.css';
import styled from 'styled-components';
import Table from './components/Table';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux'
import pixelTableReducer from './reducers/pixelTableReducer';

function App() {
  // const size = 10;
  // const xHints = [
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2, 3, 5, 6, 3],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2, 3],
  // ];

  // const yHints = [
  //   [1, 2],
  //   [1, 2],
  //   [1, 2, 5],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2],
  //   [1, 2, 5],
  //   [1, 2],
  //   [1, 2],
  // ];

  const size = 10;

  const xHints = Array.from({length: size}, (_, index) => index)
    .map((_) => [null, null, null]);
  const yHints = Array.from({length: size}, (_, index) => index)
    .map((_) => [null, null, null]);
    

  const store = createStore(pixelTableReducer);
  return (
    <div className="App">
      <Provider store={store}>
        <Table size={size} xHints={xHints} yHints={yHints} />
      </Provider>
    </div>
  );
}

export default App;
