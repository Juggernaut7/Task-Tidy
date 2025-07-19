// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\app\App.jsx
import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth'; // Corrected path based on new structure
import LandingAuthPage from '../features/auth/pages/LandingAuthPage'; // Corrected path
import DashboardPage from '../features/tasks/pages/DashboardPage'; // Corrected path

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="App">
            {isAuthenticated ? <DashboardPage /> : <LandingAuthPage />}
        </div>
    );
}

export default App;