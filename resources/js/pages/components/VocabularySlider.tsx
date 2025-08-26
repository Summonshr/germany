import { useEffect, useState } from 'react';

interface VocabularyItem {
    id: number;
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

export default function VocabularySlider({ vocabularyItems: initialVocabularyItems }: VocabularySliderProps) {
    const [vocabularyItems, setVocabularyItems] = useState(initialVocabularyItems);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [favoritedItems, setFavoritedItems] = useState<number[]>([]);

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
        if (currentIndex < vocabularyItems.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const shuffleItems = () => {
        const shuffledItems = [...vocabularyItems].sort(() => Math.random() - 0.5);
        setVocabularyItems(shuffledItems);
        setCurrentIndex(0);
        setIsShuffled(true);
    };

    const resetItems = () => {
        setVocabularyItems(initialVocabularyItems);
        setCurrentIndex(0);
        setIsShuffled(false);
    };

    const toggleFavorite = (id: number) => {
        if (favoritedItems.includes(id)) {
            setFavoritedItems(favoritedItems.filter((itemId) => itemId !== id));
        } else {
            setFavoritedItems([...favoritedItems, id]);
        }
    };

    if (vocabularyItems.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center rounded-lg bg-slate-800">
                <p className="text-lg font-medium text-slate-400">No vocabulary items available</p>
            </div>
        );
    }

    const currentItem = vocabularyItems[currentIndex];
    const isFavorited = favoritedItems.includes(currentItem.id);

    return (
        <div className="relative mx-auto w-full max-w-3xl">
            <div className="overflow-hidden rounded-lg bg-slate-800 shadow-lg">
                <div className="relative bg-slate-700/50 p-8">
                    <h2 className="text-4xl font-bold text-white">{currentItem.text}</h2>
                    <p className="text-2xl text-slate-300">{currentItem.text_de}</p>
                    {currentItem.note && currentItem.note !== '-' && <p className="mt-1 text-sm text-slate-400">({currentItem.note})</p>}
                    <button onClick={() => toggleFavorite(currentItem.id)} className="absolute top-4 right-4 text-2xl">
                        {isFavorited ? '❤️' : '🤍'}
                    </button>
                </div>
                <div className="space-y-6 p-8">
                    <div>
                        <h4 className="mb-2 font-semibold text-white">Description</h4>
                        <p className="text-slate-300">{currentItem.description}</p>
                        <p className="mt-1 text-sm text-slate-400">{currentItem.description_de}</p>
                    </div>
                    {currentItem.culture && currentItem.culture !== '-' && (
                        <div>
                            <h4 className="mb-2 font-semibold text-white">Cultural Context</h4>
                            <p className="text-slate-300">{currentItem.culture}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-4">
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-400 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Previous</span>
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={shuffleItems}
                        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-400 transition-colors hover:bg-slate-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                            <path d="m18 2 4 4-4 4" />
                            <path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l6.1 8.6c.7 1.1 2 1.7 3.3 1.7H22" />
                            <path d="m18 22-4-4 4-4" />
                        </svg>
                        <span>Shuffle</span>
                    </button>
                    {isShuffled && (
                        <button
                            onClick={resetItems}
                            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-400 transition-colors hover:bg-slate-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M3 2v6h6" />
                                <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
                                <path d="M21 22v-6h-6" />
                                <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
                            </svg>
                            <span>Reset</span>
                        </button>
                    )}
                </div>
                <button
                    onClick={nextCard}
                    disabled={currentIndex === vocabularyItems.length - 1}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-400 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                    <span>Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="mt-2 text-center text-sm text-slate-400">
                {currentIndex + 1} / {vocabularyItems.length}
            </div>
        </div>
    );
}
