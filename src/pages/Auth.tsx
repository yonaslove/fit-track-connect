import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Auth = () => {
  const { login, signup } = useAuth();
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) return toast({ title: "Invalid email", description: "Please enter a valid email address." });
    if (!password) return toast({ title: "Password required", description: "Please enter your password." });
    try {
      await login(email, password);
    } catch (err: any) {
      toast({ title: "Login failed", description: err?.message || "Unable to login." });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) return toast({ title: "Invalid email", description: "Please enter a valid email address." });
    if (!password) return toast({ title: "Password required", description: "Please set a password." });
    try {
      await signup(name || "Yonas", email, password);
    } catch (err: any) {
      toast({ title: "Signup failed", description: err?.message || "Unable to create account." });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card rounded-2xl p-6 border border-border/50">
        <h2 className="text-lg font-semibold mb-4">{mode === "login" ? "Welcome back" : "Create account"}</h2>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded-xl ${mode === "login" ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-xl ${mode === "signup" ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {mode === "signup" && (
          <div className="mb-3">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
        )}

        <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
          <div className="mb-3">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div className="mb-3">
            <label className="text-sm text-muted-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>

          <div className="flex gap-2 mt-4">
            <Button type="submit" className="flex-1">
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
            <Button variant="ghost" onClick={() => { setEmail(""); setName(""); }}>
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
