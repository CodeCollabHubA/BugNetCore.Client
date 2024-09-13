import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { logout as logoutAction } from 'src/services/authService';

import DashboardLayout, {loader as dashboardLoader} from 'src/layouts/dashboard';
import ResetPasswordPage from 'src/pages/auth-reset-pasword';
import { loader as bugsLoader} from 'src/pages/bug';
import { loader as bugDetailsLoader} from 'src/sections/bug/view/bug-detail-view';
import VerifyEmailPage from 'src/pages/auth-verify-email';

export const BugDetailPage = lazy(() => import('src/pages/bug-detail-page'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const BugPage = lazy(() => import('src/pages/bug'));
export const AuthPage = lazy(() => import('src/pages/auth'));
export const ProductsPage = lazy(() => import('src/pages/products'));
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
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      {
        path: 'chat/:requestId/:userId',
        element: <ChatPage />,
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
