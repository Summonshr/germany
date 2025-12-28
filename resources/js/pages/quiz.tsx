import AppLayout from '@/layouts/app-layout';
import { post } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Sparkles } from 'lucide-react';
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
    const answeredCount = selectedAnswers.length;

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

            if (key === 'n' || key === 'arrowright') {
                handleNext();
            } else if (key === 'p' || key === 'arrowleft') {
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
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200/50 bg-white/95 p-8 shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:border-slate-800/50 dark:bg-slate-900/95">
                        <Dialog.Title className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
                            Finish Quiz?
                        </Dialog.Title>
                        <Dialog.Description className="mb-8 text-slate-600 dark:text-slate-400">
                            Are you sure you want to finish the quiz? Your progress will be saved and you'll see your results.
                        </Dialog.Description>
                        <div className="flex justify-end gap-3">
                            <Dialog.Close asChild>
                                <button className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={confirmFinishQuiz}
                                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
                            >
                                Finish Quiz
                            </button>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                                aria-label="Close"
                            >
                                <Cross2Icon className="h-4 w-4" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <div className="min-h-screen">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Progress Bar */}
                    <div className="mb-8 animate-fade-in">
                        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Question {currentQuestionIndex + 1} of {totalQuestions}
                            </span>
                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                {answeredCount} / {totalQuestions} answered
                            </span>
                        </div>
                        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200/80 shadow-inner dark:bg-slate-800/80">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-700 ease-out shadow-lg"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/80">
                        <div className="mb-6">
                            <h2 className="mb-4 text-lg font-semibold text-slate-600 dark:text-slate-400">
                                What is the German translation for:
                            </h2>
                            <div className="mb-6 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                                "{currentQuestion.question}"
                            </div>

                            {currentQuestion.description && (
                                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30">
                                    <p className="text-base text-slate-700 dark:text-slate-300">
                                        <strong className="font-bold text-blue-600 dark:text-blue-400">💡 Hint:</strong>{' '}
                                        {currentQuestion.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="mt-8">
                            <ToggleGroup.Root
                                type="single"
                                value={currentAnswer || undefined}
                                onValueChange={handleAnswerSelect}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                            >
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = currentAnswer === option;
                                    return (
                                        <ToggleGroup.Item
                                            key={index}
                                            value={option}
                                            className={`group relative w-full rounded-2xl border-2 p-6 text-left text-lg font-semibold transition-all duration-300 ${
                                                isSelected
                                                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-xl shadow-blue-500/20 dark:border-blue-500 dark:from-blue-950/30 dark:to-indigo-950/30 dark:text-blue-300'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-750'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span
                                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm shadow-md transition-all ${
                                                            isSelected
                                                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    <span>{option}</span>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                )}
                                                {!isSelected && (
                                                    <Circle className="h-6 w-6 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                                )}
                                            </div>
                                        </ToggleGroup.Item>
                                    );
                                })}
                            </ToggleGroup.Root>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentQuestionIndex === 0}
                                        className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 hover:bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Previous
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-slate-800"
                                        sideOffset={5}
                                    >
                                        Press 'P' or ← to go back
                                        <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>

                        <div className="flex gap-3">
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <button
                                                onClick={handleNext}
                                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                                            >
                                                Next
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-slate-800"
                                                sideOffset={5}
                                            >
                                                Press 'N' or → to continue
                                                <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
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
                                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
                                            >
                                                Finish Quiz
                                                <CheckCircle2 className="h-4 w-4" />
                                            </button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-slate-800"
                                                sideOffset={5}
                                            >
                                                Press 'F' to finish
                                                <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
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
