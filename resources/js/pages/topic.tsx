import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import VocabularySlider from './components/VocabularySlider';

export default function Topic({ topic }) {
    const vocabularyItems = topic.vocabulary || [];
    const sentences = topic.sentences || [];
    return (
        <AppLayout breadcrumbs={[

        ]}>
            <Head title={`${topic.name} - Topic`} />

            <div className="min-h-screen p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                            <span className="text-2xl text-white font-bold">
                                {topic.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-200 mb-1">
                                {topic.name}
                            </h1>
                            <p className="text-xl text-gray-200">
                                {topic.name_de}
                            </p>
                        </div>
                        <div className='flex justify-end flex-1'>
                            <Link href={route('topic.quiz', { topic: topic, type: 'vocabulary' })} className="bg-green-700 px-4 py-3">
                                Take Quiz
                            </Link>
                        </div>
                    </div>
                    <p className="text-gray-200 text-lg max-w-2xl">
                        {topic.description}
                    </p>
                    <p className="text-gray-300 text-md max-w-2xl">
                        de - {topic.description_de}
                    </p>
                </div>

                <div className="space-y-4 mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-200">
                            Vocabulary ({vocabularyItems.length})
                        </h2>
                    </div>

                    <VocabularySlider vocabularyItems={vocabularyItems} />
                </div>
                <div className="space-y-4 mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-200">
                            Sentences ({sentences.length})
                        </h2>
                    </div>

                    <VocabularySlider vocabularyItems={sentences} />
                </div>
            </div>
        </AppLayout>
    );
}
