import React, { useEffect, Suspense } from 'react';

const AuthMicroFrontend = React.lazy(() => import('authMicroFrontend/AuthApp'));
const VitalSignsMicroFrontend = React.lazy(() => import('vitalSignsMicroFrontend/VitalSigns'));

const App = () => {
    useEffect(() => {
        console.log('Attempting to load Auth Micro-Frontend...');
        import('authMicroFrontend/AuthApp')
            .then((module) => console.log('Auth Micro-Frontend Loaded:', module))
            .catch((err) => console.error('Failed to load Auth Micro-Frontend:', err));

        console.log('Attempting to load Vital Signs Micro-Frontend...');
        import('vitalSignsMicroFrontend/VitalSigns')
            .then((module) => console.log('Vital Signs Micro-Frontend Loaded:', module))
            .catch((err) => console.error('Failed to load Vital Signs Micro-Frontend:', err));
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
