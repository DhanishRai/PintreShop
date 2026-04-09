"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          {/* Animated Background Gradient */}
          <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white text-center mb-2 font-outfit tracking-tight">Admin Access</h1>
            <p className="text-foreground/40 text-center text-sm mb-10 font-medium">Enter your credentials to manage products</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-primary text-sm font-bold text-center bg-primary/10 py-3 rounded-xl border border-primary/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-[0_10px_30px_rgba(230,0,35,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:scale-100 uppercase tracking-widest text-sm"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
