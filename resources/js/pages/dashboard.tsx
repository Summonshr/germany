import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import * as Progress from '@radix-ui/react-progress';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
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

    const difficultyColors: Record<string, string> = {
        beginner: 'bg-green-500',
        intermediate: 'bg-blue-500',
        advanced: 'bg-purple-500',
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="flex min-h-screen text-white">
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold">Guten Tag, Suman! 👋</h1>
                        <p className="text-slate-400">Ready to continue your German journey?</p>
                    </div>

                    {/* Learning Path */}
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Learning Path</h2>
                            <ToggleGroup.Root
                                type="single"
                                defaultValue="all"
                                onValueChange={(value) => {
                                    if (value) setSelectedDifficulty(value);
                                }}
                                className="flex items-center gap-2 rounded-lg bg-slate-800 p-1"
                            >
                                {difficultyLevels.map((level) => (
                                    <ToggleGroup.Item
                                        key={level}
                                        value={level}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-slate-400 transition-colors data-[state=on]:bg-slate-700 data-[state=on]:text-white"
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>

                        <div className="space-y-10">
                            {Object.entries(topicsByLevel).map(([level, levelTopics]) => {
                                if (selectedDifficulty !== 'all' && selectedDifficulty !== level) return null;

                                return (
                                    <div key={level}>
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className={`h-3 w-3 rounded-full ${difficultyColors[level]}`}></div>
                                            <h3 className="text-xl font-semibold capitalize">{level}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {levelTopics.map((topic, index) => (
                                                <Link
                                                    href={route('topic', { topic: topic.slug })}
                                                    key={topic.id}
                                                    className="group rounded-lg bg-slate-800 p-6 transition-all duration-300 hover:bg-slate-700"
                                                >
                                                    <h4 className="mb-2 text-lg font-bold">{topic.name}</h4>
                                                    <p className="mb-4 text-sm text-slate-400">{topic.description}</p>
                                                    <div className="flex items-center justify-between text-sm text-slate-400">
                                                        <span>{topic.vocabulary_count} Words</span>
                                                        <span>{topic.sentences_count} Sentences</span>
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

                {/* Sidebar */}
                <div className="w-80 bg-slate-800/50 p-8">
                    <div className="mb-10">
                        <h3 className="mb-4 text-xl font-bold">Progress</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Topics Started</span>
                                    <span className="font-medium">1 / 40</span>
                                </div>
                                <Progress.Root value={2.5} className="h-2 w-full rounded-full bg-slate-700">
                                    <Progress.Indicator
                                        style={{ width: `2.5%` }}
                                        className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Vocabulary Learned</span>
                                    <span className="font-medium">18 / 1200</span>
                                </div>
                                <Progress.Root value={15} className="h-2 w-full rounded-full bg-slate-700">
                                    <Progress.Indicator
                                        style={{ width: `15%` }}
                                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Sentences Practiced</span>
                                    <span className="font-medium">82 / 500</span>
                                </div>
                                <Progress.Root value={25} className="h-2 w-full rounded-full bg-slate-700">
                                    <Progress.Indicator
                                        style={{ width: `25%` }}
                                        className="h-full rounded-full bg-purple-500 transition-all duration-500"
                                    />
                                </Progress.Root>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
