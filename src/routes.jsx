import React from 'react';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';

// Route configuration for vite-react-ssg
// Using React Router data API instead of JSX-based routing
export const routes = [
  {
    path: '/',
    element: <HomePage />,
    entry: 'src/pages/HomePage.jsx',
  },
  {
    path: '/tools',
    element: <ToolsPage />,
    entry: 'src/pages/ToolsPage.jsx',
  },
];
