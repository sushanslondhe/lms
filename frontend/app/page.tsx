"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, BarChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CorporateLearn</span>
          </div>
          {!localStorage.getItem("authorization") ? (
            <div className="space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          ) : (
            <div className="space-x-4 flex">
              <Link href="/learning">
                <Button>My Learnings</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <div>
                <Link href="/signup">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.removeItem("authorization");
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Transform Your Workforce with
            <span className="text-primary"> Smart Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Empower your team with our comprehensive learning management system.
            Built for modern enterprises to deliver, track, and optimize
            training.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything you need to excel
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Team Management"
                description="Easily organize and manage your teams, track progress, and assign courses."
              />
              <FeatureCard
                icon={<BarChart className="h-8 w-8" />}
                title="Analytics & Insights"
                description="Get detailed insights into learning patterns and performance metrics."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8" />}
                title="Certifications"
                description="Issue and track certifications for completed courses and achievements."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 CorporateLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
// @ts-expect-error abc
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
