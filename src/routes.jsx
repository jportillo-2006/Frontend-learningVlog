import Dashboard from './components/Dashboard.jsx';
import PublicationDetails from './components/PublicationDetails.jsx';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/publication/:id',
    element: <PublicationDetails />,
  },
];

export default routes;