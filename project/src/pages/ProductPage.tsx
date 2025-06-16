import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-black mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-black border-b border-black hover:border-gray-400 transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
        quantity
      }
    });
  };

  const handleWishlistToggle = () => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-beige-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <Link to="/" className="text-gray-600 hover:text-black transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-black transition-colors">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/shop/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-black transition-colors">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImageIndex === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-black mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-medium">€{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">€{product.originalPrice}</span>
                  )}
                </div>
                {product.isBestseller && (
                  <div className="flex items-center space-x-1 bg-black text-white px-2 py-1 text-xs font-medium rounded">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Bestseller</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>In Stock</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-black mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-black mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      selectedColor === color ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-black">Size: {selectedSize}</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-black border-b border-black hover:border-gray-400 transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm border rounded transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-black mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-6 rounded flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className="p-3 border border-gray-300 rounded hover:border-black transition-colors"
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over €150</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <RotateCcw className="h-4 w-4" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Shield className="h-4 w-4" />
                <span>Secure payment guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-serif text-black text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">€{relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">€{relatedProduct.originalPrice}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif text-black">Size Guide</h2>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Size</th>
                        <th className="text-center py-2">Bust (cm)</th>
                        <th className="text-center py-2">Waist (cm)</th>
                        <th className="text-center py-2">Hip (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-medium">XS</td>
                        <td className="text-center py-2">82-86</td>
                        <td className="text-center py-2">66-70</td>
                        <td className="text-center py-2">90-94</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-medium">S</td>
                        <td className="text-center py-2">86-90</td>
                        <td className="text-center py-2">70-74</td>
                        <td className="text-center py-2">94-98</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-medium">M</td>
                        <td className="text-center py-2">90-94</td>
                        <td className="text-center py-2">74-78</td>
                        <td className="text-center py-2">98-102</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-medium">L</td>
                        <td className="text-center py-2">94-98</td>
                        <td className="text-center py-2">78-82</td>
                        <td className="text-center py-2">102-106</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">XL</td>
                        <td className="text-center py-2">98-102</td>
                        <td className="text-center py-2">82-86</td>
                        <td className="text-center py-2">106-110</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-sm text-gray-600">
                  <p>All measurements are taken without any stretch applied to the garment.</p>
                  <p className="mt-2">For a perfect fit during pregnancy, we recommend choosing your pre-pregnancy size.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;