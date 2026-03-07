import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

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
  authUser: User | null;
  session: Session | null;
  orders: Order[];
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (profile: UserProfile, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthUser(s?.user ?? null);
      if (s?.user) {
        loadProfile(s.user);
        loadOrders(s.user.email ?? "");
      }
      setLoading(false);
    });

    // Subscribe to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setAuthUser(s?.user ?? null);
      if (s?.user) {
        loadProfile(s.user);
        loadOrders(s.user.email ?? "");
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (authU: User) => {
    const { data } = await supabase
      .from("lp_clients")
      .select("name, email, phone, company")
      .eq("email", authU.email)
      .maybeSingle();

    if (data) {
      setUser({ name: data.name || "", email: data.email || "", phone: data.phone || "", company: data.company || "" });
    } else {
      // User authenticated but no lp_clients row yet - use auth metadata
      const meta = authU.user_metadata || {};
      setUser({
        name: meta.name || "",
        email: authU.email || "",
        phone: meta.phone || "",
        company: meta.company || "",
      });
    }
  };

  const loadOrders = async (email: string) => {
    const { data } = await supabase
      .from("lp_orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (data) {
      setOrders(data.map((o) => ({
        id: o.id,
        itemName: o.service || "",
        itemSlug: o.service_slug || "",
        itemPrice: o.amount ? `$${Number(o.amount).toLocaleString()}` : "$0",
        itemType: "one-time",
        isBundle: false,
        date: new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: o.status || "confirmed",
        termsAccepted: true,
        refundPolicyAccepted: true,
      })));
    }
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  const register = async (profile: UserProfile, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({
      email: profile.email,
      password,
      options: {
        data: { name: profile.name, phone: profile.phone, company: profile.company },
      },
    });
    if (error) return error.message;

    // Create lp_clients row
    await supabase.from("lp_clients").upsert({
      email: profile.email,
      name: profile.name,
      phone: profile.phone,
      company: profile.company,
      status: "active",
      joined_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
    }, { onConflict: "email" });

    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOrders([]);
  };

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "confirmed",
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Also insert into Supabase
    if (user?.email) {
      supabase.from("lp_orders").insert({
        email: user.email,
        name: user.name,
        service: order.itemName,
        service_slug: order.itemSlug,
        amount: parseFloat(order.itemPrice.replace(/[$,]/g, "")) || 0,
        currency: "usd",
        status: "confirmed",
      }).then(() => {});
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));

    if (user?.email) {
      await supabase.from("lp_clients").update({
        ...(updates.name && { name: updates.name }),
        ...(updates.phone && { phone: updates.phone }),
        ...(updates.company && { company: updates.company }),
        last_active: new Date().toISOString(),
      }).eq("email", user.email);
    }
  };

  const isAuthenticated = !!session && !!authUser;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, authUser, session, orders, loading, login, register, logout, addOrder, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
