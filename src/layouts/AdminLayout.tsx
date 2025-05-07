import React, { JSX, useEffect } from 'react';
import { useState } from 'react';
import { Layout, theme, Button, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SideBarAdminMenu from '@/components/layout/SideBarAdminMenu';
import images from '@/assets';
import { LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

const { Header, Sider, Content } = Layout;

type HeaderItem = {
  label: string;
  button: JSX.Element | null;
};

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [headerItem, setHeaderItem] = useState<HeaderItem>({ label: '', button: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {logout} = useAuthContext();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    await logout();
    setIsModalVisible(false);
    navigate('/', { replace: true });
  };

  return (
    <Layout className='h-screen overflow-y-auto'>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme='light'
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
        }}
      >
        <div
          className={`flex h-16 items-center text-lg font-bold text-[#1890ff] ${
            collapsed ? 'justify-center p-0' : 'justify-start px-6'
          }`}
        >
          <img src={images.logo} className='object-cover px-2 py-1' />
        </div>
        <SideBarAdminMenu
          setHeaderItem={(item: JSX.Element | null) =>
            setHeaderItem((prev) => ({ ...prev, button: item }))
          }
          setHeaderLabel={(label: string) =>
            setHeaderItem((prev) => ({ ...prev, label: label }))
          }
        />
      </Sider>

      <Layout className='overflow-y-auto'>
        <Header
          className='flex items-center p-0 shadow-sm'
          style={{ background: colorBgContainer, padding: 0 }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            className='flex items-center justify-center w-16 h-16 p-2 text-base rounded cursor-pointer hover:bg-gray-100'
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <div className='flex items-center justify-between w-full px-4'>
            <h1 className='text-lg font-semibold'>{headerItem.label}</h1>
            <div className='flex items-center gap-4'>
              {headerItem.button}
              <div className='flex items-center justify-center w-16 h-16 p-2 text-base rounded cursor-pointer hover:bg-gray-100'>
                <LogOut onClick={()=>{setIsModalVisible(true)}} />
              </div>
            </div>
          </div>
        </Header>

        <Content
          className='p-6 m-4 mb-0 ml-4 overflow-y-auto rounded-lg'
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Modal
        title='Confirmation'
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default AdminLayout;
