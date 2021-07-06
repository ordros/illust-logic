import './App.css';
import styled from 'styled-components';
import Table from './components/Table';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux'
import pixelTableReducer from './reducers/pixelTableReducer';
import PixelTable from './components/PixelTable';
import PixelTablePage from './components/PixelTablePage';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Route, Router } from 'react-router';

function App() {
  const store = createStore(pixelTableReducer);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={PixelTablePage} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
