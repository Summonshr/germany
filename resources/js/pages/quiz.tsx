import AppLayout from '@/layouts/app-layout';
import { post } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';

interface Question {
    id: number;
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
        quiz.questions?.filter((q) => Boolean(q.given_answer)).map((q) => ({ question_id: q.id, answer: q.given_answer! })) || [],
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
        const existingAnswer = selectedAnswers.find((ans) => ans.question_id === currentQuestion.id);
        if (existingAnswer) {
            setCurrentAnswer(existingAnswer.answer);
        } else {
            setCurrentAnswer(null);
        }
    }, [currentQuestionIndex, currentQuestion.id, selectedAnswers]);

    const handleAnswerSelect = (selectedOption: string) => {
        setCurrentAnswer(selectedOption);

        const newSelectedAnswers = selectedAnswers.filter((ans) => ans.question_id !== currentQuestion.id);
        newSelectedAnswers.push({
            question_id: currentQuestion.id,
            answer: selectedOption,
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
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
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
            selected_answers: selectedAnswers,
        });
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`Quiz - Question ${currentQuestionIndex + 1}`} />

            {/* Confirmation Dialog */}
            <Dialog.Root open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-sm border border-gray-700 bg-gray-800 p-6">
                        <Dialog.Title className="mb-2 text-xl font-bold text-gray-100">Finish Quiz?</Dialog.Title>
                        <Dialog.Description className="mb-6 text-gray-300">
                            Are you sure you want to finish the quiz? Your progress will be saved.
                        </Dialog.Description>
                        <div className="flex justify-end space-x-3">
                            <Dialog.Close asChild>
                                <button className="rounded-sm bg-gray-700 px-4 py-2 text-gray-200 transition hover:bg-gray-600">Cancel</button>
                            </Dialog.Close>
                            <button
                                onClick={confirmFinishQuiz}
                                className="rounded-sm bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
                            >
                                Confirm
                            </button>
                        </div>
                        <Dialog.Close asChild>
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="px-8 py-8">
                    {/* Question Card */}
                    <div className="mb-8 rounded-sm border border-gray-700 bg-gray-800 p-10">
                        <div className="h-3 w-full rounded-sm bg-gray-700">
                            <div
                                className="h-3 rounded-sm bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="mt-3 text-lg text-gray-400">
                            Question {currentQuestionIndex + 1} of {totalQuestions}
                        </div>
                        <div className="my-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-300">What is the German translation for:</h2>
                            <div className="mb-6 text-5xl font-bold text-blue-400">"{currentQuestion.question}"</div>

                            {currentQuestion.description && (
                                <div className="mb-4 rounded-sm bg-gray-700/50 p-4">
                                    <p className="text-lg text-gray-300">
                                        <strong className="text-blue-400">Description:</strong> {currentQuestion.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Options with ToggleGroup */}
                        <div className="mt-8">
                            <ToggleGroup.Root
                                type="single"
                                value={currentAnswer || undefined}
                                onValueChange={handleAnswerSelect}
                                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                            >
                                {currentQuestion.options.map((option, index) => (
                                    <ToggleGroup.Item
                                        key={index}
                                        value={option}
                                        className="w-full rounded-sm border-2 border-gray-600 bg-gray-800 p-6 text-left text-lg text-gray-200 transition-all duration-200 hover:border-gray-500 hover:bg-gray-700 data-[state=on]:border-blue-400 data-[state=on]:bg-blue-900/30 data-[state=on]:text-blue-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{option}</span>
                                            {currentAnswer === option && <span className="text-2xl">✓</span>}
                                        </div>
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mb-8 flex items-center justify-between">
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentQuestionIndex === 0}
                                        className="rounded-sm bg-gray-700 px-8 py-4 text-lg font-medium text-gray-300 transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        ← Previous
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content className="rounded-sm bg-gray-700 px-3 py-2 text-sm text-gray-100" sideOffset={5}>
                                        Press 'P' to go to previous question
                                        <Tooltip.Arrow className="fill-gray-700" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>

                        <div className="flex space-x-4">
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <button
                                                onClick={handleNext}
                                                className="rounded-sm bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-500"
                                            >
                                                Next →
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content className="rounded-sm bg-gray-700 px-3 py-2 text-sm text-gray-100" sideOffset={5}>
                                                Press 'N' to go to next question
                                                <Tooltip.Arrow className="fill-gray-700" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            ) : (
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <button
                                                onClick={handleFinishQuiz}
                                                className="rounded-sm bg-green-600 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Finish Quiz 🎯
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content className="rounded-sm bg-gray-700 px-3 py-2 text-sm text-gray-100" sideOffset={5}>
                                                Press 'F' to finish quiz
                                                <Tooltip.Arrow className="fill-gray-700" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
