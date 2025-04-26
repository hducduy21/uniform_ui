import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import img1 from "@/assets/img1.jpg"

interface SliderImage {
  id: string
  src: string
  category: string
}

const FullScreenSlider = () => {
  const activeCategory = useSelector((state: RootState) => state.category.activeCategory)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const sliderImages: SliderImage[] = [
    {
      id: "men1",
      src: img1,
      category: "men",
    },
    {
      id: "men2",
      src: "@/assets/img2.jpg",
      category: "men",
    },
    {
      id: "women1",
      src: "@/assets/img3.jpg",
      category: "women",
    },
    {
      id: "women2",
      src: "@/assets/img4.jpg",
      category: "women",
    },
    {
      id: "kids1",
      src: "@/assets/img5.jpg",
      category: "kids",
    },
    {
      id: "kids2",
      src: "@/assets/img6.jpg",
      category: "kids",
    },
  ]

  // Filter images by active category
  const filteredImages = activeCategory
    ? sliderImages.filter((img) => img.category === activeCategory)
    : sliderImages.filter((img) => img.category === "men") // Default to men

  useEffect(() => {
    // Reset to first slide of the category when category changes
    setCurrentSlideIndex(0)
  }, [activeCategory])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (e.deltaY > 0) {
        // Scroll down - next slide
        setCurrentSlideIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : prev))
      } else {
        // Scroll up - previous slide
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev))
      }
    }

    const sliderElement = sliderRef.current
    if (sliderElement) {
      sliderElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [filteredImages.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlideIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : prev))
    }

    if (touchStart - touchEnd < -50) {
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }

  return (
    <div
      className="slider-container"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider"
        style={{
          transform: `translateY(-${currentSlideIndex * 100}%)`,
          flexDirection: "column",
        }}
      >
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="slide"
            style={{
              backgroundImage: `url(${image.src})`,
              position: "relative",
            }}
          >
            <div className="absolute bottom-20 left-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Collection {index + 1}</h2>
              <p className="text-xl">Discover the latest trends</p>
              <button className="mt-4 bg-white text-black px-6 py-2 rounded-sm">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FullScreenSlider