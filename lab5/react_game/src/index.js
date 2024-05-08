import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='game'>
    <Game />
  </div>
);