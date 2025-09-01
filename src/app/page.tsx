'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Handshake, History, BarChart, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="text-left p-8 rounded-2xl h-full flex flex-col transition-all duration-300">
        <div className="bg-primary/10 p-3 rounded-full w-fit">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
    </div>
);

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="text-2xl font-bold">Zenvue</span>
          </Link>
          <div className="flex items-center gap-2">
             <Link href="/dashboard">
                <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Fixed Background Video */}
        <div className="fixed inset-0 z-0">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-background/80"></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="flex h-screen min-h-[700px] items-center justify-center pt-20">
            <div className="container text-center px-4">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
                  Own Your Feed.
                </h1>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mt-2">
                  Earn Your Share.
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Zenvue transforms your ad experience. See your ad history, turn ads into affiliate products, and earn commissions—all in one place.
                </p>
                <div className="mt-8">
                  <Link href="/dashboard">
                    <Button size="lg" className="h-12 text-base">Get Early Access</Button>
                  </Link>
                </div>
            </div>
          </section>

          {/* Core Value Propositions Section */}
          <AnimatedSection className="py-24 md:py-32">
              <div className="container px-4">
                  <div className="text-center mb-16 max-w-3xl mx-auto">
                      <h2 className="text-4xl md:text-6xl font-bold">A Revolutionary Ad Experience</h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                          We put you in the driver's seat. No more passive consumption.
                      </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={History}
                        title="Full Transparency"
                        description="Access a complete, searchable history of every ad you've seen. Never lose track of a product you were interested in."
                    />
                    <FeatureCard 
                        icon={Handshake}
                        title="Earn Your Share"
                        description="Convert any ad into an affiliate product with a single click and earn a commission when you or others purchase through your link."
                    />
                    <FeatureCard 
                        icon={CheckCircle}
                        title="Total Control"
                        description="Rate ads to tailor your future experience. Manage your converted products and track your potential earnings in a personalized dashboard."
                    />
                  </div>
              </div>
          </AnimatedSection>
        </div>
      </main>

      <footer className="relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                    <Logo className="size-8" />
                    <span className="text-2xl font-bold">Zenvue</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Zenvue. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
