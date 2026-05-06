import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in or Sign up — Machine Learning Hub" },
      { name: "description", content: "Access Machine Learning Hub by signing in or creating a new account." },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("signup");
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    setLoading(null);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! You're signed in.");
      navigate({ to: "/dashboard" });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("login");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(null);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <header className="px-6 md:px-10 py-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">ML Hub</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-md p-8 rounded-2xl border border-border bg-card/60 backdrop-blur"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to your account or create a new one.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
              >
                {loading === "login" && <Loader2 className="h-4 w-4 animate-spin" />}
                Login
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ background: "var(--gradient-hero)" }}
              >
                {loading === "signup" && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </div>
      </main>
    </div>
  );
}
