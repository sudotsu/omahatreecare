import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
