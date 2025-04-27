import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../../store/slices/categorySlice';
import CategoryDropdown from './CategoryDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { Heart, ShoppingBag } from 'lucide-react';
import images from '@/assets';
import { categories } from '@/data/mock'; 

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId: string) => {
    if (openDropdown === categoryId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(categoryId);
      dispatch(setActiveCategory(categoryId));
    }
  };

  return (
    <>
      <header className={`w-full ${openDropdown ? 'bg-white text-black' : 'text-white'}`}>
        <div className='fixed top-0 left-0 left-1/2 z-50 mt-3 flex h-9 w-full max-w-[1000px] -translate-x-1/2 transform items-center justify-between'>
          <div className='h-full'>
            <img className='block object-cover h-full' src={images.logo} alt='uniform' />
          </div>

          <nav className='hidden space-x-8 md:flex'>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`font-medium tracking-wider uppercase ${category.id === openDropdown ? 'underline decoration-2 underline-offset-4' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>

          <div className='flex items-center space-x-6'>
            <LanguageSwitcher />
            <Link to='/wishlist'>
              <Heart size={24} />
            </Link>
            <Link to='/cart'>
              <ShoppingBag size={24} />
            </Link>
          </div>
        </div>
        {/* <div className='fixed top-15 left-0 left-1/2 z-50 mt-3 flex h-9 w-full max-w-[1000px] -translate-x-1/2'> */}
          {categories.map((category) => (
            <CategoryDropdown
              key={category.id}
              category={category}
              isOpen={openDropdown === category.id}
              onClose={() => setOpenDropdown(null)}
            />
          ))}
        {/* </div> */}
      </header>
    </>
  );
};

export default Header;
