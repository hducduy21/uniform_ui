import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, Share2, Minus, Plus, Home, Search, User } from "lucide-react"
import { products } from "@/data/mock"
import Color from "@/components/modules/product/Color"

const product = products[0]

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedColor, setSelectedColor] = useState("pink")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      white: "bg-white border border-gray-300",
      black: "bg-black",
      beige: "bg-amber-100",
      olive: "bg-olive-600",
      teal: "bg-teal-700",
      lightblue: "bg-sky-200",
      pink: "bg-pink-200",
    }
    return colorMap[color] || "bg-gray-200"
  }

  return (
    <div className="pt-16 pb-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="product-images flex flex-col items-center">
            <div className="mb-4 main-image">
              <img
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-180 w-140 object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 border-2 ${activeImage === index ? "border-black" : "border-transparent"}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-medium">{product.name}</h1>
              <div className="flex space-x-3">
                <button>
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-sm text-gray-500">Color:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Color key={`${color.name}_${color.hexCode}`} size="xl" item={color} />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">Size:</span>
                </div>
                <button className="text-sm text-blue-600">Check size</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.elements.map((size) => (
                  <button
                    key={size}
                    className={`py-2 border ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="text-xl font-medium">{product.price}</div>
              <div className="mt-1 text-sm text-gray-500">{product.madeInInfo}</div>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <span className="mr-1 text-sm">★</span>
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="ml-1 text-sm text-gray-500">({product.reviewCount}+)</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <div className="flex items-center border border-gray-300 max-w-[150px]">
                <button className="px-4 py-2 flex-1 flex justify-center items-center border-r border-gray-300" onClick={decreaseQuantity}>
                  <Minus size={16} />
                </button>
                <button className="px-4 py-2 flex-1 flex justify-center items-center border-gray-300">
                  {quantity}
                </button>
                <button className="px-4 py-2 flex-1 flex justify-center items-center border-l border-gray-300" onClick={increaseQuantity}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6 flex items-center justify-center">
              <button className="w-full py-3 font-medium text-white bg-black">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
