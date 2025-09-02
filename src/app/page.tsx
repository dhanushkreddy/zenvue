
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Handshake, History } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { getEarlyAccessUserCount, addEarlyAccessUser } from './actions';

const Sticker = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "absolute font-accent text-lg md:text-xl text-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-2 px-5 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110",
    className
  )}>
    {children}
  </div>
)

const FeatureCard = ({ icon: Icon, title, description, sticker, stickerClassName, doodle }: { icon: React.ElementType, title: string, description: string, sticker?: React.ReactNode, stickerClassName?: string, doodle?: React.ReactNode }) => (
    <div className="relative text-left p-8 rounded-2xl h-full flex flex-col transition-all duration-300 bg-card/5 dark:bg-card/50 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:bg-card/10 dark:hover:bg-card/70 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_0_20px_theme(colors.primary/0.2)] dark:hover:shadow-[0_0_20px_theme(colors.primary/0.3)] hover:scale-105">
        {sticker && <Sticker className={stickerClassName}>{sticker}</Sticker>}
        {doodle}
        <div className="bg-primary/10 p-3 rounded-full w-fit">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
    </div>
);

const Counter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

            if (ref.current) {
                observer.unobserve(ref.current);
            }

            return () => clearInterval(counter);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
        if (ref.current) {
            observer.unobserve(ref.current)
        }
    }
  }, [to]);

  return <span ref={ref} className="font-sans" style={{ fontVariantNumeric: 'tabular-nums' }}>{count.toLocaleString()}+</span>;
}

const EarlyAccessForm = () => {
  const [state, formAction] = useActionState(addEarlyAccessUser, { message: '', success: false });
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="flex flex-col gap-2">
      <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="h-12 text-base flex-1 rounded-full bg-background/80 dark:bg-white/10 border-border dark:border-white/50 placeholder:text-foreground/60 dark:placeholder:text-white/70"
          aria-label="Email for early access"
          required
        />
        <Button size="lg" type="submit" className="h-12 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_theme(colors.primary/0.4)] animate-pulse hover:animate-none" disabled={pending}>
          {pending ? 'Joining...' : 'Get Early Access'}
        </Button>
      </form>
      {state.message && (
        <p className={`text-sm mt-2 text-center ${state.success ? 'text-green-400' : 'text-red-400'}`}>{state.message}</p>
      )}
    </div>
  )
}

const LandingPage = () => {
  const [userCount, setUserCount] = useState(5000); // Default value

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getEarlyAccessUserCount();
      setUserCount(count);
    };
    fetchCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full bg-background/80 border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="text-2xl font-bold">Zenvue</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="fixed inset-0 z-0 opacity-30 dark:opacity-20">
            <div className="absolute w-[800px] h-[800px] -left-[200px] -top-[200px] bg-gradient-to-br from-fuchsia-500/50 to-pink-500/50 rounded-full blur-[150px] animate-blob-1"></div>
            <div className="absolute w-[600px] h-[600px] right-0 bottom-0 bg-gradient-to-br from-primary/50 to-fuchsia-500/50 rounded-full blur-[150px] animate-blob-2 animation-delay-2000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="flex h-screen min-h-[700px] items-center justify-center pt-20">
            <div className="container text-center px-4 relative">
                
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                    Your Feed. Your Rules.
                  </h1>
                
                
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 mt-2">
                    Experience Zenvue.
                  </h2>
                
                
                  <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Stop scrolling past good ads. Zenvue lets you save, track, and even earn from the ads you see.
                  </p>
                  <div className="mt-8 max-w-lg mx-auto relative">
                     <svg className="absolute -top-14 -right-16 w-24 h-24 text-primary opacity-50 -rotate-[30deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.9615 62.9615C16.9615 62.9615 47.9615 25.9615 28.4615 16.4615C8.96151 6.96154 13.4615 54.4615 16.9615 62.9615C22.2115 75.2115 45.4615 85.4615 56.9615 80.9615C68.4615 76.4615 87.4615 35.9615 80.9615 24.4615C74.4615 12.9615 48.9615 16.4615 56.9615 31.4615C64.9615 46.4615 84.4615 62.9615 80.9615 80.9615" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <EarlyAccessForm />
                    <p className="text-xs text-muted-foreground mt-2">No spam. Only exclusive updates.</p>
                  </div>
                
            </div>
          </section>

          <main className="relative z-10 bg-background">
            {/* Social Proof Section */}
            <section className="py-24 md:py-32 border-y">
                <div className="container px-4">
                     <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">Join <Counter to={userCount} /> Early Adopters</h2>
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
            </section>
            
            {/* Core Value Propositions Section */}
            <section className="py-24 md:py-32">
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
                          doodle={<svg className="absolute -top-8 -left-8 w-24 h-24 text-primary opacity-30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 C40 20, 60 20, 80 50 C60 80, 40 80, 20 50 Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
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
            </section>
          </main>

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
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
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

    