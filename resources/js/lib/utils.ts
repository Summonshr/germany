import { router } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



export const post = (type: string, data: any) => router.post('/actions', {
    type,
    data
}, {
    preserveScroll: true
})
