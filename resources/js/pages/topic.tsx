import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import * as Tabs from '@radix-ui/react-tabs';
import { BookOpen, MessageSquare, Play, Target } from 'lucide-react';
import VocabularySlider from './components/VocabularySlider';

interface VocabularyItem {
    id: number;
    text: string;
    text_de: string;
    note: string;
    description: string;
    description_de: string;
    culture: string;
}

interface TopicData {
    id: number;
    name: string;
    name_de: string;
    description: string;
    description_de: string;
    vocabulary: VocabularyItem[];
    sentences: VocabularyItem[];
}

interface TopicProps {
    topic: TopicData;
}

export default function Topic({ topic }: TopicProps) {
    const vocabularyItems = topic.vocabulary || [];
    const sentences = topic.sentences || [];

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`${topic.name} - Topic`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-lg shadow-blue-500/25">
                                    <span className="text-3xl font-bold text-white">{topic.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {topic.name}
                                    </h1>
                                    <p className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-400">
                                        {topic.name_de}
                                    </p>
                                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                                        {topic.description}
                                    </p>
                                    <p className="mt-2 text-sm italic text-slate-500 dark:text-slate-500">
                                        {topic.description_de}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Action
                                    action="create-quiz"
                                    data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                                >
                                    <Play className="h-4 w-4" />
                                    Vocabulary Quiz
                                </Action>
                                <Action
                                    title="Practice questions you've struggled with"
                                    action="hard-quiz"
                                    data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                                >
                                    <Target className="h-4 w-4" />
                                    Hard Quiz
                                </Action>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <Tabs.Root defaultValue="vocabulary" className="w-full">
                            <Tabs.List className="flex border-b border-slate-200 dark:border-slate-800">
                                <Tabs.Trigger
                                    value="vocabulary"
                                    className="group relative flex flex-1 items-center justify-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-slate-600 transition-all duration-200 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-slate-400 dark:data-[state=active]:border-blue-500 dark:data-[state=active]:text-blue-400"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Vocabulary
                                    <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        {vocabularyItems.length}
                                    </span>
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="sentences"
                                    className="group relative flex flex-1 items-center justify-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-slate-600 transition-all duration-200 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-slate-400 dark:data-[state=active]:border-blue-500 dark:data-[state=active]:text-blue-400"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Sentences
                                    <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        {sentences.length}
                                    </span>
                                </Tabs.Trigger>
                            </Tabs.List>

                            <div className="p-6">
                                <Tabs.Content
                                    value="vocabulary"
                                    className="animate-in fade-in-50 data-[state=active]:animate-in data-[state=active]:fade-in-50"
                                >
                                    <VocabularySlider vocabularyItems={vocabularyItems} />
                                </Tabs.Content>
                                <Tabs.Content
                                    value="sentences"
                                    className="animate-in fade-in-50 data-[state=active]:animate-in data-[state=active]:fade-in-50"
                                >
                                    <VocabularySlider vocabularyItems={sentences} />
                                </Tabs.Content>
                            </div>
                        </Tabs.Root>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
