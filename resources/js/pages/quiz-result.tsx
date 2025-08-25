import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function QuizResult({  }) {
  return (
    <AppLayout breadcrumbs={[]}>
      <Head title={`Quiz Results`} />
    </AppLayout>
  );
}
