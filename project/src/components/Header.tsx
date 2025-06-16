import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';
import { categories, subcategories } from '../data/products';

const Header: React.FC = () => {
  const [] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [] = useState('EN');
  const [] = useState('EUR');
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();
  const { user } = useAuth();
  useWishlist();
  useAdmin();
  const navigate = useNavigate();
  const dropdownTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleMouseEnter = (category: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200); // Add a small delay before hiding
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/shop/${category.toLowerCase().replace(/\s+/g, '-')}`);
    setHoveredCategory(null);
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    navigate(`/shop/${category.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`);
    setHoveredCategory(null);
  };

  return (
    <header className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''} sticky top-0 z-50`}>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
          {/* Left: Country/Currency & Language */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-gray-600 text-xs font-medium tracking-wide hover:text-black transition-colors">
              ITALY (EUR €)
            </button>
            <button className="flex items-center text-gray-600 text-xs font-medium tracking-wide hover:text-black transition-colors">
              ENGLISH
            </button>
          </div>
          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-3xl font-serif text-black tracking-widest font-normal">EVERYTHING MATERNITY</h1>
            </Link>
          </div>
          {/* Right: B2B, Account, Search, Cart */}
          <div className="flex items-center space-x-6">
            <Link to="/b2b" className="text-xs font-bold text-black tracking-wide hover:text-gray-700">B2B</Link>
            <button onClick={handleAccountClick} className="text-xs font-normal text-gray-600 hover:text-black transition-colors">Account</button>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-xs font-normal text-gray-600 hover:text-black transition-colors flex items-center" aria-label="Search">
              Search
              <Search className="h-4 w-4 ml-1" />
            </button>
            <Link to="/cart" className="text-xs font-normal text-gray-600 hover:text-black transition-colors flex items-center relative" aria-label="Cart">
              Cart
              <span className="ml-1">({state.items.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 h-14">
            {categories.map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="uppercase text-sm font-medium tracking-wider text-gray-700 hover:text-black transition-all duration-300 px-2 py-1 transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/50 rounded-md"
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category}
                </button>
                {/* Dropdown Menu */}
                {hoveredCategory === category && subcategories[category as keyof typeof subcategories] && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                    onMouseEnter={() => handleMouseEnter(category)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transform: 'translateX(-50%) translateY(0) rotateX(0deg)',
                      transformOrigin: 'top center',
                      transition: 'all 0.3s ease',
                      opacity: 1,
                      visibility: 'visible'
                    }}
                  >
                    <div className="py-4 px-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                        {category}
                      </div>
                      <div className="grid grid-cols-2 gap-0.5 max-h-64 overflow-y-auto custom-scrollbar">
                        {subcategories[category as keyof typeof subcategories].map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => handleSubcategoryClick(category, subcategory)}
                            className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-beige-50 hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md rounded-md w-full"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
      {/* Search Bar (optional, as dropdown) */}
      {isSearchOpen && (
        <div className="border-t border-gray-100 py-4 bg-white">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

// Add this CSS to your index.css file
