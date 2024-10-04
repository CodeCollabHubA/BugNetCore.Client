import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { logout as logoutAction } from 'src/services/authService';

import DashboardLayout, {loader as dashboardLoader} from 'src/layouts/dashboard';
import { loader as bugsLoader} from 'src/pages/bug';
import { loader as supportRequestLoader} from 'src/pages/supportRequest';
import { loader as projectLoader} from 'src/pages/project';
import { loader as userLoader} from 'src/pages/user';
import ResetPasswordPage from 'src/pages/auth-reset-pasword';
import { loader as bugDetailsLoader} from 'src/sections/bug/view/bug-detail-view';
import VerifyEmailPage from 'src/pages/auth-verify-email';

export const BugDetailPage = lazy(() => import('src/pages/bug-detail-page'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const SupportRequestPage = lazy(() => import('src/pages/supportRequest'));
export const UserPage = lazy(() => import('src/pages/user'));
export const BugPage = lazy(() => import('src/pages/bug'));
export const AuthPage = lazy(() => import('src/pages/auth'));
export const ProjectsPage = lazy(() => import('src/pages/project'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const routes = createBrowserRouter([
  {
    element: <DashboardLayout />,
    id: 'dashboard',
    loader: dashboardLoader,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'bug',
        id: 'bugs',
        loader: bugsLoader,
        children: [
          { element: <BugPage />, index: true },
          {
            path: ':bugId',
            element: <BugDetailPage />,
            id: 'bug_details',
            loader: bugDetailsLoader,
          },
        ],
      },
      { 
        path: 'user',
        element: <UserPage />,
        id:'user',
        loader: userLoader
       },
      { 
        path: 'project',
        element: <ProjectsPage />,
        id:'project',
        loader: projectLoader
      },
      { 
        path: 'supportRequest',
        id:'supportRequest',
        loader: supportRequestLoader,
        children:[
          {element: <SupportRequestPage />, index:true},
          {
            path: 'chat/:requestId/:userId',
            element: <ChatPage />,
            id:'chatPage',
            
          },
        ]
       },
      
    ],
  },
  {
    path: 'auth',
    children: [
      { element: <AuthPage />, index: true },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
    ],
  },
  {
    path: 'logout',
    action: logoutAction,
  },

  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
