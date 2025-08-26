import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ topics }) {

    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const topicsByLevel = {
        beginner: topics.slice(0, 12),
        intermediate: topics.slice(12, 28),
        advanced: topics.slice(28)
    };

    const difficultyColors = {
        beginner: 'from-green-400 to-emerald-500',
        intermediate: 'from-blue-400 to-indigo-500',
        advanced: 'from-purple-400 to-pink-500'
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="min-h-screen p-6">
                {/* Hero Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-100 mb-2">
                        Guten Tag, Suman! 👋
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Ready to continue your German journey?
                    </p>
                </div>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="rounded-sm p-6 shadow-lg border border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-150">Topics Completed</h3>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <span className="text-green-600 font-bold">1</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-2">
                            <div className="bg-green-500 h-2 rounded-sm" style={{ width: '2.5%' }}></div>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">1 of 40 topics</p>
                    </div>

                    <div className=" rounded-sm p-6 shadow-lg border border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-150">Vocabulary Learned</h3>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <span className="text-blue-900 font-bold">18</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-2">
                            <div className="bg-blue-500 h-2 rounded-sm" style={{ width: '15%' }}></div>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">Keep building your vocabulary!</p>
                    </div>

                    <div className=" rounded-sm p-6 shadow-lg border border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-150">Sentences Practiced</h3>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <span className="text-purple-900 font-bold">82</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-sm h-2">
                            <div className="bg-purple-500 h-2 rounded-sm" style={{ width: '25%' }}></div>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">Great practice momentum!</p>
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level)}
                            className={`px-6 py-3 rounded-sm font-medium transition-all duration-300 ${selectedDifficulty === level
                                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                                : ' text-gray-200 hover:bg-blue-500 shadow-md'
                                }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Learning Path Visualization */}
                <div className="space-y-12">
                    {Object.entries(topicsByLevel).map(([level, levelTopics]) => {
                        if (selectedDifficulty !== 'all' && selectedDifficulty !== level) return null;

                        return (
                            <div key={level} className="relative">
                                {/* Level Header */}
                                <div className="flex items-center mb-8">
                                    <div className={`w-4 h-4 rounded-sm bg-gradient-to-r ${difficultyColors[level]} mr-4`}></div>
                                    <h2 className="text-2xl font-bold text-gray-100 capitalize">
                                        {level} Level
                                    </h2>
                                    <div className="flex-1 h-px bg-gray-200 ml-6"></div>
                                </div>

                                {/* Topic Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {levelTopics.map((topic, index) => {
                                        const isCompleted = false;

                                        return (
                                            <div key={topic.id} className="h-full">
                                                <div className="h-full flex flex-col rounded-sm shadow-lg border-2 transition-all duration-300 border-slate-800 hover:border-blue-200 hover:shadow-xl">
                                                    {/* Card Header */}
                                                    <div className={`p-6 bg-gradient-to-r ${difficultyColors[level]} rounded-t-sm text-white relative overflow-hidden`}>
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-sm -mr-10 -mt-10"></div>
                                                        <div className="relative">
                                                            <h3 className="text-xl font-bold mb-1">{topic.name}</h3>
                                                            <p className="text-sm opacity-90">{topic.name_de}</p>
                                                            {isCompleted && (
                                                                <div className="absolute top-0 right-0 w-8 h-8 bg-green-400 rounded-sm flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Card Body - Flex grow to fill remaining space */}
                                                    <div className="p-6 flex flex-col flex-grow">
                                                        {/* Description - Expandable */}
                                                        <p className="text-gray-200 mb-4 flex-grow leading-relaxed">
                                                            {topic.description}
                                                        </p>

                                                        {/* Stats and Button - Fixed at bottom */}
                                                        <div className="mt-auto">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div className="flex space-x-4">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-blue-400">{topic.vocabulary_count}</div>
                                                                        <div className="text-xs text-gray-300">Words</div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-purple-400">{topic.sentences_count}</div>
                                                                        <div className="text-xs text-gray-300">Sentences</div>
                                                                    </div>
                                                                </div>

                                                                <Link className={`
                                                    px-6 py-2 rounded-sm font-medium transition-all duration-300
                                                    ${isCompleted
                                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                                                                    }

                                                `} href={route('topic', { topic: topic.slug })}
                                                                    prefetch={index <= 1}
                                                                >
                                                                    {isCompleted ? 'Review' : 'Start'}
                                                                </Link>
                                                            </div>

                                                            {/* Progress Bar */}
                                                            {isCompleted && (
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-green-500 h-2 rounded-sm" style={{ width: '100%' }}></div>
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
                <div className="mt-16  rounded-sm p-8 shadow-lg border border-slate-800">
                    <h3 className="text-2xl font-bold text-gray-100 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="font-semibold">Daily Challenge</div>
                            <div className="text-sm opacity-90">Test your skills</div>
                        </button>

                        <button className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">📚</div>
                            <div className="font-semibold">Review Vocabulary</div>
                            <div className="text-sm opacity-90">Strengthen memory</div>
                        </button>

                        <button className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">🎮</div>
                            <div className="font-semibold">Practice Games</div>
                            <div className="text-sm opacity-90">Learn while playing</div>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
