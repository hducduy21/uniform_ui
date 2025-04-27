import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import BotNav from "../components/layout/BotNav"

const Layout = () => {
  return (
    <div className="h-50 relative">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
      <BotNav />
    </div>
  )
}

export default Layout