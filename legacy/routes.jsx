import React from 'react'
import CityHub from './pages/CityHub'
import EmergencyTreeService from './pages/EmergencyTreeService'
import HomePage from './pages/HomePage'
import LocationTemplate from './pages/LocationTemplate'
import Locations from './pages/Locations'; // <--- 1. ADD THIS IMPORT
import ServiceTemplate from './pages/ServiceTemplate'
import ToolsPage from './pages/ToolsPage'
import TreeConsultation from './pages/TreeConsultation'

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

  // --- NEW: The Master Locations Directory ---
  {
    path: '/locations',
    element: <Locations />,
    entry: 'src/pages/Locations.jsx', // <--- 2. MATCH THE PATTERN
  },
  // -------------------------------------------

  // Locations (City Hubs)
  {
    path: '/locations/:city',
    element: <CityHub />,
    entry: 'src/pages/CityHub.jsx',
  },
  // Neighborhood Pages
  {
    path: '/locations/:city/:neighborhood',
    element: <LocationTemplate />,
    entry: 'src/pages/LocationTemplate.jsx',
  },
  // Service Pages
  {
    path: '/services/:serviceId',
    element: <ServiceTemplate />,
    entry: 'src/pages/ServiceTemplate.jsx',
  },
]