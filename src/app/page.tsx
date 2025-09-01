
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Handshake, History } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

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
    <div className="text-left p-8 rounded-2xl h-full flex flex-col transition-all duration-300 bg-card/5 backdrop-blur-sm border border-white/10 hover:bg-card/10">
        <div className="bg-primary/10 p-3 rounded-full w-fit">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
    </div>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

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

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);

    return () => {
      if (section1Ref.current) observer.unobserve(section1Ref.current);
      if (section2Ref.current) observer.unobserve(section2Ref.current);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="text-2xl font-bold">Zenvue</span>
          </Link>
          <div className="flex items-center gap-2">
             <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-gray-200">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Fixed Background Videos */}
        <div className="fixed inset-0 z-0">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "object-cover w-full h-full transition-opacity duration-1000",
              activeSection === 'hero' ? 'opacity-20' : 'opacity-0'
            )}
          />
           <video
            src="https://videos.coverr.co/video/coverr-a-person-in-a-dark-room-uses-a-laptop-and-a-smartphone-3023/1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "object-cover w-full h-full absolute inset-0 transition-opacity duration-1000",
              activeSection === 'value-props' ? 'opacity-20' : 'opacity-0'
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section ref={section1Ref} id="hero" className="flex h-screen min-h-[700px] items-center justify-center pt-20">
            <div className="container text-center px-4">
                <AnimatedSection>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
                    Own Your Feed.
                  </h1>
                </AnimatedSection>
                <AnimatedSection>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mt-2">
                    Earn Your Share.
                  </h2>
                </AnimatedSection>
                <AnimatedSection>
                  <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Zenvue transforms your ad experience. See your ad history, turn ads into affiliate products, and earn commissions—all in one place.
                  </p>
                  <div className="mt-8">
                    <Link href="/dashboard">
                      <Button size="lg" className="h-12 text-base bg-white text-black hover:bg-gray-200">Get Early Access</Button>
                    </Link>
                     <p className="text-xs text-muted-foreground mt-2">No spam, just exclusive updates.</p>
                  </div>
                </AnimatedSection>
            </div>
          </section>

          {/* Core Value Propositions Section */}
          <div ref={section2Ref} id="value-props">
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
        
        {/* See It In Action Section */}
        <AnimatedSection className="py-24 md:py-32">
          <div className="container px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From your feed to your wallet, in a few simple steps.
              </p>
            </div>
            
            {/* Step 1: Ad History */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="text-left">
                <h3 className="text-3xl font-bold">1. View Your Ad History</h3>
                <p className="mt-4 text-muted-foreground">Every ad you encounter is automatically saved to your private history. Search, filter, and rediscover products you were interested in at any time.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
                <Image src="https://picsum.photos/800/600" alt="Ad History UI" width={800} height={600} data-ai-hint="ad history interface" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Step 2: Convert to Affiliate */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
               <div className="rounded-xl overflow-hidden border border-border shadow-2xl md:order-last">
                <Image src="https://picsum.photos/800/600" alt="Affiliate Conversion UI" width={800} height={600} data-ai-hint="product conversion button" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold">2. Convert and Earn</h3>
                <p className="mt-4 text-muted-foreground">With a single click, transform any ad into an affiliate product. You'll earn a commission whenever a purchase is made through your converted link.</p>
              </div>
            </div>

            {/* Step 3: Rate and Personalize */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold">3. Rate and Personalize</h3>
                <p className="mt-4 text-muted-foreground">Like or dislike ads to tailor your experience. Your feedback helps us show you more of what you love and less of what you don't.</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
                <Image src="https://picsum.photos/800/600" alt="Ad Rating UI" width={800} height={600} data-ai-hint="like dislike buttons" className="w-full h-full object-cover" />
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
}

export default LandingPage;

    