import { Outlet } from "react-router-dom"
import ProfileSidebar from "@/components/layout/ProfileSideBar"

const AccountLayout = () => {
  return (
    <div className="pt-20 pb-12 bg-white">
      <div className="container max-w-6xl px-4 mx-auto">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="p-6 border border-gray-200">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
