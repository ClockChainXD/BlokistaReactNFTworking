import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import {  Web3Provider } from '@ethersproject/providers';

import store from './store';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-virtualized/styles.css';

import './style.scss';
import { AudioProvider } from './utils/hooks/useAudio';


function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <AudioProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AudioProvider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
