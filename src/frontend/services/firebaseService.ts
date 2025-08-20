
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../firebase";
import { Product, Order } from "../types";

// Products
export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const productsRef = collection(firestore, "products");
      const snapshot = await getDocs(productsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const productRef = doc(firestore, "products", id);
      const productDoc = await getDoc(productRef);
      
      if (productDoc.exists()) {
        return {
          id: productDoc.id,
          ...productDoc.data()
        } as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting product ${id}:`, error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm: string): Promise<Product[]> => {
    try {
      // Firestore doesn't have native full-text search, 
      // so we'll implement a basic search by title
      const productsRef = collection(firestore, "products");
      const snapshot = await getDocs(productsRef);
      
      const searchTermLower = searchTerm.toLowerCase();
      return snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product))
        .filter(product => 
          product.title.toLowerCase().includes(searchTermLower) || 
          product.description.toLowerCase().includes(searchTermLower)
        );
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const productsRef = collection(firestore, "products");
      const q = query(productsRef, where("category", "==", category));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error) {
      console.error(`Error getting products for category ${category}:`, error);
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const productsRef = collection(firestore, "products");
      const q = query(
        productsRef, 
        where("rating", ">=", 4.7),
        limit(4)
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error) {
      console.error("Error getting featured products:", error);
      throw error;
    }
  },

  // Get best-selling products
  getBestSellers: async (): Promise<Product[]> => {
    try {
      const productsRef = collection(firestore, "products");
      const q = query(
        productsRef, 
        orderBy("ratingCount", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error) {
      console.error("Error getting best sellers:", error);
      throw error;
    }
  },

  // Get products on sale
  getOnSaleProducts: async (): Promise<Product[]> => {
    try {
      const productsRef = collection(firestore, "products");
      const snapshot = await getDocs(productsRef);
      
      return snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product))
        .filter(product => product.originalPrice !== undefined);
    } catch (error) {
      console.error("Error getting on sale products:", error);
      throw error;
    }
  },
  
  // Add a new product
  addProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    try {
      const productsRef = collection(firestore, "products");
      const docRef = await addDoc(productsRef, product);
      return {
        id: docRef.id,
        ...product
      };
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },
  
  // Update a product
  updateProduct: async (id: string, product: Partial<Product>): Promise<void> => {
    try {
      const productRef = doc(firestore, "products", id);
      await updateDoc(productRef, product);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const productRef = doc(firestore, "products", id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
  
  // Upload product image
  uploadProductImage: async (file: File): Promise<string> => {
    try {
      const fileRef = ref(storage, `product-images/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading product image:", error);
      throw error;
    }
  }
};

// Orders
export const orderService = {
  // Get orders for a user
  getOrdersByUserId: async (userId: string): Promise<Order[]> => {
    try {
      const ordersRef = collection(firestore, "orders");
      const q = query(ordersRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error(`Error getting orders for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Create a new order
  createOrder: async (orderData: Omit<Order, "id">): Promise<Order> => {
    try {
      const ordersRef = collection(firestore, "orders");
      const docRef = await addDoc(ordersRef, orderData);
      return {
        id: docRef.id,
        ...orderData
      };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
  
  // Get order by ID
  getOrderById: async (id: string): Promise<Order | null> => {
    try {
      const orderRef = doc(firestore, "orders", id);
      const orderDoc = await getDoc(orderRef);
      
      if (orderDoc.exists()) {
        return {
          id: orderDoc.id,
          ...orderDoc.data()
        } as Order;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting order ${id}:`, error);
      throw error;
    }
  },
  
  // Update order status
  updateOrderStatus: async (id: string, status: Order['status']): Promise<void> => {
    try {
      const orderRef = doc(firestore, "orders", id);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error(`Error updating order ${id} status:`, error);
      throw error;
    }
  }
};

// Users
export const userService = {
  // Update user profile
  updateUserProfile: async (userId: string, profileData: any): Promise<void> => {
    try {
      const userRef = doc(firestore, "users", userId);
      await setDoc(userRef, profileData, { merge: true });
    } catch (error) {
      console.error(`Error updating user profile ${userId}:`, error);
      throw error;
    }
  },
  
  // Get user profile
  getUserProfile: async (userId: string): Promise<any | null> => {
    try {
      const userRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting user profile ${userId}:`, error);
      throw error;
    }
  },
  
  // Upload user avatar
  uploadUserAvatar: async (userId: string, file: File): Promise<string> => {
    try {
      const fileRef = ref(storage, `user-avatars/${userId}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      
      // Update user profile with new avatar URL
      await updateDoc(doc(firestore, "users", userId), {
        avatarUrl: downloadURL
      });
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading user avatar:", error);
      throw error;
    }
  }
};
