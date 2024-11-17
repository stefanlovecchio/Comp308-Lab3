import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/auth';

const Signup = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [signup] = useMutation(SIGNUP);

   const handleSignup = async (e) => {
       e.preventDefault();
       try {
           await signup({ variables: { username, email, password } });
           alert('Signup successful!');
           setUsername('');
           setEmail('');
           setPassword('');
       } catch (err) {
           console.error(err.message);
           alert('Signup failed');
       }
   };

   return (
       <form onSubmit={handleSignup}>
           <h2>Signup</h2>
           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="submit">Signup</button>
       </form>
   );
};

export default Signup;
