import QuantitySelector from "@/components/form/QuantitySelector"
import { CartType } from "@/types/model"
import { formatUSD } from "@/utils/formatUtil"
import { X } from "lucide-react"
import Color from "../Color"
const host = import.meta.env.VITE_BE_BASE_URL

type ProductCartProps = {
    cartItem: CartType
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
}

const ProductCart = ({cartItem, removeItem, updateQuantity}: ProductCartProps) => {
    return (<div className="py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Product image */}
          <div className="w-full mb-4 md:w-1/4 md:mb-0">
            <img src={`${host}/products/${cartItem.productVariants.product.id}/image`} alt={cartItem.productVariants.product.name} className="w-full h-auto" />
          </div>

          {/* Product details */}
          <div className="flex flex-col w-full md:w-3/4 md:pl-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-base font-medium">{cartItem.productVariants.product.name}</h3>
                <p className="flex gap-2 mt-1 text-sm">Color: <Color color={cartItem.productVariants.color}></Color></p>
                
                <p className="mt-1 text-sm">Size: {cartItem.productVariants.size}</p>
                <p className="mt-2 text-sm font-medium">{formatUSD(cartItem.productVariants.costPrice)}</p>
              </div>
              <button
                onClick={()=>removeItem(cartItem.id)}
                className="flex text-gray-400 items-top hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quantity selector */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">QUANTITY</p>
              <QuantitySelector value={cartItem.quantity} onChange={(value) => updateQuantity(cartItem.id,value)} />
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total:</p>
                <p className="text-base font-medium">{formatUSD(cartItem.quantity * cartItem.productVariants.costPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>)
}

export default ProductCart