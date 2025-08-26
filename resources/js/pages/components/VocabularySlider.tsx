// components/VocabularySlider.jsx
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function VocabularySlider({ vocabularyItems }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
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
            <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm border border-gray-200">
                <p className="text-gray-500 text-lg font-medium">No vocabulary items available</p>
            </div>
        );
    }

    const currentItem = vocabularyItems[currentIndex];
    return (
        <div className="relative max-w-4xl">
            {/* Navigation Arrows */}
            <button
                onClick={prevCard}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-sm shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 disabled:opacity-30"
                disabled={vocabularyItems.length <= 1}
                aria-label="Previous card"
            >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextCard}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-sm shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 disabled:opacity-30"
                disabled={vocabularyItems.length <= 1}
                aria-label="Next card"
            >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Card Counter */}
            <div className="absolute top-4 right-0 transform -translate-x-1/2 z-10 bg-black bg-opacity-70 text-white px-4 py-1.5 rounded-sm text-sm font-medium shadow-md">
                {currentIndex + 1} / {vocabularyItems.length}
            </div>

            {/* Main Card */}
            <div className="h-[500px] px-4">
                <div
                    className={`h-full flex flex-col rounded-sm shadow-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl`}
                    tabIndex={0}
                >
                    {/* Card Header */}
                    <div className="p-7 bg-gradient-to-r from-indigo-500 to-purple-600 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-sm -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 tracking-tight">{currentItem.text}</h3>
                                    <p className="text-lg opacity-90 font-medium">{currentItem.text_de} {currentItem.note !== '-' ? '-' + currentItem.note : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 flex flex-col flex-grow">
                        {/* Description */}
                        <div className="mb-5 flex-grow">
                            <p className="text-gray-700 leading-relaxed mb-3 text-lg">
                                {currentItem.description}
                            </p>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {currentItem.description_de}
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 mt-auto">
                            {currentItem.culture && currentItem.culture !== '-' && (
                                <div className="bg-purple-50 p-4 rounded-sm border border-purple-100">
                                    <div className="text-xs font-semibold text-purple-700 mb-1.5 uppercase tracking-wider">Cultural Context</div>
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
