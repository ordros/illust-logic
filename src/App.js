import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import pixelTableReducer from './reducers/pixelTableReducer';
import { BrowserRouter, Route } from 'react-router-dom';
import EditQuestionPage from './components/EditQuestionPage';
import SolveQuestionPage from './components/SolveQuestionPage';

function App() {
  const store = createStore(pixelTableReducer);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/create" component={EditQuestionPage} />
          <Route path="/solve" component={SolveQuestionPage} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
