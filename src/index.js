/* istanbul ignore file */
import "@babel/polyfill"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('zuvafetest'));
root.render(
    <App />
);