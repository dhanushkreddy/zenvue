'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user, isInitialized } = useAdStore();

    return (
        <MainLayout>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">User Profile</h1>
                        <p className="text-muted-foreground mt-2">Your anonymous user profile information.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>
                            This is an anonymous account. Your data is securely stored and associated with this unique ID.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarFallback>
                                    <User className="h-10 w-10" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none text-muted-foreground">User ID</p>
                                {isInitialized && user ? (
                                    <p className="text-lg font-mono break-all text-foreground">{user.uid}</p>
                                ) : (
                                    <Skeleton className="h-6 w-80" />
                                )}
                            </div>
                        </div>
                         <div className="space-y-1">
                            <p className="text-sm font-medium leading-none text-muted-foreground">Authentication Type</p>
                            <p className="text-lg text-foreground">Anonymous</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
