import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { post } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Question {
    id: number,
    options: string[];
    question: string;
    description?: string;
    given_answer?: string;
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
    questions: Question[];
}

interface QuizProps {
    quiz: Quiz;
}

export default function Quiz({ quiz }: QuizProps) {
    const { questions } = quiz;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(quiz.current_question);
    const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswer[]>(
        quiz.questions
            ?.filter(q => Boolean(q.given_answer))
            .map(q => ({ question_id: q.id, answer: q.given_answer })) || []
    );
    const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
    const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // Keyboard event listener
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            const optionKeys = ['1', '2', '3', '4', 'a', 's', 'd', 'f'];
            const optionIndex = optionKeys.indexOf(key);
            if (optionIndex !== -1 && optionIndex < currentQuestion.options.length) {
                handleAnswerSelect(currentQuestion.options[optionIndex]);
                return;
            }

            if (key === 'n') {
                handleNext();
            } else if (key === 'p') {
                handlePrevious();
            } else if (key === 'f') {
                handleFinishQuiz();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentQuestionIndex, currentQuestion]);

    useEffect(() => {
        const existingAnswer = selectedAnswers.find(ans => ans.question_id === currentQuestion.id);
        if (existingAnswer) {
            setCurrentAnswer(existingAnswer.answer);
        } else {
            setCurrentAnswer(null);
        }
    }, [currentQuestionIndex, currentQuestion.id, selectedAnswers]);

    const handleAnswerSelect = (selectedOption: string) => {
        setCurrentAnswer(selectedOption);

        const newSelectedAnswers = selectedAnswers.filter(ans => ans.question_id !== currentQuestion.id);
        newSelectedAnswers.push({
            question_id: currentQuestion.id,
            answer: selectedOption
        });
        setSelectedAnswers(newSelectedAnswers);

        saveQuizProgress(newSelectedAnswers);
    };

    const saveQuizProgress = async (answers: QuizAnswer[]) => {
        post('save-quiz', {
            quiz: quiz.uuid,
            current_question: currentQuestionIndex,
            selected_answers: answers,
        });
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
        setIsFinishDialogOpen(true);
    };

    const confirmFinishQuiz = () => {
        setIsFinishDialogOpen(false);
        post('finish-quiz', {
            quiz: quiz.uuid,
            current_question: currentQuestionIndex,
            selected_answers: selectedAnswers
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

            {/* Confirmation Dialog */}
            <Dialog.Root open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 rounded-xl p-6 w-[90vw] max-w-md z-50">
                        <Dialog.Title className="text-xl font-bold text-gray-100 mb-2">
                            Finish Quiz?
                        </Dialog.Title>
                        <Dialog.Description className="text-gray-300 mb-6">
                            Are you sure you want to finish the quiz? Your progress will be saved.
                        </Dialog.Description>
                        <div className="flex justify-end space-x-3">
                            <Dialog.Close asChild>
                                <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={confirmFinishQuiz}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                            >
                                Confirm
                            </button>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                                aria-label="Close"
                            >
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

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
                                "{currentQuestion.question}"
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
                            {currentQuestion.options.map((option, index) => (
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
                                    className="px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                                >
                                    Finish Quiz 🎯
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
