import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain, LogOut, Eye, MessageSquare, Mic, Sparkles, Activity, Cpu, Zap, Plus, Upload, BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Machine Learning Hub" },
      { name: "description", content: "Your Machine Learning Hub dashboard." },
    ],
  }),
});

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">ML Hub</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-border bg-card hover:bg-secondary transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out?</AlertDialogTitle>
              <AlertDialogDescription>
                You'll be returned to the home page and need to sign in again to access your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Sign out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      <main className="flex-1 px-6 md:px-10 pb-12 max-w-7xl mx-auto w-full">
        {/* Welcome */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Welcome back to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              ML Hub
            </span>
          </h1>
          <p className="text-muted-foreground">
            Signed in as <span className="font-mono text-foreground">{email}</span>
          </p>
        </section>

        {/* Stats overview */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "API Calls", value: "12,438", icon: Activity, trend: "+18%" },
            { label: "Active Models", value: "7", icon: Cpu, trend: "+2" },
            { label: "Credits", value: "8,920", icon: Zap, trend: "—" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <s.icon className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold tracking-tight">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Quick actions */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "New experiment", icon: Plus },
              { label: "Upload dataset", icon: Upload },
              { label: "Open docs", icon: BookOpen },
            ].map((a) => (
              <button
                key={a.label}
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-left"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <a.icon className="h-4 w-4" />
                  {a.label}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        {/* ML model cards */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Featured models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Vision Pro",
                desc: "State-of-the-art image classification, detection and segmentation.",
                icon: Eye,
                tag: "Vision",
              },
              {
                name: "LinguaMind",
                desc: "Multilingual text generation, summarization and sentiment analysis.",
                icon: MessageSquare,
                tag: "NLP",
              },
              {
                name: "EchoSpeech",
                desc: "Real-time speech-to-text and natural voice synthesis.",
                icon: Mic,
                tag: "Speech",
              },
              {
                name: "GenCanvas",
                desc: "High-fidelity generative image and creative asset workflows.",
                icon: Sparkles,
                tag: "Generative",
              },
            ].map((m) => (
              <div
                key={m.name}
                className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <m.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{m.name}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{m.desc}</p>
                <button
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  Try model
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
