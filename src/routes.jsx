import React from 'react';
import CityHub from './pages/CityHub';
import EmergencyTreeService from './pages/EmergencyTreeService';
import HomePage from './pages/HomePage';
import LocationTemplate from './pages/LocationTemplate';
import ServiceTemplate from './pages/ServiceTemplate';
import ToolsPage from './pages/ToolsPage';
import TreeConsultation from './pages/TreeConsultation';

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
  // Locations
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
  // Services (Clean URLs)
  {
    path: '/services/:serviceId',
    element: <ServiceTemplate />,
    entry: 'src/pages/ServiceTemplate.jsx',
  },
];