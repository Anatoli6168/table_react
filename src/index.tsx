import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Normalize />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);