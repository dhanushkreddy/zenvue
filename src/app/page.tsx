
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Handshake, History, BarChart, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="size-7"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Zenvue Logo"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="hsl(var(--primary))" />
                  <stop offset="1" stopColor="hsl(var(--primary) / 0.5)" />
                </linearGradient>
              </defs>
              <path
                d="M20 20 L40 80 L60 20"
                stroke="url(#logoGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 80 L80 20"
                stroke="url(#logoGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold">Zenvue</span>
          </Link>
          <div className="flex items-center gap-4">
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
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Take Control of Your Ads.
              <br />
              <span className="text-primary">Convert Views into Earnings.</span>
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
        <section className="pb-20 md:pb-32">
            <div className="container">
                <div className="relative rounded-xl shadow-2xl overflow-hidden">
                    <Image
                        src="https://picsum.photos/1200/600"
                        alt="Zenvue dashboard mockup"
                        width={1200}
                        height={600}
                        data-ai-hint="dashboard product"
                        className="w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
            </div>
        </section>

        {/* Core Value Propositions Section */}
        <section className="py-20 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">A Revolutionary Ad Experience</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
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
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">Simple, Powerful, and Yours</h2>
                        <p className="mt-4 text-muted-foreground">From viewing to earning in just a few clicks. Our streamlined process makes affiliate marketing accessible to everyone.</p>
                        <ul className="mt-8 space-y-6">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">See an Ad, Save an Ad</h3>
                                    <p className="text-muted-foreground">Every ad you encounter is automatically saved to your private, chronological history.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Convert to Earn</h3>
                                    <p className="text-muted-foreground">With one click, turn an interesting ad into an affiliate product in your personal collection.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Manage & Track</h3>
                                    <p className="text-muted-foreground">Add products to your cart and monitor your potential earnings through our intuitive dashboard.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/600/500"
                            alt="Ad history view"
                            width={600}
                            height={500}
                            data-ai-hint="user interface"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>

         {/* Trust & Transparency Section */}
        <section className="py-20 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                     <Image
                        src="https://picsum.photos/600/400"
                        alt="Data privacy visualization"
                        width={600}
                        height={400}
                        data-ai-hint="privacy security"
                        className="rounded-xl shadow-2xl"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold">Your Data, Your Rules</h2>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                        We believe in privacy-first. Your ad history is yours alone, stored securely. We provide the tools; you control the data and the earnings.
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <BarChart className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Transparent Revenue Sharing</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Secure Anonymous Accounts</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
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
