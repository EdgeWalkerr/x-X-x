import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Root from './index';
import './tailwind.css';

console.log(ReactDOMServer.renderToString(<Root />));

ReactDOM.hydrate(<Root />, document.getElementById('root'));
