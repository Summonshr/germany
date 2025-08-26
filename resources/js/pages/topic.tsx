import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import * as Tabs from '@radix-ui/react-tabs';
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

            <div className="min-h-screen p-6">
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-r from-blue-400 to-indigo-500">
                            <span className="text-2xl font-bold text-white">{topic.name.charAt(0)}</span>
                        </div>
                        <div>
                            <h1 className="mb-1 text-4xl font-bold text-gray-200">{topic.name}</h1>
                            <p className="text-xl text-gray-200">{topic.name_de}</p>
                        </div>
                        <div className="flex flex-1 justify-end gap-4">
                            <Action
                                action="create-quiz"
                                data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                className="rounded-sm bg-blue-700 px-4 py-3 font-bold text-white"
                            >
                                Vocabulary Quiz
                            </Action>
                            <Action
                                title="The ones that you failed most"
                                action="hard-quiz"
                                data={{ type: 'vocabulary', topic_ids: [topic.id] }}
                                className="rounded-sm bg-slate-700 px-4 py-3 font-bold text-white"
                            >
                                Hard Quiz
                            </Action>
                        </div>
                    </div>
                    <p className="max-w-2xl text-lg text-gray-200">{topic.description}</p>
                    <p className="text-md max-w-2xl text-gray-300">de - {topic.description_de}</p>
                </div>

                <Tabs.Root defaultValue="vocabulary" className="mt-8">
                    <Tabs.List className="flex gap-4 border-b border-gray-700">
                        <Tabs.Trigger
                            value="vocabulary"
                            className="px-4 py-2 text-lg font-bold text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white"
                        >
                            Vocabulary ({vocabularyItems.length})
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="sentences"
                            className="px-4 py-2 text-lg font-bold text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white"
                        >
                            Sentences ({sentences.length})
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="vocabulary" className="py-6">
                        <VocabularySlider vocabularyItems={vocabularyItems} />
                    </Tabs.Content>
                    <Tabs.Content value="sentences" className="py-6">
                        <VocabularySlider vocabularyItems={sentences} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </AppLayout>
    );
}
