import DashboardPage from '../src/pages/dashboard/DashboardPage.jsx';
import PublicationPage from '../src/pages/publication/PublicationPage.jsx';

const routes = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/publication/:id',
    element: <PublicationPage />,
  },
];

export default routes;