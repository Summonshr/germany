import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
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
        beginner: 'from-green-400 to-emerald-500',
        intermediate: 'from-blue-400 to-indigo-500',
        advanced: 'from-purple-400 to-pink-500',
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="min-h-screen p-6">
                {/* Hero Section */}
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold text-gray-100">Guten Tag, Suman! 👋</h1>
                    <p className="text-lg text-gray-200">Ready to continue your German journey?</p>
                </div>

                {/* Progress Overview */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-sm border border-slate-800 p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-gray-150 font-semibold">Topics Completed</h3>
                            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-green-100">
                                <span className="font-bold text-green-600">1</span>
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-green-500" style={{ width: '2.5%' }}></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">1 of 40 topics</p>
                    </div>

                    <div className="rounded-sm border border-slate-800 p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-gray-150 font-semibold">Vocabulary Learned</h3>
                            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-100">
                                <span className="font-bold text-blue-900">18</span>
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-blue-500" style={{ width: '15%' }}></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">Keep building your vocabulary!</p>
                    </div>

                    <div className="rounded-sm border border-slate-800 p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-gray-150 font-semibold">Sentences Practiced</h3>
                            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-purple-100">
                                <span className="font-bold text-purple-900">82</span>
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-purple-500" style={{ width: '25%' }}></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">Great practice momentum!</p>
                    </div>
                </div>

                {/* Difficulty Filter */}
                <ToggleGroup.Root
                    type="single"
                    defaultValue="all"
                    onValueChange={(value) => {
                        if (value) setSelectedDifficulty(value);
                    }}
                    className="mb-8 flex flex-wrap gap-3"
                >
                    {difficultyLevels.map((level) => (
                        <ToggleGroup.Item
                            key={level}
                            value={level}
                            className="rounded-sm px-6 py-3 font-medium text-gray-200 shadow-md transition-all duration-300 hover:bg-blue-500 data-[state=on]:scale-105 data-[state=on]:transform data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-lg"
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>

                {/* Learning Path Visualization */}
                <div className="space-y-12">
                    {Object.entries(topicsByLevel).map(([level, levelTopics]) => {
                        if (selectedDifficulty !== 'all' && selectedDifficulty !== level) return null;

                        return (
                            <div key={level} className="relative">
                                {/* Level Header */}
                                <div className="mb-8 flex items-center">
                                    <div className={`h-4 w-4 rounded-sm bg-gradient-to-r ${difficultyColors[level]} mr-4`}></div>
                                    <h2 className="text-2xl font-bold text-gray-100 capitalize">{level} Level</h2>
                                    <div className="ml-6 h-px flex-1 bg-gray-200"></div>
                                </div>

                                {/* Topic Cards Grid */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {levelTopics.map((topic, index) => {
                                        const isCompleted = false;

                                        return (
                                            <div key={topic.id} className="h-full">
                                                <div className="flex h-full flex-col rounded-sm border-2 border-slate-800 shadow-lg transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
                                                    {/* Card Header */}
                                                    <div
                                                        className={`bg-gradient-to-r p-6 ${difficultyColors[level]} relative overflow-hidden rounded-t-sm text-white`}
                                                    >
                                                        <div className="bg-opacity-20 absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-sm bg-white"></div>
                                                        <div className="relative">
                                                            <h3 className="mb-1 text-xl font-bold">{topic.name}</h3>
                                                            <p className="text-sm opacity-90">{topic.name_de}</p>
                                                            {isCompleted && (
                                                                <div className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-sm bg-green-400">
                                                                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Card Body - Flex grow to fill remaining space */}
                                                    <div className="flex flex-grow flex-col p-6">
                                                        {/* Description - Expandable */}
                                                        <p className="mb-4 flex-grow leading-relaxed text-gray-200">{topic.description}</p>

                                                        {/* Stats and Button - Fixed at bottom */}
                                                        <div className="mt-auto">
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <div className="flex space-x-4">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-blue-400">
                                                                            {topic.vocabulary_count}
                                                                        </div>
                                                                        <div className="text-xs text-gray-300">Words</div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-purple-400">
                                                                            {topic.sentences_count}
                                                                        </div>
                                                                        <div className="text-xs text-gray-300">Sentences</div>
                                                                    </div>
                                                                </div>

                                                                <Link
                                                                    className={`rounded-sm px-6 py-2 font-medium transition-all duration-300 ${
                                                                        isCompleted
                                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                                            : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl'
                                                                    } `}
                                                                    href={route('topic', { topic: topic.slug })}
                                                                    prefetch={index <= 1}
                                                                >
                                                                    {isCompleted ? 'Review' : 'Start'}
                                                                </Link>
                                                            </div>

                                                            {/* Progress Bar */}
                                                            {isCompleted && (
                                                                <div className="h-2 w-full rounded-sm bg-gray-200">
                                                                    <div className="h-2 rounded-sm bg-green-500" style={{ width: '100%' }}></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mt-16 rounded-sm border border-slate-800 p-8 shadow-lg">
                    <h3 className="mb-6 text-2xl font-bold text-gray-100">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <button className="rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="mb-2 text-3xl">🎯</div>
                            <div className="font-semibold">Daily Challenge</div>
                            <div className="text-sm opacity-90">Test your skills</div>
                        </button>

                        <button className="rounded-sm bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="mb-2 text-3xl">📚</div>
                            <div className="font-semibold">Review Vocabulary</div>
                            <div className="text-sm opacity-90">Strengthen memory</div>
                        </button>

                        <button className="rounded-sm bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="mb-2 text-3xl">🎮</div>
                            <div className="font-semibold">Practice Games</div>
                            <div className="text-sm opacity-90">Learn while playing</div>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
