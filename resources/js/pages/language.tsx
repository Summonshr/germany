import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    Clock,
    Trophy,
    BookOpen,
    FileText,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'German Learning Path',
        href: '/language/de',
    },
];

export default function Language() {
    const { language, level, topic, lesson } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${language.name} Learning Path`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Trophy className="h-8 w-8 text-yellow-500" />
                            {language.name} Learning Path
                        </h1>
                        <p className="text-muted-foreground">
                            Your journey to master {language.name} language
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="px-3 py-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Level {level.name}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>Topic: {topic.name}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Lesson: {lesson.title}</span>
                    </div>
                </div>
                <div>
                    <table className="divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Word
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Translation
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {lesson.vocabulary.map((vocab) => (
                                <tr key={vocab.id} className="">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {vocab.word}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vocab.translation}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
