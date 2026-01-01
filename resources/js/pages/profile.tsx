import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';

interface ProfileProps {
    user: User;
}

export default function Profile({ user }: ProfileProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: user.name,
            href: `/profile/${user.username}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${user.name} (@${user.username})`} />

            <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <Avatar className="h-32 w-32 border-4 border-muted">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-4xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {user.bio && (
                    <div className="max-w-md text-center">
                        <p className="text-lg text-balance">{user.bio}</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
