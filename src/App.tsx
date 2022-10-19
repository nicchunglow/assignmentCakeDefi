import React from 'react';
import './App.css';
import Exchange from './pages/Exchange';

const App: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-orange-100"
      aria-label="main-app-container"
    >
      <Exchange />
    </div>
  );
};

export default App;
