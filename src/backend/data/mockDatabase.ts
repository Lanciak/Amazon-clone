
import { Product, Order } from '../../frontend/types';
import { products as productData } from '../../frontend/data/products';

// In-memory "database" for the mock backend
class MockDatabase {
  private products: Product[] = [];
  private users: any[] = [];
  private orders: Order[] = [];

  constructor() {
    // Initialize with product data
    this.products = productData;
    
    // Initialize with some mock users
    this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password' // In a real app, this would be hashed
      }
    ];
    
    // Initialize with some mock orders
    this.orders = [
      {
        id: 'order-1',
        userId: '1',
        items: [
          {
            productId: '1',
            quantity: 1,
            price: 189.99
          },
          {
            productId: '2',
            quantity: 2,
            price: 9.99
          }
        ],
        total: 209.97,
        status: 'delivered' as const,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        address: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        }
      }
    ];
  }

  // Product methods
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  searchProducts(query: string): Product[] {
    query = query.toLowerCase();
    return this.products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  // User methods
  getUserByEmail(email: string): any | undefined {
    return this.users.find(user => user.email === email);
  }

  createUser(userData: { name: string, email: string, password: string }): any {
    const newUser = {
      id: `user-${this.users.length + 1}`,
      ...userData
    };
    this.users.push(newUser);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  // Order methods
  getOrdersByUserId(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const newOrder = {
      id: `order-${this.orders.length + 1}`,
      createdAt: new Date().toISOString(),
      ...orderData
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}

// Create a singleton instance
export const db = new MockDatabase();
