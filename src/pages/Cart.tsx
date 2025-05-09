import { useNavigate } from 'react-router-dom';
import ProductCart from '@/components/modules/product/card/ProductCart';
import useCarts from '@/hooks/data/useCarts';
import { formatUSD } from '@/utils/formatUtil';
import { useMemo } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const { carts, updateCart, removeCart, mutate } = useCarts();

  const handleRemoveItem = async (cartId: number) => {
    await removeCart(cartId);
    await mutate();
  };

  const handleUpdateQuantity = async (cartId: number, quantity: number) => {
    await updateCart({ cartId: cartId, quantity: quantity.toString() });
    await mutate();
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const total = useMemo(() => {
    return (
      carts?.content.reduce(
        (sum, item) => sum + item.productVariants.costPrice * item.quantity,
        0
      ) || 0
    );
  }, [carts]);

  return (
    <div className='pt-16 pb-24 bg-white'>
      <div className='container max-w-6xl px-4 mx-auto'>
        <h1 className='my-8 text-2xl font-bold'>SHOPPING CART</h1>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Cart Items - Left Column */}
          <div className='lg:col-span-2'>
            {carts && carts.content.length === 0 ? (
              <div className='flex items-center justify-center p-12 bg-gray-100'>
                <p className='text-gray-500'>Your cart is empty</p>
              </div>
            ) : (
              <div>
                {carts &&
                  carts.content.map((i) => (
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
          <div className='lg:col-span-1'>
            <div className='p-6 border border-gray-200'>
              <h2 className='mb-4 text-lg font-bold'>
                ORDER SUMMARY | {carts && carts.content.length} ITEM(S)
              </h2>

              <div className='py-4 border-b border-gray-200'>
                <div className='flex justify-between'>
                  <p className='text-base font-medium'>ORDER TOTAL</p>
                  <p className='text-base font-medium'>{formatUSD(total || 0)}</p>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className='mt-4 space-y-3'>
                <button className='w-full py-3 font-medium text-white bg-red-600'>CHECKOUT</button>
                <button
                  className='w-full py-3 font-medium border border-gray-300'
                  onClick={handleContinueShopping}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
