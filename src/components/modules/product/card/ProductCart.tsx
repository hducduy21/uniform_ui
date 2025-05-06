import QuantitySelector from "@/components/form/QuantitySelector"
import { CartType } from "@/types/model"
import { formatUSD } from "@/utils/formatUtil"
import { X } from "lucide-react"

type ProductCartProps = {
    cartItem: CartType
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
}

const ProductCart = ({cartItem, removeItem, updateQuantity}: ProductCartProps) => {
    return (<div className="py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Product image */}
          <div className="w-full mb-4 md:w-1/4 md:mb-0">
            <img src={cartItem.productVariant.imageUrl} alt={cartItem.productVariant.product.name} className="w-full h-auto" />
          </div>

          {/* Product details */}
          <div className="flex flex-col w-full md:w-3/4 md:pl-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-base font-medium">{cartItem.productVariant.product.name}</h3>
                <p className="mt-1 text-sm">Color: {cartItem.productVariant.color}</p>
                <p className="mt-1 text-sm">Size: {cartItem.productVariant.size}</p>
                <p className="mt-2 text-sm font-medium">{formatUSD(cartItem.productVariant.costPrice)}</p>
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
              <QuantitySelector value={cartItem.quantity} onChange={(value) => updateQuantity(cartItem.id, value)} />
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total:</p>
                <p className="text-base font-medium">{formatUSD(cartItem.quantity * cartItem.productVariant.costPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>)
}

export default ProductCart