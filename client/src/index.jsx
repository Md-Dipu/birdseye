import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
