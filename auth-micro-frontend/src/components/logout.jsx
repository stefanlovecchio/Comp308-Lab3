import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../graphql/auth';

const Logout = ({ token, clearToken }) => {
   const [logout] = useMutation(LOGOUT);

   const handleLogout = async () => {
       try {
           await logout({ variables: { token } });
           clearToken(); 
           alert('Logout successful!');
       } catch (err) {
           console.error(err.message);
           alert('Logout failed');
       }
   };

   return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
