import { Link } from "react-router-dom"
import { Home, Search, User } from "lucide-react"
import { useState } from "react"
import SearchOverlay from "./SearchOverLay"

const BotNav = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  return (
    <div className="fixed left-0 z-50 flex justify-center w-full bottom-8">
      <div className="flex space-x-12">
        <Link to="/" className="bottom-nav-button">
          <Home size={24} color="black" />
        </Link>
        <button className="bottom-nav-button" onClick={toggleSearch}>
          <Search size={24} color="black" />
        </button>
        <Link to="/account/profile" className="bottom-nav-button">
          <User size={24} color="black" />
        </Link>
      </div>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

export default BotNav