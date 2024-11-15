import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import VitalSigns from './components/VitalSigns';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <VitalSigns />
      </div>
    </ApolloProvider>
  );
}

export default App;
