import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router';

import './styles/general.scss';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);