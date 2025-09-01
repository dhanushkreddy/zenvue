
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Handshake, History } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

const AnimatedSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <section
      ref={ref}
      id={id}
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
    <div className="text-left p-8 rounded-2xl h-full flex flex-col transition-all duration-300 bg-card/5 backdrop-blur-sm border border-white/10 hover:bg-card/10 hover:border-white/20 hover:shadow-[0_0_20px_theme(colors.primary/0.3)]">
        <div className="bg-primary/10 p-3 rounded-full w-fit">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
    </div>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef<HTMLDivElement>(null);
  const valuePropsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (valuePropsRef.current) observer.observe(valuePropsRef.current);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      if (valuePropsRef.current) {
        observer.unobserve(valuePropsRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full bg-background/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="text-2xl font-bold">Zenvue</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Fixed Background Videos */}
        <div className="fixed inset-0 z-0">
           <video
            src="https://videos.coverr.co/video/coverr-a-person-in-a-dark-room-uses-a-laptop-and-a-smartphone-3023/1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "object-cover w-full h-full absolute inset-0 transition-opacity duration-1000",
              activeSection === 'hero' ? 'opacity-20' : 'opacity-0'
            )}
          />
           <video
            src="https://videos.coverr.co/video/coverr-a-man-working-on-his-laptop-in-a-modern-office-space-2621/1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "object-cover w-full h-full absolute inset-0 transition-opacity duration-1000",
              activeSection === 'value-props' ? 'opacity-20' : 'opacity-0'
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} id="hero" className="flex h-screen min-h-[700px] items-center justify-center pt-20">
            <div className="container text-center px-4">
                <AnimatedSection>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                    Your Feed. Your Rules.
                  </h1>
                </AnimatedSection>
                <AnimatedSection>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 mt-2">
                    Experience Zenvue.
                  </h2>
                </AnimatedSection>
                <AnimatedSection>
                  <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Stop scrolling past good ads. Zenvue lets you save, track, and even earn from the ads you see.
                  </p>
                  <div className="mt-8 max-w-lg mx-auto">
                    <form className="flex flex-col sm:flex-row gap-2">
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="h-12 text-base flex-1 bg-white/10 border-white/20 placeholder:text-white/60 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary" 
                        aria-label="Email for early access"
                      />
                      <Button size="lg" type="submit" className="h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_theme(colors.primary/0.4)]">
                        Get Early Access
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-2">No spam. Only exclusive updates.</p>
                  </div>
                </AnimatedSection>
            </div>
          </section>

          {/* Core Value Propositions Section */}
          <div ref={valuePropsRef} id="value-props">
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
        </div>
      </main>

       <main className="relative z-10 bg-background">
        {/* Social Proof Section */}
        <AnimatedSection className="py-24 md:py-32 border-y">
            <div className="container px-4">
                 <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold">Join 5,000+ Early Adopters</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Be part of the community shaping the future of online advertising.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="p-8 rounded-xl bg-card border">
                        <p className="text-muted-foreground">"Zenvue is a game-changer. I finally feel in control of my ad experience and I'm earning from it!"</p>
                        <p className="font-bold mt-4">- Sarah J.</p>
                    </div>
                     <div className="p-8 rounded-xl bg-card border">
                        <p className="text-muted-foreground">"The ability to look back at my ad history is something I didn't know I needed. It's brilliant."</p>
                        <p className="font-bold mt-4">- Mike R.</p>
                    </div>
                     <div className="p-8 rounded-xl bg-card border">
                        <p className="text-muted-foreground">"Converting ads to affiliate links is seamless. It's the perfect side-hustle for anyone who shops online."</p>
                        <p className="font-bold mt-4">- Emily T.</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
      </main>


      <footer className="relative z-10 bg-background/95 border-t border-border">
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
};

export default LandingPage;
