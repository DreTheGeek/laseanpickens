import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface Order {
  id: string;
  itemName: string;
  itemSlug: string;
  itemPrice: string;
  itemType: string;
  isBundle: boolean;
  date: string;
  status: "confirmed" | "processing" | "completed";
  termsAccepted: boolean;
  refundPolicyAccepted: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  orders: Order[];
  login: (email: string, password: string) => void;
  register: (profile: UserProfile, password: string) => void;
  logout: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const login = (email: string, _password: string) => {
    setUser((prev) => prev || { name: "", email, phone: "", company: "" });
    setIsAuthenticated(true);
  };

  const register = (profile: UserProfile, _password: string) => {
    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "confirmed",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, orders, login, register, logout, addOrder, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
