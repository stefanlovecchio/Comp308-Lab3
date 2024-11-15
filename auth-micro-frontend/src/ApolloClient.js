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

const LOGOUT_MUTATION = gql`
  mutation Logout($token: String!) {
    logout(token: $token)
  }
`;

const Auth = () => {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [token, setToken] = useState('');

  const handleSignup = async () => {
    try {
      await signup({ variables: formData });
      alert('User signed up successfully!');
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email: formData.email, password: formData.password } });
      setToken(data.login);
      alert('User logged in successfully!');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ variables: { token } });
      setToken('');
      alert('User logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input type="text" placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Auth;
