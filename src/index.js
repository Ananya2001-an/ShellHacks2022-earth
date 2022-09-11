import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {UserProvider} from './contexts/UserProvider'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { IssuesProvider } from './contexts/IssuesProvider';
import { ConversationProvider } from './contexts/ConversationProvider';
import {SocketProvider} from './contexts/SocketProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <UserProvider>
    <SocketProvider>
    <IssuesProvider>
    <ConversationProvider>
    <App />
    </ConversationProvider>
    </IssuesProvider>
    </SocketProvider>
    </UserProvider>
    </BrowserRouter>
);

