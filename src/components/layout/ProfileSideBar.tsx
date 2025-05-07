import { useAuthContext } from "@/context/AuthContext"
import { Modal } from "antd"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const ProfileSidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {logout} = useAuthContext()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    return currentPath.includes(path)
  }

  const handleLogout = () => {
    logout()
    setIsModalVisible(false)
    navigate("/", { replace: true })
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="mb-2 font-bold">ACCOUNT SETTING</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/account/profile" className={`text-sm ${isActive("/profile") ? "font-bold" : ""}`}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/account/change-password"
              className={`text-sm ${isActive("/change-password") ? "font-bold" : ""}`}
            >
              Change my password
            </Link>
          </li>
          <li onClick={() => setIsModalVisible(true)}>
            <span className={`text-sm cursor-pointer`}>Logout</span>
          </li>
        </ul>
      </div>
      <Modal
        title='Confirmation'
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  )
}

export default ProfileSidebar
