
import { db } from '../data/mockDatabase';

// API functions for product-related operations
export const productApi = {
  // Get all products
  getAllProducts: () => {
    return db.getProducts();
  },

  // Get product by ID
  getProductById: (id: string) => {
    return db.getProductById(id);
  },

  // Search products
  searchProducts: (query: string) => {
    return db.searchProducts(query);
  },

  // Get products by category
  getProductsByCategory: (category: string) => {
    return db.getProductsByCategory(category);
  },

  // Get featured products
  getFeaturedProducts: () => {
    const allProducts = db.getProducts();
    return allProducts
      .filter(product => product.rating >= 4.7)
      .slice(0, 4);
  },

  // Get best-selling products
  getBestSellers: () => {
    const allProducts = db.getProducts();
    return allProducts
      .sort((a, b) => b.ratingCount - a.ratingCount)
      .slice(0, 10);
  },

  // Get products on sale
  getOnSaleProducts: () => {
    const allProducts = db.getProducts();
    return allProducts.filter(p => p.originalPrice !== undefined);
  }
};
