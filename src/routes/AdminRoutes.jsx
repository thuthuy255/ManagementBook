import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from 'layout/Dashboard';
import UpdateBook from 'pages/admin/book/updateBook/UpdateBook';
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
const AddBook = Loadable(lazy(() => import('pages/admin/book/addbook/AddBook')));
const AddBanner = Loadable(lazy(() => import('pages/admin/banner/addBanner/AddBanner')));
const UpdateBanner = Loadable(lazy(() => import('pages/admin/banner/updateBanner/UpdateBanner')));
const AddCart = Loadable(lazy(() => import('pages/admin/cart/addCart/AddCart')));
const AddPost = Loadable(lazy(() => import('pages/admin/postManagement/addPost/AddPost')));
const PageStaff = Loadable(lazy(() => import('pages/admin/staff/StaffManagement')));
const PageAddUser = Loadable(lazy(() => import('pages/admin/user/addUser/AddUser')));
const PageUpdateUser = Loadable(lazy(() => import('pages/admin/user/updateUser/UpdateUser')));
const PageCategory = Loadable(lazy(() => import('pages/admin/category/CategoryManagement')));
const PageProfile = Loadable(lazy(() => import('pages/admin/profile/Profile')));
const PageUpdatePost = Loadable(lazy(() => import('pages/admin/postManagement/updatePost/UpdatePost')));
const PageCustomer = Loadable(lazy(() => import('pages/admin/customer/ManagementCustomer')));
const PagePromotion = Loadable(lazy(() => import('pages/admin/promotion/ManagementPromotion')));
const UpdatePromotion = Loadable(lazy(() => import('pages/admin/promotion/updatePromotion/updatePromotion')));
const AddPromotion = Loadable(lazy(() => import('pages/admin/promotion/addPromotion/AddPromotion')));
const PageCustomercare = Loadable(lazy(() => import('pages/admin/customer-care/ManagementCustomercare')));
const UpdateStaff = Loadable(lazy(() => import('pages/admin/customer/updateUser/UpdateUser')));
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
    // {
    //   path: 'cart-management',
    //   element: <PageCart />
    // },
    {
      path: 'add-book',
      element: <AddBook />
    },
    {
      path: 'update-book/:slug',
      element: <UpdateBook />
    },
    {
      path: 'staf-management',
      element: <PageStaff />
    },
    {
      path: 'category-management',
      element: <PageCategory />
    },
    {
      path: 'profile',
      element: <PageProfile />
    },
    {
      path: 'add-banner',
      element: <AddBanner />
    },
    {
      path: 'update-banner',
      element: <UpdateBanner />
    },
    {
      path: 'add-cart',
      element: <AddCart />
    },
    {
      path: 'add-post',
      element: <AddPost />
    },
    {
      path: 'add-user',
      element: <PageAddUser />
    },
    {
      path: 'update-user',
      element: <PageUpdateUser />
    },
    {
      path: 'update-staff',
      element: <UpdateStaff />
    },
    {
      path: 'update-post/:title',
      element: <PageUpdatePost />
    },
    {
      path: 'customer-management',
      element: <PageCustomer />
    },
    {
      path: 'promotion-management',
      element: <PagePromotion />
    },
    {
      path: 'add-promotion',
      element: <AddPromotion />
    },
    {
      path: 'update-promotion',
      element: <UpdatePromotion />
    },
    {
      path: 'customercare-management',
      element: <PageCustomercare />
    }

    // {
    //   path: 'customercare-management',
    //   element: <PageCustomercare />
    // }
  ]
};
// ✅ Tạo một route riêng cho "profile" để nó không nằm trong Dashboard
// const ProfileRoute = {
//   path: "/profile",
//   element: <PageProfile />
// };
const AdminRoutes = createBrowserRouter([MainRoutes]);

export default AdminRoutes;
