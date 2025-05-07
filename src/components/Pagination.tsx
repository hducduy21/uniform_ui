import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      if (startPage > 2) {
        pages.push("ellipsis-start")
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      pages.push(totalPages)
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className={`flex items-center justify-center space-x-2 my-8 ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
          currentPage === 1 ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <span key={`${page}-${index}`} className="flex items-center justify-center w-10 h-10">
              ...
            </span>
          )
        }

        return (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page as number)}
            className={`w-10 h-10 rounded-md ${
              currentPage === page ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-100"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
