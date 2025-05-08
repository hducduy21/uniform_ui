import { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../../store/slices/categorySlice';
import CategoryDropdown from './CategoryDropdown';
import { Heart, ShoppingBag, Store } from 'lucide-react';
import images from '@/assets';
import useTreeCategory from '@/hooks/data/useTreeCategories';

const Header = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories } = useTreeCategory();
  

  const handleRootCategoryClick = (categoryId: number) => {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      setActiveTab(categoryId);
      setOpenDropdown(true);
      dispatch(setActiveCategory(categoryId));
    }
  };

  const onCloseDropdown = useCallback(() => setOpenDropdown(false), []);

  return (
    <>
      <header className={`w-full`}>
        <div className={`fixed py-1 top-0 left-0 left-1/2 z-50 h-12 w-full -translate-x-1/2 transform
                        ${!openDropdown && location.pathname == '/'  ? 'text-white' : 'text-black bg-white shadow-lg '}`}>
          <div className='flex items-center justify-between h-full sm:px-16 md:px-24 lg:px-36 xl:px-50'>
            <div className='h-full'>
              <img className='block object-cover h-full' src={images.logo} alt='uniform' />
            </div>

            <nav className='hidden space-x-8 md:flex'>
              {categories && categories.map((category) => (
                <button
                  key={category.id}
                  className={`font-medium tracking-wider uppercase ${category.id === activeTab ? 'underline decoration-2 underline-offset-4' : ''}`}
                  onClick={() => handleRootCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            <div className='flex items-center space-x-6'>
              {/* <LanguageSwitcher /> */}
              <Link to='/products'>
                <Store size={24} />
              </Link>
              <Link to='/wishlist'>
                <Heart size={24} />
              </Link>
              <Link to='/cart'>
                <ShoppingBag size={24} />
              </Link>
            </div>
          </div>
            <CategoryDropdown
              categories={categories || []}
              isOpen={openDropdown}
              onClose={onCloseDropdown}
            />
          
        </div>
      </header>
    </>
  );
};

export default Header;
