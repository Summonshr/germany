import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import * as Progress from '@radix-ui/react-progress';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { BookOpen, GraduationCap, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react';
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

    const difficultyConfig: Record<string, { color: string; bgColor: string; icon: string; gradient: string }> = {
        beginner: {
            color: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
            icon: '🌱',
            gradient: 'from-emerald-500 to-teal-500',
        },
        intermediate: {
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
            icon: '📚',
            gradient: 'from-blue-500 to-indigo-500',
        },
        advanced: {
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
            icon: '🎓',
            gradient: 'from-purple-500 to-pink-500',
        },
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-12 animate-fade-in">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                    <GraduationCap className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
                                        Welcome Back! 👋
                                    </h1>
                                    <p className="text-lg text-blue-100 sm:text-xl">
                                        Continue your German learning journey with confidence
                                    </p>
                                </div>
                                <Sparkles className="h-12 w-12 text-white/50" />
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">1</div>
                                <div className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">Topics Started</div>
                                <Progress.Root value={2.5} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                    <Progress.Indicator
                                        style={{ width: '2.5%' }}
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">1 of 40 topics</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">18</div>
                                <div className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">Vocabulary Learned</div>
                                <Progress.Root value={15} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                    <Progress.Indicator
                                        style={{ width: '15%' }}
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">18 of 1200 words</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">82</div>
                                <div className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">Sentences Practiced</div>
                                <Progress.Root value={25} className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                    <Progress.Indicator
                                        style={{ width: '25%' }}
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">82 of 500 sentences</div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-300 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">7</div>
                                <div className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">Day Streak</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Keep it up!</div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Path Section */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Learning Path</h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">
                                    Explore topics organized by difficulty level
                                </p>
                            </div>
                            <ToggleGroup.Root
                                type="single"
                                defaultValue="all"
                                onValueChange={(value) => {
                                    if (value) setSelectedDifficulty(value);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
                            >
                                {difficultyLevels.map((level) => (
                                    <ToggleGroup.Item
                                        key={level}
                                        value={level}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:shadow-lg dark:text-slate-400 dark:data-[state=on]:text-white"
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
                                    <div key={level} className="animate-fade-in">
                                        <div className="mb-6 flex items-center gap-4">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 bg-gradient-to-br ${config.gradient} ${config.bgColor} shadow-lg`}
                                            >
                                                <span className="text-2xl">{config.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold capitalize text-slate-900 dark:text-white">
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
                                                    className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80 dark:hover:border-slate-700"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-slate-800/50" />
                                                    <div className="relative">
                                                        <div className="mb-3 flex items-start justify-between">
                                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                                                {topic.name}
                                                            </h4>
                                                            <ArrowRight className="h-5 w-5 text-slate-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                        </div>
                                                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                                            {topic.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-500">
                                                            <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                                                                <BookOpen className="h-3.5 w-3.5" />
                                                                {topic.vocabulary_count}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                                                                <span className="text-base">💬</span>
                                                                {topic.sentences_count}
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
