import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {UserProvider} from './contexts/UserProvider'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <UserProvider>
    <App />
    </UserProvider>
    </BrowserRouter>
);

