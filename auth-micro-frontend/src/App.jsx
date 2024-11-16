import React, { useState } from 'react';
import Signup from './components/signup';
import Login from './components/login';
import Logout from './components/logout';

const App = () => {
   const [token, setToken] = useState(null);

   const clearToken = () => {
       setToken(null);
   };

   return (
       <div>
           <h1>Authentication Micro Frontend</h1>
           {!token ? (
               <>
                   <Signup />
                   <Login setToken={setToken} />
               </>
           ) : (
               <Logout token={token} clearToken={clearToken} />
           )}
       </div>
   );
};

export default App;
