import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7155710/pexels-photo-7155710.jpeg"
            alt="Maternity Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-slide-up">
              Elegance in Every Stage
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Sophisticated maternity fashion designed for the modern woman
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <span>Shop Collection</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-black mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dresses',
                image: 'https://images.pexels.com/photos/7155711/pexels-photo-7155711.jpeg',
                link: '/shop/dresses'
              },
              {
                name: 'Outerwear',
                image: 'https://images.pexels.com/photos/7156336/pexels-photo-7156336.jpeg',
                link: '/shop/outerwear'
              },
              {
                name: 'Essentials',
                image: 'https://images.pexels.com/photos/7156340/pexels-photo-7156340.jpeg',
                link: '/shop/essentials'
              }
            ].map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-300"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-black mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of sophisticated maternity wear, designed with comfort and style in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop/new-in"
              className="inline-flex items-center space-x-2 border border-black px-8 py-3 text-black hover:bg-black hover:text-white transition-colors"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-black mb-4">Bestsellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved pieces, chosen by expecting mothers worldwide for their exceptional quality and style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-xs font-medium flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Bestseller</span>
                  </div>
                </div>
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
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop/bestsellers"
              className="inline-flex items-center space-x-2 border border-black px-8 py-3 text-black hover:bg-black hover:text-white transition-colors"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-black mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Pietro Brunelli was founded with a simple belief: that pregnancy is a time of beauty, strength, and elegance. 
                We create sophisticated maternity wear that celebrates this special journey, combining Italian craftsmanship 
                with modern design.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Each piece is thoughtfully designed to grow with you, ensuring comfort without compromising on style. 
                From our atelier in Milan, we craft garments that honor the beauty of motherhood.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-black border-b border-black hover:border-gray-400 transition-colors"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/7156337/pexels-photo-7156337.jpeg"
                alt="About Pietro Brunelli"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-black mb-4">@pietrobrunelli</h2>
            <p className="text-gray-600">
              Follow us for daily inspiration and styling tips
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.pexels.com/photos/7155712/pexels-photo-7155712.jpeg',
              'https://images.pexels.com/photos/7156341/pexels-photo-7156341.jpeg',
              'https://images.pexels.com/photos/7156343/pexels-photo-7156343.jpeg',
              'https://images.pexels.com/photos/7156345/pexels-photo-7156345.jpeg'
            ].map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-black border-b border-black hover:border-gray-400 transition-colors"
            >
              <span>Follow on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;