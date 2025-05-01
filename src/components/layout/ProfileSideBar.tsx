import { Link, useLocation } from "react-router-dom"

const ProfileSidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    return currentPath.includes(path)
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
        </ul>
      </div>
    </div>
  )
}

export default ProfileSidebar
