import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './App.jsx';
import './styles.css';

//Mount the tutorial's Game component within the index.html's root element
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Game />
  </StrictMode>,
);
