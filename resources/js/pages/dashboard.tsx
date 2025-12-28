import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import * as Progress from '@radix-ui/react-progress';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { BookOpen, GraduationCap, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';

interface Topic {
    id: number;
    name: string;
    name_de: string;
    description: string;
    vocabulary_count: number;
    sentences_count: number;
    slug: string;
}

interface DashboardProps {
    topics: Topic[];
}

const difficultyLevels = ['all', 'beginner', 'intermediate', 'advanced'];

export default function Dashboard({ topics }: DashboardProps) {
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const topicsByLevel: Record<string, Topic[]> = {
        beginner: topics.slice(0, 12),
        intermediate: topics.slice(12, 28),
        advanced: topics.slice(28),
    };

    const difficultyConfig: Record<string, { color: string; bgColor: string; icon: string }> = {
        beginner: {
            color: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
            icon: '🌱',
        },
        intermediate: {
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
            icon: '📚',
        },
        advanced: {
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
            icon: '🎓',
        },
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-12">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                                <GraduationCap className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    Welcome Back! 👋
                                </h1>
                                <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">
                                    Continue your German learning journey
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/50">
                                    <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">1</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-500">Topics Started</div>
                                <div className="mt-3">
                                    <Progress.Root value={2.5} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <Progress.Indicator
                                            style={{ width: '2.5%' }}
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                                        />
                                    </Progress.Root>
                                </div>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">1 of 40 topics</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/50">
                                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">18</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-500">Vocabulary Learned</div>
                                <div className="mt-3">
                                    <Progress.Root value={15} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <Progress.Indicator
                                            style={{ width: '15%' }}
                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                        />
                                    </Progress.Root>
                                </div>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">18 of 1200 words</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/50">
                                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">82</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-500">Sentences Practiced</div>
                                <div className="mt-3">
                                    <Progress.Root value={25} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <Progress.Indicator
                                            style={{ width: '25%' }}
                                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                                        />
                                    </Progress.Root>
                                </div>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">82 of 500 sentences</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/50">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">7</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-500">Day Streak</div>
                                <div className="mt-3">
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Keep it up!</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Path Section */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Learning Path</h2>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    Explore topics organized by difficulty level
                                </p>
                            </div>
                            <ToggleGroup.Root
                                type="single"
                                defaultValue="all"
                                onValueChange={(value) => {
                                    if (value) setSelectedDifficulty(value);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                {difficultyLevels.map((level) => (
                                    <ToggleGroup.Item
                                        key={level}
                                        value={level}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 data-[state=on]:bg-slate-900 data-[state=on]:text-white dark:text-slate-400 dark:data-[state=on]:bg-slate-800 dark:data-[state=on]:text-white"
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>

                        <div className="space-y-12">
                            {Object.entries(topicsByLevel).map(([level, levelTopics]) => {
                                if (selectedDifficulty !== 'all' && selectedDifficulty !== level) return null;
                                const config = difficultyConfig[level];

                                return (
                                    <div key={level}>
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 ${config.bgColor}`}>
                                                <span className="text-xl">{config.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white">
                                                    {level} Level
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {levelTopics.length} topics to explore
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {levelTopics.map((topic) => (
                                                <Link
                                                    href={route('topic', { topic: topic.slug })}
                                                    key={topic.id}
                                                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-slate-800/50" />
                                                    <div className="relative">
                                                        <div className="mb-3 flex items-start justify-between">
                                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                                                {topic.name}
                                                            </h4>
                                                        </div>
                                                        <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                                                            {topic.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
                                                            <span className="flex items-center gap-1">
                                                                <BookOpen className="h-3.5 w-3.5" />
                                                                {topic.vocabulary_count} words
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <span className="text-base">💬</span>
                                                                {topic.sentences_count} sentences
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
