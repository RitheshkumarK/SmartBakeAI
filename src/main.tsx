import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BakeryProvider } from './context/BakeryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BakeryProvider>
      <App />
    </BakeryProvider>
  </React.StrictMode>
);
