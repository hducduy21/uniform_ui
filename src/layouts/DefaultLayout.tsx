import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import BotNav from "../components/layout/BotNav"

const Layout = () => {
  return (
    <div className="relative h-50">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
      <BotNav />
    </div>
  )
}

export default Layout