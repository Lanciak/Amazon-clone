
import React from "react";
import Banner from "../components/Banner";
import ProductCarousel from "../components/ProductCarousel";
import CategorySidebar from "../components/CategorySidebar";
import { banners } from "../data/banners";
import { bestSellers, featuredProducts, onSale } from "../data/products";
import { categories } from "../data/categories";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <Banner images={banners} />

      <div className="container mx-auto px-4 pt-4 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <CategorySidebar categories={categories} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Featured Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-md shadow-sm p-4 flex flex-col">
                  <h3 className="text-lg font-medium mb-2">{product.title.substring(0, 60)}...</h3>
                  <a href={`/product/${product.id}`} className="block mt-auto">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-contain my-4"
                    />
                  </a>
                  <a
                    href={`/product/${product.id}`}
                    className="mt-auto text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
                  >
                    See more
                  </a>
                </div>
              ))}
            </div>

            {/* Product Carousels */}
            <ProductCarousel title="Best Sellers" products={bestSellers} />
            <ProductCarousel title="Today's Deals" products={onSale} />

            {/* Featured Categories */}
            <div className="my-8">
              <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.slice(0, 8).map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="bg-white rounded-md shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium mb-2">{category.name}</h3>
                    <div className="text-sm text-[#007185] mt-2 hover:text-[#C7511F] hover:underline">
                      Shop now
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Top Button */}
            <div className="mt-8 mb-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full bg-[#37475A] hover:bg-[#232F3E] text-white py-3 text-sm font-medium"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
