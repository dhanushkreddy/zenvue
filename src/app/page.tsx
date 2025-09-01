
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Handshake, History, BarChart, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/layout/Logo';

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 h-full flex flex-col">
        <div className="mx-auto bg-white/20 p-4 rounded-full w-fit">
            <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/80 flex-grow">{description}</p>
    </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8 text-white" />
            <span className="text-2xl font-bold text-white">Zenvue</span>
          </Link>
          <div className="flex items-center gap-2">
             <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-white/90">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-screen min-h-[700px] items-center justify-center">
            <Image 
                src="https://picsum.photos/1920/1080"
                alt="Abstract background"
                fill
                data-ai-hint="abstract gradient"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative container text-center px-4">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
                Take Control of Your Ads.
                </h1>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
                Convert Views to Earnings.
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80">
                Zenvue transforms your ad experience. See your ad history, turn ads into affiliate products, and earn commissions—all in one place.
                </p>
                <div className="mt-8 max-w-md mx-auto flex items-center gap-2">
                <Input type="email" placeholder="Enter your email" className="h-12 text-base bg-white/20 text-white placeholder:text-white/60 border-white/30 focus:ring-white" />
                <Button size="lg" className="h-12 bg-white text-black hover:bg-white/90">Get Early Access</Button>
                </div>
            </div>
        </section>

        {/* Core Value Propositions Section */}
        <AnimatedSection className="relative py-24 md:py-32">
            <Image 
                src="https://picsum.photos/1920/1080?grayscale"
                alt="Dark abstract background"
                fill
                data-ai-hint="dark abstract"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white">A Revolutionary Ad Experience</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
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
        
        {/* How It Works Section */}
        <AnimatedSection className="py-24 md:py-32 bg-background">
            <div className="container px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold">Simple, Powerful, and Yours</h2>
                        <p className="mt-4 text-lg text-muted-foreground">From viewing to earning in just a few clicks. Our streamlined process makes affiliate marketing accessible to everyone.</p>
                        <ul className="mt-8 space-y-6">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg">See an Ad, Save an Ad</h3>
                                    <p className="text-muted-foreground">Every ad you encounter is automatically saved to your private, chronological history.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg">Convert to Earn</h3>
                                    <p className="text-muted-foreground">With one click, turn an interesting ad into an affiliate product in your personal collection.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg">Manage & Track</h3>
                                    <p className="text-muted-foreground">Add products to your cart and monitor your potential earnings through our intuitive dashboard.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="relative aspect-square">
                         <Image
                            src="https://picsum.photos/600/600"
                            alt="Ad history view"
                           fill
                            data-ai-hint="user interface"
                            className="object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </AnimatedSection>

         {/* Trust & Transparency Section */}
        <AnimatedSection className="relative py-24 md:py-32">
             <Image
                src="https://picsum.photos/1920/1080?blur=2"
                alt="Blurry background"
                fill
                data-ai-hint="abstract technology"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/80" />
            <div className="relative container px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/3]">
                        <Image
                            src="https://picsum.photos/600/450"
                            alt="Data privacy visualization"
                            fill
                            data-ai-hint="privacy security"
                            className="object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                    <div className="text-white">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8 " />
                            <h2 className="text-4xl md:text-5xl font-bold">Your Data, Your Rules</h2>
                        </div>
                        <p className="mt-4 text-lg text-white/80">
                            We believe in privacy-first. Your ad history is yours alone, stored securely. We provide the tools; you control the data and the earnings.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <BarChart className="h-5 w-5 text-white/80" />
                                <span className="font-medium text-lg">Transparent Revenue Sharing</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-white/80" />
                                <span className="font-medium text-lg">Secure Anonymous Accounts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} Zenvue. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-white/60 hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-white/60 hover:text-white">Terms of Service</Link>
            <Link href="#" className="text-white/60 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
