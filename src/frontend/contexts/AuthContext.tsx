
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  updateProfile
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, realtimeDb } from "../../firebase";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set persistence to LOCAL - move this here to ensure it runs only once
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error("Auth persistence error:", error);
      });
      
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser ? `User: ${currentUser.email}` : "No user");
      
      if (currentUser) {
        // Get additional user data from Realtime Database if available
        try {
          const userRef = ref(realtimeDb, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);
          const userData = snapshot.exists() ? snapshot.val() : null;
          
          // Transform Firebase user to our User type
          const userObj: User = {
            id: currentUser.uid,
            name: userData ? userData.name : (currentUser.displayName || currentUser.email?.split('@')[0] || 'User'),
            email: currentUser.email || '',
          };
          setUser(userObj);
        } catch (error) {
          console.error("Error getting user data:", error);
          // Fallback to basic user info if database retrieval fails
          const userObj: User = {
            id: currentUser.uid,
            name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
            email: currentUser.email || '',
          };
          setUser(userObj);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    }, (error) => {
      console.error("Auth state observer error:", error);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", email);
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Successfully signed in",
        description: `Welcome back, ${email}`,
      });
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error("Login error:", err);
      const errorCode = err.code || "";
      let errorMessage = "Failed to login";
      
      // Provide more user-friendly error messages
      if (errorCode === "auth/user-not-found") {
        errorMessage = "Email not registered";
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (errorCode === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (errorCode === "auth/too-many-requests") {
        errorMessage = "Too many failed login attempts. Try again later";
      } else if (errorCode === "auth/configuration-not-found") {
        errorMessage = "Firebase authentication is not configured correctly";
      }
      
      setError(errorMessage);
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting registration with:", email);
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with name
      await updateProfile(user, { displayName: name });
      
      // Store additional user data in the Realtime Database
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      await set(userRef, {
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      });
      
      toast({
        title: "Account created",
        description: "Registration successful!",
      });
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorCode = err.code || "";
      let errorMessage = "Failed to register";
      
      // Provide more user-friendly error messages
      if (errorCode === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "Password is too weak";
      }
      
      setError(errorMessage);
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/home");
    } catch (err) {
      console.error("Logout error:", err);
      toast({
        title: "Sign out failed",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
