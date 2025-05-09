import { Button, Menu } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Ruler } from 'lucide-react';
import { JSX, useEffect } from 'react';

const menuItems = [
  {
    key: '/admin/products',
    icon: <ShoppingOutlined />,
    label: 'Products',
    headerItem: (
      <Link to={'/admin/products/creation'}>
        <Button type='primary'>Create Product</Button>
      </Link>
    ),
    headerLabel: 'Products Management',
  },
  {
    key: '/admin/categories',
    icon: <AppstoreOutlined />,
    label: 'Categories',
    headerLabel: 'Categories Management',
  },
  {
    key: '/admin/customers',
    icon: <UserOutlined />,
    label: 'Customers',
    headerLabel: 'Customers Management',
  },
  {
    key: '/admin/size',
    icon: <Ruler size={16} />,
    label: 'Size Groups',
    headerLabel: 'Size Groups Management',
  },
];

const SideBarAdminMenu = ({
  setHeaderLabel,
  setHeaderItem,
}: {
  setHeaderLabel?: (headerLabel: string) => void;
  setHeaderItem?: (headerItem: JSX.Element | null) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  useEffect(() => {
    const item = menuItems.find((item) => item.key === location.pathname);
    setHeaderLabel?.(item?.headerLabel || '');
    setHeaderItem?.(item?.headerItem || null);
  }, [location]);

  const selectedKey =
    menuItems.find(
      (item) => location.pathname === item.key || location.pathname.startsWith(item.key)
    )?.key || location.pathname;

  return (
    <Menu
      theme='light'
      mode='inline'
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={menuItems}
      style={{ borderRight: 0 }}
    />
  );
};

export default SideBarAdminMenu;
