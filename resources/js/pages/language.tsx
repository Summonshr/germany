import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type Language as LanguageType,
    type Level,
    type Topic,
    type Lesson,
} from '@/types';
import { Head, Link } from '@inertiajs/react';
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


interface LanguagePageProps {
    language: LanguageType;
    level: Level;
    topic: Topic;
    lesson: Lesson;
    previousLessonUrl: string | null;
    nextLessonUrl: string | null;
}

export default function Language({
    language,
    level,
    topic,
    lesson,
    previousLessonUrl,
    nextLessonUrl,
}: LanguagePageProps) {
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {vocab.word}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {vocab.translation}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2}>
                                    <div className="flex justify-between p-2">
                                        {previousLessonUrl ? <Link
                                            className="btn btn-secondary"
                                            href={previousLessonUrl}
                                        >
                                            Previous Lesson
                                        </Link> : <div></div>}
                                        {nextLessonUrl ? <Link
                                            className="btn btn-primary"
                                            href={nextLessonUrl}
                                        >
                                            Next Lesson
                                        </Link> : <div></div>}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
