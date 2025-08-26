import { useEffect, useState } from 'react';

interface VocabularyItem {
    text: string;
    text_de: string;
    note: string;
    description: string;
    description_de: string;
    culture: string;
}

interface VocabularySliderProps {
    vocabularyItems: VocabularyItem[];
}

export default function VocabularySlider({ vocabularyItems }: VocabularySliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                nextCard();
            } else if (e.key === 'ArrowLeft') {
                prevCard();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, vocabularyItems.length]);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % vocabularyItems.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + vocabularyItems.length) % vocabularyItems.length);
    };

    if (vocabularyItems.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center rounded-sm border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                <p className="text-lg font-medium text-gray-500">No vocabulary items available</p>
            </div>
        );
    }

    const currentItem = vocabularyItems[currentIndex];
    return (
        <div className="relative max-w-4xl">
            {/* Navigation Arrows */}
            <button
                onClick={prevCard}
                className="absolute top-1/2 left-0 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-sm bg-white shadow-lg transition-all duration-200 hover:bg-gray-50 disabled:opacity-30"
                disabled={vocabularyItems.length <= 1}
                aria-label="Previous card"
            >
                <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextCard}
                className="absolute top-1/2 right-0 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-sm bg-white shadow-lg transition-all duration-200 hover:bg-gray-50 disabled:opacity-30"
                disabled={vocabularyItems.length <= 1}
                aria-label="Next card"
            >
                <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Card Counter */}
            <div className="bg-opacity-70 absolute top-4 right-0 z-10 -translate-x-1/2 transform rounded-sm bg-black px-4 py-1.5 text-sm font-medium text-white shadow-md">
                {currentIndex + 1} / {vocabularyItems.length}
            </div>

            {/* Main Card */}
            <div className="h-[500px] px-4">
                <div
                    className={`flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-xl transition-all duration-300 hover:shadow-2xl`}
                    tabIndex={0}
                >
                    {/* Card Header */}
                    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-7 text-white">
                        <div className="bg-opacity-10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-sm bg-white"></div>
                        <div className="relative z-10">
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <h3 className="mb-1 text-2xl font-bold tracking-tight">{currentItem.text}</h3>
                                    <p className="text-lg font-medium opacity-90">
                                        {currentItem.text_de} {currentItem.note !== '-' ? '-' + currentItem.note : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-grow flex-col p-7">
                        {/* Description */}
                        <div className="mb-5 flex-grow">
                            <p className="mb-3 text-lg leading-relaxed text-gray-700">{currentItem.description}</p>
                            <p className="text-base leading-relaxed text-gray-600">{currentItem.description_de}</p>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-auto space-y-4">
                            {currentItem.culture && currentItem.culture !== '-' && (
                                <div className="rounded-sm border border-purple-100 bg-purple-50 p-4">
                                    <div className="mb-1.5 text-xs font-semibold tracking-wider text-purple-700 uppercase">Cultural Context</div>
                                    <div className="text-purple-800">{currentItem.culture}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
