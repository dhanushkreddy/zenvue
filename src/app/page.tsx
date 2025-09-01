
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Handshake, History } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

const AnimatedSection = ({ children, className, id, innerRef }: { children: React.ReactNode, className?: string, id?: string, innerRef?: React.RefObject<HTMLDivElement> }) => {
  const { ref: internalRef, inView } = useScrollAnimation();
  const ref = innerRef || internalRef;
  
  // A bit of a hack to combine refs if needed, but for now this works
  useEffect(() => {
    if (innerRef) {
      (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = (ref as React.MutableRefObject<HTMLDivElement | null>).current;
    }
  }, [innerRef, ref]);

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


const Sticker = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "absolute font-accent text-lg md:text-xl text-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-2 px-5 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110",
    className
  )}>
    {children}
  </div>
)

const FeatureCard = ({ icon: Icon, title, description, sticker, stickerClassName }: { icon: React.ElementType, title: string, description: string, sticker?: React.ReactNode, stickerClassName?: string }) => (
    <div className="relative text-left p-8 rounded-2xl h-full flex flex-col transition-all duration-300 bg-card/5 backdrop-blur-sm border border-white/10 hover:bg-card/10 hover:border-white/20 hover:shadow-[0_0_20px_theme(colors.primary/0.3)]">
        {sticker && <Sticker className={stickerClassName}>{sticker}</Sticker>}
        <div className="bg-primary/10 p-3 rounded-full w-fit">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
    </div>
);

const Counter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      const duration = 1500; // ms
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.round(to * progress));

        if (frame === totalFrames) {
          clearInterval(counter);
           setCount(to); // Ensure it ends on the exact number
        }
      }, frameRate);

      return () => clearInterval(counter);
    }
  }, [inView, to]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
}


const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef<HTMLDivElement>(null);
  const valuePropsRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);

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

    const refs = [heroRef, valuePropsRef, socialProofRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
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
              (activeSection === 'hero' || activeSection === 'social-proof') ? 'opacity-20' : 'opacity-0'
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
            <div className="container text-center px-4 relative">
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
                  <div className="mt-8 max-w-lg mx-auto relative">
                     <svg className="absolute -top-14 -right-16 w-24 h-24 text-primary opacity-50 -rotate-[30deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.9615 62.9615C16.9615 62.9615 47.9615 25.9615 28.4615 16.4615C8.96151 6.96154 13.4615 54.4615 16.9615 62.9615C22.2115 75.2115 45.4615 85.4615 56.9615 80.9615C68.4615 76.4615 87.4615 35.9615 80.9615 24.4615C74.4615 12.9615 48.9615 16.4615 56.9615 31.4615C64.9615 46.4615 84.4615 62.9615 80.9615 80.9615" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <form className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 text-base flex-1 rounded-full bg-white/10 border border-black/50 placeholder:text-white/70 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-primary"
                        aria-label="Email for early access"
                      />
                      <Button size="lg" type="submit" className="h-12 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_theme(colors.primary/0.4)] animate-pulse hover:animate-none">
                        Get Early Access
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-2">No spam. Only exclusive updates.</p>
                  </div>
                </AnimatedSection>
            </div>
          </section>

          <main className="relative z-10 bg-background">
            {/* Social Proof Section */}
            <AnimatedSection id="social-proof" innerRef={socialProofRef} className="py-24 md:py-32 border-y">
                <div className="container px-4">
                     <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold">Join <Counter to={5000} /> Early Adopters</h2>
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

          {/* Core Value Propositions Section */}
          <div id="value-props" ref={valuePropsRef}>
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
                          sticker="No cap."
                          stickerClassName="-top-4 -right-4 rotate-12"
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
