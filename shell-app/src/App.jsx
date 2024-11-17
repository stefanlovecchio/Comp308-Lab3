import React, { useEffect, Suspense } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const AuthMicroFrontend = React.lazy(() => import('authMicroFrontend/AuthApp'));

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', 
    cache: new InMemoryCache(),
});

const App = () => {
    useEffect(() => {
        alert('Auth Micro-Frontend Loaded!');
    }, []); 

    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Shell App</h1>
                <Suspense fallback={<div>Loading Auth Micro-Frontend...</div>}>
                    <AuthMicroFrontend />
                </Suspense>
            </div>
        </ApolloProvider>
    );
};

export default App;
