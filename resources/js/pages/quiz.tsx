import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
    id: number;
    topic_id: number;
    type: string;
    text: string;
    text_de: string;
    synonyms: string;
    description: string;
    description_de: string;
    note: string;
    note_de: string;
    culture: string;
    culture_de: string;
    options_de: string[];
}

interface QuizAnswer {
    question_id: number;
    answer: string;
}

interface Quiz {
    uuid: string;
    current_question: number;
    selected_answers: QuizAnswer[];
    user_id: number;
    topic_ids: number[];
    question_ids: number[];
    score: number;
    type: string;
    finished_at: string | null;
    created_at: string;
    updated_at: string;
}

interface QuizProps {
    quiz: Quiz;
    questions: Question[];
}

// Simple Tooltip Component
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="cursor-pointer"
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2
                              bg-gray-800 text-gray-200 text-sm rounded-lg shadow-lg w-64 whitespace-normal
                              border border-gray-600 transition-opacity duration-200">
                    {text}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
};

export default function Quiz({ quiz, topic, questions }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(quiz.current_question);
    const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswer[]>(quiz.selected_answers);
    const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
    const [isLoading, setSaving] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerActive, setTimerActive] = useState(true);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // Timer effect
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, timerActive]);

    // Reset timer and load existing answer when question changes
    useEffect(() => {
        setTimeLeft(30);
        setTimerActive(true);

        // Check if we already have an answer for this question
        const existingAnswer = selectedAnswers.find(ans => ans.question_id === currentQuestion.id);
        if (existingAnswer) {
            setCurrentAnswer(existingAnswer.answer);
            setTimerActive(false);
        } else {
            setCurrentAnswer(null);
        }
    }, [currentQuestionIndex, currentQuestion.id]);

    const handleTimeUp = () => {
        setTimerActive(false);
        if (currentAnswer === null) {
            // Auto-select first option if no answer selected
            handleAnswerSelect(currentQuestion.options_de[0]);
        }
    };

    const handleAnswerSelect = (selectedOption: string) => {
        setCurrentAnswer(selectedOption);
        setTimerActive(false);

        // Update selected answers array
        const newSelectedAnswers = selectedAnswers.filter(ans => ans.question_id !== currentQuestion.id);
        newSelectedAnswers.push({
            question_id: currentQuestion.id,
            answer: selectedOption
        });
        setSelectedAnswers(newSelectedAnswers);

        // Save progress
        saveQuizProgress(newSelectedAnswers);
    };

    const saveQuizProgress = async (answers: QuizAnswer[]) => {
        setSaving(true);
        try {
            await axios.post('/actions', {
                type: 'save-quiz',
                data: {
                    quiz: quiz.uuid,
                    current_question: currentQuestionIndex,
                    selected_answers: answers
                }
            });
        } catch (error) {
            console.error('Failed to save quiz progress:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleFinishQuiz = () => {
        setSaving(true);
        router.post('/actions', {
            type: 'finish-quiz',
            data: {
                quiz: quiz.uuid,
                current_question: currentQuestionIndex,
                selected_answers: selectedAnswers
            }
        });
    };

    const getOptionClassName = (option: string) => {
        let baseClass = "w-full p-6 text-left border-2 rounded-xl transition-all duration-200 text-lg ";

        if (currentAnswer === option) {
            baseClass += "border-blue-400 bg-blue-900/30 text-blue-300";
        } else {
            baseClass += "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 text-gray-200";
        }

        return baseClass;
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`Quiz - Question ${currentQuestionIndex + 1}`} />

            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="px-8 py-8">

                    {/* Question Card */}
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-10 mb-8">
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="text-gray-400 mt-3 text-lg">
                            Question {currentQuestionIndex + 1} of {totalQuestions}
                        </div>
                        <div className="my-8">
                            <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                                What is the German translation for:
                            </h2>
                            <div className="text-5xl font-bold text-blue-400 mb-6">
                                "{currentQuestion.text}"
                            </div>

                            {currentQuestion.description && (
                                <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
                                    <p className="text-gray-300 text-lg">
                                        <strong className="text-blue-400">Description:</strong> {currentQuestion.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {currentQuestion.options_de.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={getOptionClassName(option)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{option}</span>
                                        {currentAnswer === option && (
                                            <span className="text-2xl">✓</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="px-8 py-4 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
                        >
                            ← Previous
                        </button>

                        <div className="flex space-x-4">
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors text-lg font-medium"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinishQuiz}
                                    disabled={isLoading}
                                    className="px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                                >
                                    {isLoading ? 'Finishing...' : 'Finish Quiz 🎯'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
