import { lazy, Suspense } from 'react';
// project import
import Loadable from 'components/Loadable';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from 'layout/Dashboard';
// render - login
const Color = Loadable(lazy(() => import('pages/admin/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/admin/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/admin/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/admin/dashboard/index')));
const PageBook = Loadable(lazy(() => import('pages/admin/book/PageBook')));
const PagePost = Loadable(lazy(() => import('pages/admin/postManagement/PostManagement')));
const PageUser = Loadable(lazy(() => import('pages/admin/user/ManagementUser')));
const PageBanner = Loadable(lazy(() => import('pages/admin/banner/BannerManagement')));
const PageOrder = Loadable(lazy(() => import('pages/admin/order/OrderManagement')));
const PageCart = Loadable(lazy(() => import('pages/admin/cart/CartManagement')));
const AddBook = Loadable(lazy(() => import('pages/admin/book/addbook/AddBook')));
const PageStaff = Loadable(lazy(() => import('pages/admin/staff/StaffManagement')));
const PageCategory = Loadable(lazy(() => import('pages/admin/category/CategoryManagement')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/admin/extra-pages/sample-page')));

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'book-management',
      element: <PageBook />
    },
    {
      path: 'post-management',
      element: <PagePost />
    },
    {
      path: 'user-management',
      element: <PageUser />
    },
    {
      path: 'banner-management',
      element: <PageBanner />
    },
    {
      path: 'order-management',
      element: <PageOrder />
    },
    {
      path: 'cart-management',
      element: <PageCart />
    },
    {
      path: 'add-book',
      element: <AddBook />
    },
    {
      path: 'staf-management',
      element: <PageStaff />
    },
    {
      path: 'category-management',
      element: <PageCategory />
    }
  ]
};
const AdminRoutes = createBrowserRouter([MainRoutes]);

export default AdminRoutes;
