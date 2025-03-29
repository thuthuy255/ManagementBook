import {
  ChromeOutlined,
  QuestionOutlined,
  BookOutlined,
  ReadOutlined,
  SolutionOutlined,
  SwitcherOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagOutlined,
  CustomerServiceOutlined,
  UserSwitchOutlined,
  BarcodeOutlined
} from '@ant-design/icons';
import { ADMIN } from 'constants/Role';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  BookOutlined,
  ReadOutlined,
  SolutionOutlined,
  SwitcherOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagOutlined,
  CustomerServiceOutlined,
  UserSwitchOutlined,
  BarcodeOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const management = {
  id: 'management',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'book-management',
      title: 'Quản lý sách',
      type: 'item',
      url: '/book-management',
      icon: icons.ReadOutlined
    },
    {
      id: 'post-management',
      title: 'Quản lý bài viết',
      type: 'item',
      url: '/post-management',
      icon: icons.BookOutlined
    },
    {
      id: 'user-management',
      title: 'Quản lý nhân viên',
      type: 'item',
      url: '/user-management',
      icon: icons.SolutionOutlined,
      requiredRole: ADMIN
    },
    {
      id: 'banner-management',
      title: 'Quản lý banner',
      type: 'item',
      url: '/banner-management',
      icon: icons.SwitcherOutlined
    },
    {
      id: 'order-management',
      title: 'Quản lý đơn hàng',
      type: 'item',
      url: '/order-management',
      icon: icons.ShoppingOutlined
    },
    {
      id: 'category-management',
      title: 'Quản lý danh mục',
      type: 'item',
      url: '/category-management',
      icon: icons.TagOutlined
    },
    {
      id: 'customer-management',
      title: 'Quản lý khách hàng',
      type: 'item',
      url: '/customer-management',
      icon: icons.UserSwitchOutlined
    },
    {
      id: 'promotion-management',
      title: 'Quản lý khuyến mại',
      type: 'item',
      url: '/promotion-management',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'customercare-management',
      title: 'Chăm sóc khách hàng',
      type: 'item',
      url: '/customercare-management',
      icon: icons.CustomerServiceOutlined
    },
  ]
};

export default management;
