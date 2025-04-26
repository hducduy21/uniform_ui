import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "EN", name: "English" },
    { code: "VI", name: "Vietnamese" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectLanguage = (code: string) => {
    setSelectedLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="flex items-center" onClick={toggleDropdown}>
        <Globe size={24} className="mr-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-40 mt-2 text-black bg-white rounded shadow-lg top-full">
          {languages.map((language) => (
            <button
              key={language.code}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => selectLanguage(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher