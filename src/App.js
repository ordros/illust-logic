import './App.css';
import styled from 'styled-components';
import Table from './components/Table';

function App() {
  const xHints = [
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2, 3, 5, 6, 3],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2, 3],
  ];

  const yHints = [
    [1, 2],
    [1, 2],
    [1, 2, 5],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2],
    [1, 2, 5],
    [1, 2],
    [1, 2],
  ];
  // const xHints = [
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ];

  // const yHints = [
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ];
  return (
    <div className="App">
      <Table size={10} xHints={xHints} yHints={yHints} />
    </div>
  );
}

export default App;
