
// This file represents a simple mock server that would typically run on the backend
// In a real app, this would be a separate Node.js server using Express or similar

import { productApi } from './api/productApi';
import { authApi } from './api/authApi';
import { orderApi } from './api/orderApi';

// Simulated API response with delay
const apiResponse = async (data: any, delay = 300) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  return { success: true, data };
};

// Simulated API error response
const apiError = async (message: string, status = 400, delay = 300) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  throw { message, status };
};

// Mock API endpoints
export const server = {
  // Product endpoints
  products: {
    getAll: () => apiResponse(productApi.getAllProducts()),
    getById: (id: string) => {
      const product = productApi.getProductById(id);
      return product ? apiResponse(product) : apiError('Product not found', 404);
    },
    search: (query: string) => apiResponse(productApi.searchProducts(query)),
    getByCategory: (category: string) => apiResponse(productApi.getProductsByCategory(category)),
    getFeatured: () => apiResponse(productApi.getFeaturedProducts()),
    getBestSellers: () => apiResponse(productApi.getBestSellers()),
    getOnSale: () => apiResponse(productApi.getOnSaleProducts())
  },
  
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      try {
        const user = await authApi.login(email, password);
        return apiResponse(user);
      } catch (error) {
        return apiError('Invalid email or password', 401);
      }
    },
    register: async (name: string, email: string, password: string) => {
      try {
        const user = await authApi.register(name, email, password);
        return apiResponse(user);
      } catch (error: any) {
        return apiError(error.message, 400);
      }
    }
  },
  
  // Order endpoints
  orders: {
    getByUserId: (userId: string) => apiResponse(orderApi.getOrdersByUserId(userId)),
    create: (orderData: any) => apiResponse(orderApi.createOrder(orderData)),
    processPayment: (orderId: string, paymentData: any) => 
      apiResponse(orderApi.processPayment(orderId, paymentData))
  }
};

// Note: In a real application, this would be a separate server with proper routes
// and error handling, along with database connections, authentication middleware, etc.
