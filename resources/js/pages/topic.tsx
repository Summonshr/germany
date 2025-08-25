import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Topic({ }) {
    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`Topic`} />
        </AppLayout>
    );
}
