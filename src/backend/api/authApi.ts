
import { db } from '../data/mockDatabase';

// API functions for user authentication
export const authApi = {
  // Login a user
  login: (email: string, password: string) => {
    const user = db.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Return user data without the password
    const { password: _, ...userData } = user;
    return userData;
  },

  // Register a new user
  register: (name: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    return db.createUser({ name, email, password });
  }
};
