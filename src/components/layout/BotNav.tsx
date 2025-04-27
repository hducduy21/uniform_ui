import { Link } from "react-router-dom"
import { Home, Search, User } from "lucide-react"

const BotNav = () => {
//   const location = useLocation()

  return (
    <div className="fixed bottom-8 left-0 w-full z-50 flex justify-center">
      <div className="flex space-x-12">
        <Link to="/" className="bottom-nav-button">
          <Home size={24} color="black" />
        </Link>
        <button className="bottom-nav-button">
          <Search size={24} color="black" />
        </button>
        <button className="bottom-nav-button">
          <User size={24} color="black" />
        </button>
      </div>
    </div>
  )
}

export default BotNav