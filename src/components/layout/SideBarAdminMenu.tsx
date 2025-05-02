import type React from "react"
import { Menu } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { DashboardOutlined, ShoppingOutlined, AppstoreOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons"
import { use, useEffect } from "react"

const menuItems = [
  {
    key: "/admin",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    headerLabel: "Dashboard",
  },
  {
    key: "/admin/products",
    icon: <ShoppingOutlined />,
    label: "Products",
    headerLabel: "Products Management",
  },
  {
    key: "/admin/categories",
    icon: <AppstoreOutlined />,
    label: "Categories",
    headerLabel: "Categories Management",
  },
  {
    key: "/admin/customers",
    icon: <UserOutlined />,
    label: "Customers",
    headerLabel: "Customers Management",
  },
  {
    key: "/admin/inventory",
    icon: <InboxOutlined />,
    label: "Inventory",
    headerLabel: "Inventory Management",
  },
]

const SideBarAdminMenu= ({setHeaderLabel} : {setHeaderLabel?: (headerLabel : string)=> void}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key)
  }

  useEffect(() => {
    const headerLabel = menuItems.find((item) => item.key === location.pathname)?.headerLabel || "Dashboard"
    setHeaderLabel?.(headerLabel)
  }, [location])

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={handleMenuClick}
      items={menuItems}
      style={{ borderRight: 0 }}
    />
  )
}

export default SideBarAdminMenu
