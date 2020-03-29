import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import app from './Reducer/app';
import initState from './initState';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  app,
  initState,
  applyMiddleware(logger),
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};
store.subscribe(render);
render();
registerServiceWorker();
