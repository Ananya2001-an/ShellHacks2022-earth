import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {UserProvider} from './contexts/UserProvider'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { IssuesProvider } from './contexts/IssuesProvider';
import { ConversationProvider } from './contexts/ConversationProvider';
import {SocketProvider} from './contexts/SocketProvider'
import { QueryProvider } from './contexts/QueryProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <UserProvider>
    <SocketProvider>
    <IssuesProvider>
    <ConversationProvider>
    <QueryProvider>
    <App />
    </QueryProvider>
    </ConversationProvider>
    </IssuesProvider>
    </SocketProvider>
    </UserProvider>
    </BrowserRouter>
);

