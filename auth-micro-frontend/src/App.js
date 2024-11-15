import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import Auth from './components/Auth';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Auth />
      </div>
    </ApolloProvider>
  );
}

export default App;
