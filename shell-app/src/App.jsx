import React, { Suspense, useEffect } from 'react';

const AuthMicroFrontend = React.lazy(() => import('authMicroFrontend/AuthApp'));
const VitalSignsMicroFrontend = React.lazy(() => import('vitalSignsMicroFrontend/VitalSigns'));

const App = () => {
    useEffect(() => {
        import('authMicroFrontend/AuthApp')
            .then((module) => console.log('Auth Micro-Frontend loaded:', module))
            .catch((err) => console.error('Error loading Auth Micro-Frontend:', err));

        import('vitalSignsMicroFrontend/VitalSigns')
            .then((module) => console.log('Vital Signs Micro-Frontend loaded:', module))
            .catch((err) => console.error('Error loading Vital Signs Micro-Frontend:', err));
    }, []);

    return (
        <div>
            <h1>Shell App</h1>
            <Suspense fallback={<div>Loading Auth Micro-Frontend...</div>}>
                <AuthMicroFrontend />
            </Suspense>
            <Suspense fallback={<div>Loading Vital Signs Micro-Frontend...</div>}>
                <VitalSignsMicroFrontend />
            </Suspense>
        </div>
    );
};

export default App;
