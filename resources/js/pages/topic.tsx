import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import * as Tabs from '@radix-ui/react-tabs';
import { BookOpen, MessageSquare, Play, Target, Sparkles } from 'lucide-react';
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

            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 animate-fade-in">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl dark:border-slate-800/50">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                        <span className="text-3xl font-bold text-white">{topic.name.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                            {topic.name}
                                        </h1>
                                        <p className="mb-2 text-xl font-medium text-blue-100">{topic.name_de}</p>
                                        <p className="text-base leading-relaxed text-blue-50">{topic.description}</p>
                                        <p className="mt-2 text-sm italic text-blue-100/80">{topic.description_de}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Action
                                        action="create-quiz"
                                        data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                        className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/20 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/30 hover:shadow-xl"
                                    >
                                        <Play className="h-4 w-4" />
                                        Vocabulary Quiz
                                    </Action>
                                    <Action
                                        title="Practice questions you've struggled with"
                                        action="hard-quiz"
                                        data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                        className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 hover:shadow-xl"
                                    >
                                        <Target className="h-4 w-4" />
                                        Hard Quiz
                                    </Action>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/80">
                        <Tabs.Root defaultValue="vocabulary" className="w-full">
                            <Tabs.List className="flex border-b border-slate-200/50 bg-slate-50/50 dark:border-slate-800/50 dark:bg-slate-800/30">
                                <Tabs.Trigger
                                    value="vocabulary"
                                    className="group relative flex flex-1 items-center justify-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-slate-600 transition-all duration-200 data-[state=active]:border-blue-600 data-[state=active]:bg-white/80 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:border-blue-500 dark:data-[state=active]:bg-slate-900/80 dark:data-[state=active]:text-blue-400"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Vocabulary
                                    <span className="ml-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                        {vocabularyItems.length}
                                    </span>
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="sentences"
                                    className="group relative flex flex-1 items-center justify-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-slate-600 transition-all duration-200 data-[state=active]:border-blue-600 data-[state=active]:bg-white/80 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:border-blue-500 dark:data-[state=active]:bg-slate-900/80 dark:data-[state=active]:text-blue-400"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Sentences
                                    <span className="ml-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                        {sentences.length}
                                    </span>
                                </Tabs.Trigger>
                            </Tabs.List>

                            <div className="p-6">
                                <Tabs.Content
                                    value="vocabulary"
                                    className="animate-fade-in data-[state=active]:animate-fade-in"
                                >
                                    <VocabularySlider vocabularyItems={vocabularyItems} />
                                </Tabs.Content>
                                <Tabs.Content
                                    value="sentences"
                                    className="animate-fade-in data-[state=active]:animate-fade-in"
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
