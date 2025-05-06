import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Minus, Plus } from 'lucide-react';
import { useGetProduct } from '@/hooks/useGetProduct';
import Color from '@/components/modules/product/Color';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { product } = useGetProduct(id as string);

  // const images = new Set([product.imageUrl, ...(product.productVariants.map((item) => item.imageUrl) || [])])
  // const [activeImage, setActiveImage] = useState<string>(product.imageUrl)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className='pt-16 pb-24 bg-white'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='flex flex-col items-center product-images'>
            <div className='mb-4 main-image'>
              <img
                src={`http://localhost:8080/api/products/${product?.id}/image`}
                alt={product?.name}
                className='object-cover h-180 w-140'
              />
            </div>
          </div>

          {/* Product Info */}
          <div className='product-info'>
            <div className='flex items-start justify-between'>
              <h1 className='text-xl font-medium'>{product?.name}</h1>
              <div className='flex space-x-3'>
                <button>
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className='mt-6'>
              <div className='flex items-center mb-2'>
                <span className='mr-2 text-sm text-gray-500'>Color:</span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {[...new Set(product?.productVariants.map((variant) => variant.color))].map(
                  (color) => (
                    <Color key={color} color={color} />
                  )
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className='mt-6'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                  <span className='mr-2 text-sm text-gray-500'>Size:</span>
                </div>
              </div>
              <div className='grid grid-cols-6 gap-2'>
                {product?.sizeType.elements.map((size) => (
                  <button
                    key={size}
                    className={`border py-2 ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className='mt-6'>
              <div className='text-xl font-medium'>{product?.price}</div>
              <div className='mt-1 text-sm text-gray-500'>{product?.description}</div>
              <div className='flex items-center mt-1'>
                <div className='flex items-center'>
                  <span className='mr-1 text-sm'>★</span>
                  <span className='text-sm'>{product?.rating}</span>
                </div>
                <span className='ml-1 text-sm text-gray-500'>({product?.ratingCount}+)</span>
              </div>
            </div>

            {/* Quantity */}
            <div className='mt-6'>
              <div className='flex max-w-[150px] items-center border border-gray-300'>
                <button
                  className='flex items-center justify-center flex-1 px-4 py-2 border-r border-gray-300'
                  onClick={decreaseQuantity}
                >
                  <Minus size={16} />
                </button>
                <button className='flex items-center justify-center flex-1 px-4 py-2 border-gray-300'>
                  {quantity}
                </button>
                <button
                  className='flex items-center justify-center flex-1 px-4 py-2 border-l border-gray-300'
                  onClick={increaseQuantity}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className='flex items-center justify-center mt-6'>
              <button className='w-full py-3 font-medium text-white bg-black'>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
