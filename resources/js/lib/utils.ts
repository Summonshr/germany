import { router } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const post = (action: string, data: any) => {
    if (Object.hasOwn(data, 'action')) {
        throw new Error('No `action` key allowed in data');
    }
    return router.post(
        '/actions',
        {
            ...data,
            action,
        },
        {
            preserveScroll: true,
        },
    );
};
