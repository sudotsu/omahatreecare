import React from 'react';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import EmergencyTreeService from './pages/EmergencyTreeService';
import TreeConsultation from './pages/TreeConsultation';

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
  {
    path: '/emergency-tree-service-omaha',
    element: <EmergencyTreeService />,
    entry: 'src/pages/EmergencyTreeService.jsx',
  },
  {
    path: '/tree-consultation-omaha',
    element: <TreeConsultation />,
    entry: 'src/pages/TreeConsultation.jsx',
  },
];
