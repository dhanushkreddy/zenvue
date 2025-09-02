
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/layout/Logo';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-muted min-h-screen py-12 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-8">
            <Logo className="size-8 text-primary" />
            <span className="text-2xl font-bold">Zenvue</span>
        </Link>
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="text-3xl">Terms of Service</CardTitle>
                <CardDescription>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using our website and services (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use the Service.
                </p>
                <h2>2. Service Description</h2>
                <p>
                    Zenvue provides users with tools to manage their advertising experience, including saving ads, tracking history, and converting ads to affiliate products. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
                </p>
                <h2>3. User Conduct</h2>
                <p>
                    You agree to use the Service only for lawful purposes. You are responsible for all of your activity in connection with the Service.
                </p>
                <h2>4. Intellectual Property</h2>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Zenvue and its licensors.
                </p>
                <h2>5. Termination</h2>
                <p>
                    We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <h2>6. Limitation of Liability</h2>
                <p>
                    In no event shall Zenvue, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
                <h2>7. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is established, without regard to its conflict of law provisions.
                </p>
                <h2>8. Changes to Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
