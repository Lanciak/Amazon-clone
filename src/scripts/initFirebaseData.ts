
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import { firestore } from "../firebase";
import { products as productData } from "../frontend/data/products";

// Function to initialize products in Firebase Firestore
export const initializeProducts = async () => {
  try {
    // Check if products already exist
    const productsRef = collection(firestore, "products");
    const existingProducts = await getDocs(query(productsRef, limit(1)));
    
    if (!existingProducts.empty) {
      console.log("Products already exist in Firestore, skipping initialization");
      return;
    }
    
    console.log("Initializing Firestore with product data...");
    
    // Add each product to Firestore
    const results = await Promise.all(
      productData.map(async (product) => {
        const docRef = await addDoc(productsRef, {
          title: product.title,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          images: product.images || [product.image],
          category: product.category,
          rating: product.rating,
          ratingCount: product.ratingCount,
          isPrime: product.isPrime || false,
          features: product.features || [],
          stockCount: product.stockCount || 100,
        });
        
        return {
          id: docRef.id,
          ...product
        };
      })
    );
    
    console.log(`Successfully initialized ${results.length} products in Firestore`);
    return results;
  } catch (error) {
    console.error("Error initializing products in Firestore:", error);
    throw error;
  }
};

// This function can be called when the app starts to ensure we have data
export const checkAndInitializeData = async () => {
  try {
    const productsRef = collection(firestore, "products");
    const snapshot = await getDocs(query(productsRef, limit(1)));
    
    if (snapshot.empty) {
      console.log("No product data found, initializing database...");
      await initializeProducts();
    } else {
      console.log("Product data exists, no initialization needed");
    }
  } catch (error) {
    console.error("Error checking or initializing data:", error);
  }
};
