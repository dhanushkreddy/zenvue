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
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
                        <p className="text-muted-foreground">Your anonymous user profile information.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>
                            This is an anonymous account. Your data is securely stored and associated with this unique ID.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback>
                                    <User className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">User ID</p>
                                {isInitialized && user ? (
                                    <p className="text-sm text-muted-foreground break-all">{user.uid}</p>
                                ) : (
                                    <Skeleton className="h-5 w-64" />
                                )}
                            </div>
                        </div>
                         <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Authentication Type</p>
                            <p className="text-sm text-muted-foreground">Anonymous</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
