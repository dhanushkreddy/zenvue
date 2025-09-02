
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/layout/Logo';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-muted min-h-screen py-12 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-8">
            <Logo className="size-8 text-primary" />
            <span className="text-2xl font-bold">Zenvue</span>
        </Link>
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                <CardDescription>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none">
                <h2>Introduction</h2>
                <p>
                    Welcome to Zenvue ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <h2>Information We Collect</h2>
                <p>
                    We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                </p>
                <h3>Personal Data</h3>
                <p>
                    During the early access phase, the only personally identifiable information we collect from you is your email address when you voluntarily provide it to us to join our early access list.
                </p>
                <h2>Use of Your Information</h2>
                <p>
                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                </p>
                <ul>
                    <li>Email you regarding your account or order.</li>
                    <li>Notify you of updates to the Site and our services.</li>
                    <li>Request feedback and contact you about your use of the Site.</li>
                    <li>Send you a newsletter and other promotional information.</li>
                </ul>
                <h2>Disclosure of Your Information</h2>
                <p>
                    We do not share, sell, rent, or trade your information with any third parties for their promotional purposes.
                </p>
                <h2>Security of Your Information</h2>
                <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
                <h2>Your Rights</h2>
                <p>
                    You have the right to request access to the personal data we hold about you, to have any inaccuracies corrected, and to request the deletion of your data. If you wish to exercise these rights, please contact us at our designated support address.
                </p>
                <h2>Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
