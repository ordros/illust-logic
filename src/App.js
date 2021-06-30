import './App.css';
import styled from 'styled-components';
import Table from './components/Table';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux'
import pixelTableReducer from './reducers/pixelTableReducer';
import PixelTable from './components/PixelTable';
import PixelTablePage from './components/PixelTablePage';

function App() {
  const store = createStore(pixelTableReducer);

  return (
    <div className="App">
      <Provider store={store}>
        <PixelTablePage />
      </Provider>
    </div>
  );
}

export default App;
