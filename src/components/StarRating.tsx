import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
  interactive?: boolean
  onRatingChange?: (newRating: number) => void
  userRating?: number | null
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className = "",
  interactive = false,
  onRatingChange,
  userRating = null,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const normalizedRating = Math.max(0, Math.min(rating, maxRating))

//   const filledStars = Math.floor(normalizedRating)
//   const partialStar = normalizedRating - filledStars

  const displayRating = hoverRating !== null ? hoverRating : userRating !== null ? userRating : normalizedRating

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null)
    }
  }

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index)
    }
  }

  return (
    <div
      className={`flex items-center ${className} ${interactive ? "cursor-pointer" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= displayRating
        const isPartiallyFilled = !isFilled && starValue === Math.ceil(displayRating) && displayRating % 1 > 0
        const partialWidth = isPartiallyFilled ? (displayRating % 1) * 100 : 0

        const isUserRating = userRating !== null && starValue <= userRating

        return (
          <div
            key={`star-${i}`}
            className="relative"
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
          >
            <Star size={size} className={`${isUserRating ? "text-yellow-500" : "text-gray-300"}`} />

            {(isFilled || isPartiallyFilled) && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: isPartiallyFilled ? `${partialWidth}%` : "100%" }}
              >
                <Star
                  size={size}
                  className={`${isUserRating ? "text-yellow-500 fill-yellow-500" : "text-yellow-400 fill-yellow-400"}`}
                />
              </div>
            )}
          </div>
        )
      })}

      {!interactive && <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>}
    </div>
  )
}

export default StarRating
