import React from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email?: string;
  premium?: boolean;
  stats: {
    workouts: number;
    hours: number;
    streak: number;
    calories?: number;
  };
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const defaultUser: User = {
  id: "u-1",
  name: "Yonas Yirgu",
  email: "yonasyirgu718@gmail.com",
  premium: true,
  stats: {
    workouts: 34,
    hours: 28,
    streak: 7,
    calories: 12400,
  },
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("ftc_user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("ftc_user", JSON.stringify(u));
    else localStorage.removeItem("ftc_user");
  };

  // Users storage (mock): { [email]: { user, password } }
  const readUsers = (): Record<string, { user: User; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem("ftc_users") || "{}");
    } catch {
      return {};
    }
  };

  const writeUsers = (data: Record<string, { user: User; password: string }>) => {
    try {
      localStorage.setItem("ftc_users", JSON.stringify(data));
    } catch {}
  };

  // Seed an admin account if no users exist (for local/dev convenience)
  React.useEffect(() => {
    try {
      const users = readUsers();
      const adminEmail = "admin@local";
      if (!users || Object.keys(users).length === 0) {
        const adminUser: User = { ...defaultUser, name: "Admin", email: adminEmail, id: "admin-1" };
        users[adminEmail] = { user: adminUser, password: "admin123" };
        writeUsers(users);
      }
    } catch {}
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    const users = readUsers();
    const record = users[email?.toLowerCase()];
    if (!record) {
      throw new Error("No account found for this email. Please sign up first.");
    }
    if (record.password !== password) {
      throw new Error("Invalid password.");
    }
    persist(record.user);
    navigate("/profile");
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const users = readUsers();
    const key = email.toLowerCase();
    if (users[key]) {
      throw new Error("An account with this email already exists. Please log in.");
    }
    const u: User = { ...defaultUser, name, email, id: `u-${Date.now()}` };
    users[key] = { user: u, password };
    writeUsers(users);
    persist(u);
    navigate("/profile");
  };

  const logout = () => {
    persist(null);
    navigate("/");
  };

  const updateUser = (patch: Partial<User>) => {
    const next = user ? { ...user, ...patch } : null;
    persist(next as User | null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
