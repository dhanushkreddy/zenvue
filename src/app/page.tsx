
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    <CardHeader>
      <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-7" />
            <span className="text-xl font-bold">Zenvue</span>
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

      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-40">
          <div className="container text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Take Control of Your Ads.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Convert Views into Earnings.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Zenvue transforms your ad experience. See your ad history, turn ads into affiliate products, and earn commissions—all in one place.
            </p>
            <div className="mt-8 max-w-md mx-auto flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" className="h-12 text-base" />
              <Button size="lg" className="h-12">Get Early Access</Button>
            </div>
          </div>
        </section>

        {/* Product Mockup Section */}
        <AnimatedSection className="pb-24 md:pb-40">
            <div className="container">
                <div className="relative rounded-xl shadow-2xl overflow-hidden aspect-video">
                    <Image
                        src="https://picsum.photos/1200/675"
                        alt="Zenvue dashboard mockup"
                        fill
                        data-ai-hint="dashboard product"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
            </div>
        </AnimatedSection>

        {/* Core Value Propositions Section */}
        <AnimatedSection className="py-24 md:py-32 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">A Revolutionary Ad Experience</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
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
        <AnimatedSection className="py-24 md:py-32">
            <div className="container">
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
        <AnimatedSection className="py-24 md:py-32 bg-muted/50">
          <div className="container">
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
                <div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <h2 className="text-4xl md:text-5xl font-bold">Your Data, Your Rules</h2>
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We believe in privacy-first. Your ad history is yours alone, stored securely. We provide the tools; you control the data and the earnings.
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <BarChart className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium text-lg">Transparent Revenue Sharing</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium text-lg">Secure Anonymous Accounts</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t bg-background">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Zenvue. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
