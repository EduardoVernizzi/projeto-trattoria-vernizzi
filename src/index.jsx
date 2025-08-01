import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../src/styles/main.scss';           
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
