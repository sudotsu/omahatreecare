import React from 'react';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import EmergencyTreeService from './pages/EmergencyTreeService';
import TreeConsultation from './pages/TreeConsultation';
import CityHub from './pages/CityHub';
import LocationTemplate from './pages/LocationTemplate';

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
  // Dynamic location routes
  {
    path: '/locations/:city',
    element: <CityHub />,
    entry: 'src/pages/CityHub.jsx',
  },
  {
    path: '/locations/:city/:neighborhood',
    element: <LocationTemplate />,
    entry: 'src/pages/LocationTemplate.jsx',
  },
];
