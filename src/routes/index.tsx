import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Machine Learning Hub — Explore the Future of AI" },
      {
        name: "description",
        content:
          "Machine Learning Hub is a simple integrated platform to explore models, datasets, and ideas in modern machine learning.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">ML Hub</span>
        </div>
        <Link
          to="/auth"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            A simple integrated web app
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Machine{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              Learning
            </span>{" "}
            Hub
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            A foundational platform to discover, learn, and experiment with machine
            learning. Sign up to start exploring the future of intelligent systems.
          </p>

          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-glow)" }}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 text-left">
            {[
              { title: "Explore Models", desc: "Browse curated machine learning concepts and architectures." },
              { title: "Learn Fast", desc: "Bite-sized resources designed for hands-on learners." },
              { title: "Build Together", desc: "A community space to share ideas and projects." },
            ].map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-xl border border-border bg-card/40 backdrop-blur"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-muted-foreground">
        Built as a System Integration & Architecture lab exercise.
      </footer>
    </div>
  );
}
