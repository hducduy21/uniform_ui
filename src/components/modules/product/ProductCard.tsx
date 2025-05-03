import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { ProductGeneralType } from '@/types/model';
import Color from './Color';

const ProductCard = ({ product }: { product: ProductGeneralType }) => {

  return (
    <>
      <div key={product.id} className='product-card'>
        {/* Product image */}
        <div className='relative'>
          <Link to={`/product/${product.id}`} className='block'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='object-cover w-full h-125 w-72'
            />
          </Link>
          <button className='absolute p-1 top-2 right-2'>
            <Heart size={24} className='text-gray-700' />
          </button>
        </div>

        {/* Product colors */}
        <div className='flex flex-wrap gap-1 mt-2'>
          {product.colors.map((color) => (
            <Color item={color} />
          ))}
        </div>

        {/* Product details */}
        <div className='mt-2'>
          <div className='mb-1 text-xs text-gray-500'>
            {product.category.name} <span className='ml-2'>{product.sizes.sizeTitle}</span>
          </div>
          <Link to={`/product/${product.id}`} className='block'>
            <h3 className='text-sm font-medium'>{product.name}</h3>
          </Link>
          <div className='mt-1 text-sm font-medium'>{product.price}</div>
          <div className='mt-1 text-xs text-gray-500'>{product.description}</div>
          <div className='flex items-center mt-1'>
            <div className='flex items-center'>
              <span className='mr-1 text-xs'>
                <Star fill='black' className='w-4 h-4' />
              </span>
              <span className='text-xs'>{product.rating}</span>
            </div>
            <span className='ml-1 text-xs text-gray-500'>({product.rating})</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
