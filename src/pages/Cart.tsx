import { useNavigate } from "react-router-dom"
import { Info } from "lucide-react"
import ProductCart from "@/components/modules/product/card/ProductCart"
import { carts } from "@/data/mock"

const Cart = () => {
  const navigate = useNavigate()

  const handleRemoveItem = (id: string) => {
    carts.filter((item) => item.id !== id)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    carts.map((item) => {
      if (item.id === id) {
        item.quantity = quantity
      }
    })
  }

  const handleContinueShopping = () => {
    navigate("/products")
  }

  //Calculate total price
  const total = carts.reduce((sum, item) => sum + item.productVariant.costPrice * item.quantity, 0)

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("vi-VN")} VND`
  }

  return (
    <div className="pt-16 pb-24 bg-white">
      <div className="container max-w-6xl px-4 mx-auto">
        <h1 className="my-8 text-2xl font-bold">SHOPPING CART</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            {carts.length === 0 ? (
              <div className="flex items-center justify-center p-12 bg-gray-100">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div>
                {carts.map((i) => (
                  <ProductCart
                    key={i.id}
                    cartItem={i}
                    removeItem={handleRemoveItem}
                    updateQuantity={handleUpdateQuantity}
                    />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 border border-gray-200">
              <h2 className="mb-4 text-lg font-bold">ORDER SUMMARY | {carts.length} ITEM(S)</h2>

              <div className="py-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <p className="text-base font-medium">ORDER TOTAL</p>
                  <p className="text-base font-medium">{formatCurrency(total)}</p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="py-4">
                <div className="flex items-start">
                  <p className="text-sm">
                    Free shipping applies for home delivery orders from 20 USD and all in store pick up (Click &
                    Collect).
                  </p>
                  <button className="ml-2 text-gray-400">
                    <Info size={16} />
                  </button>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="mt-4 space-y-3">
                <button className="w-full py-3 font-medium text-white bg-red-600">CHECKOUT</button>
                <button className="w-full py-3 font-medium border border-gray-300" onClick={handleContinueShopping}>
                  CONTINUE SHOPPING
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500">Eligible for free shipping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
