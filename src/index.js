import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Main } from './styles';

ReactDOM.render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>,
  document.getElementById('root')
);
