import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Camera, Mic, X, Home, User } from "lucide-react"
import { Link } from "react-router-dom"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
      setSearchQuery("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white">
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute text-gray-400 left-3" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword"
              className="w-full py-2 pl-10 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </form>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-around py-4 mt-auto border-t border-gray-200">
        <Link to="/" className="p-3 rounded-full hover:bg-gray-100">
          <Home size={24} />
        </Link>
        <button onClick={onClose} className="p-3 text-white bg-black rounded-full">
          <X size={24} />
        </button>
        <Link to="/account" className="p-3 rounded-full hover:bg-gray-100">
          <User size={24} />
        </Link>
      </div>
    </div>
  )
}

export default SearchOverlay
