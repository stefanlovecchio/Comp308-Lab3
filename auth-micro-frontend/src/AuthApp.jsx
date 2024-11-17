import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password)
    }
`;

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export default function AuthApp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signup] = useMutation(SIGNUP_MUTATION, {
        onCompleted: (data) => {
            alert(data.signup); 
            setUsername(''); 
            setEmail('');
            setPassword('');
        },
        onError: (error) => {
            alert(`Signup Error: ${error.message}`);
        },
    });

    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            alert(`Login successful! Token: ${data.login}`);
            setEmail(''); 
            setPassword('');
        },
        onError: (error) => {
            alert(`Login Error: ${error.message}`);
        },
    });

    const handleSignup = (e) => {
        e.preventDefault();
        signup({
            variables: { username, email, password },
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login({
            variables: { email, password },
        });
    };

    return (
        <div>
            <h1>Authentication Micro Frontend</h1>
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
