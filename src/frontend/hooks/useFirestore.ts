
import { collection, addDoc, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Product, Order } from "../types";

export const useFirestore = () => {
  // Products collection operations
  const getProducts = async (): Promise<Product[]> => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          price: data.price,
          originalPrice: data.originalPrice,
          image: data.image,
          images: data.images || [],
          category: data.category,
          rating: data.rating,
          ratingCount: data.ratingCount,
          isPrime: data.isPrime || false,
        } as Product;
      });
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const docSnap = await getDoc(doc(firestore, "products", id));
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
        } as Product;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  };

  // Orders collection operations
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string | null> => {
    try {
      const orderWithTimestamp = {
        ...orderData,
        createdAt: new Date().toISOString(),
      };
      
      const docRef = await addDoc(collection(firestore, "orders"), orderWithTimestamp);
      return docRef.id;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
    try {
      const q = query(
        collection(firestore, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Order;
      });
    } catch (error) {
      console.error("Error getting orders:", error);
      return [];
    }
  };

  return {
    getProducts,
    getProductById,
    createOrder,
    getOrdersByUserId,
  };
};
