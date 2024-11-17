import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient.js'
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <AuthProvider>
      <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
