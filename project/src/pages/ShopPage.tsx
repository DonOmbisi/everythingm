import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { products, categories, subcategories } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

const ShopPage: React.FC = () => {
  const { category, subcategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category.toUpperCase().replace(/-/g, ' ') : 'All'
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategory ? subcategory.replace(/-/g, ' ') : 'All'
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get unique colors and sizes from products
  const allColors = [...new Set(products.flatMap(p => p.colors))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter(p => 
        p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory, selectedColors, selectedSizes, priceRange, sortBy]);

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  const availableCategories = ['All', ...categories];
  const availableSubcategories = selectedCategory !== 'All' && subcategories[selectedCategory as keyof typeof subcategories] 
    ? ['All', ...subcategories[selectedCategory as keyof typeof subcategories]]
    : ['All'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-beige-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif text-black mb-4">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            {selectedSubcategory !== 'All' && ` - ${selectedSubcategory}`}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-black mb-3">Category</h3>
                <div className="space-y-2">
                  {availableCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSubcategory('All');
                      }}
                      className={`block w-full text-left py-1 text-sm transition-colors ${
                        selectedCategory === cat 
                          ? 'text-black font-medium' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              {availableSubcategories.length > 1 && (
                <div>
                  <h3 className="font-semibold text-black mb-3">Subcategory</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableSubcategories.map(subcat => (
                      <button
                        key={subcat}
                        onClick={() => setSelectedSubcategory(subcat)}
                        className={`block w-full text-left py-1 text-sm transition-colors ${
                          selectedSubcategory === subcat 
                            ? 'text-black font-medium' 
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Filter */}
              <div>
                <h3 className="font-semibold text-black mb-3">Color</h3>
                <div className="space-y-2">
                  {allColors.map(color => (
                    <label key={color} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorChange(color)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-semibold text-black mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`py-2 px-3 text-sm border rounded transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-black mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>€0</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-700'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-700'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(product.id) 
                            ? 'fill-current text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium">€{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex space-x-6 p-6 border border-gray-200 rounded-lg">
                    <div className="w-48 h-64 flex-shrink-0">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-medium text-black mb-2 hover:text-gray-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-medium">€{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">€{product.originalPrice}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Heart 
                            className={`h-5 w-5 ${
                              isInWishlist(product.id) 
                                ? 'fill-current text-red-500' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Colors:</span>
                          <div className="flex space-x-1">
                            {product.colors.slice(0, 3).map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.toLowerCase() }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Sizes:</span>
                          <span className="text-sm">{product.sizes.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubcategory('All');
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setPriceRange([0, 500]);
                  }}
                  className="mt-4 text-black border-b border-black hover:border-gray-400 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;