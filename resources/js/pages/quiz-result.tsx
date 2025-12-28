import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Target, BarChart3 } from 'lucide-react';

interface Question {
    id: number;
    given_answer: string | null;
    answer: string;
    quiz_uuid: string;
    question: string;
}

interface Quiz {
    uuid: string;
    score: number;
    questions: Question[];
}

interface QuizResultsProps {
    quiz: Quiz;
    topics?: Array<{ id: number; name: string }>;
}

const QuizResults = ({ quiz, topics }: QuizResultsProps) => {
    const { questions } = quiz;
    const correctCount = questions.filter((q) => q.given_answer && q.given_answer === q.answer).length;
    const incorrectCount = questions.filter((q) => q.given_answer && q.given_answer !== q.answer).length;
    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-emerald-500 to-emerald-600';
        if (score >= 60) return 'from-blue-500 to-blue-600';
        if (score >= 40) return 'from-amber-500 to-amber-600';
        return 'from-red-500 to-red-600';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Outstanding! 🎉';
        if (score >= 80) return 'Excellent work! 👏';
        if (score >= 70) return 'Great job! 👍';
        if (score >= 60) return 'Good effort! 💪';
        if (score >= 50) return 'Keep practicing! 📚';
        return "Don't give up! 🌱";
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Quiz Results" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header Card */}
                    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-6 text-center">
                            <div
                                className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${getScoreColor(
                                    quiz.score,
                                )} shadow-2xl`}
                            >
                                <Trophy className="h-12 w-12 text-white" />
                            </div>
                            <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">Quiz Complete!</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400">{getScoreMessage(quiz.score)}</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                                <div className="mb-2 flex justify-center">
                                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {correctCount}
                                </div>
                                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Correct</div>
                            </div>

                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-800 dark:bg-red-950/30">
                                <div className="mb-2 flex justify-center">
                                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</div>
                                <div className="text-sm font-medium text-red-700 dark:text-red-300">Incorrect</div>
                            </div>

                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-950/30">
                                <div className="mb-2 flex justify-center">
                                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-blue-600 dark:text-blue-400">{totalQuestions}</div>
                                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Total</div>
                            </div>

                            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center dark:border-purple-800 dark:bg-purple-950/30">
                                <div className="mb-2 flex justify-center">
                                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-purple-600 dark:text-purple-400">{quiz.score}%</div>
                                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Score</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
                                <span>Overall Performance</span>
                                <span>{percentage}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(quiz.score)} transition-all duration-1000 ease-out shadow-lg`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Table */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Question Review</h2>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Review your answers and learn from mistakes
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        English
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        Correct Answer
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        Your Answer
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {questions.map((question, index) => {
                                    const isCorrect = question.given_answer && question.answer === question.given_answer;
                                    return (
                                        <tr
                                            key={question.id || index}
                                            className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                                                isCorrect ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : 'bg-red-50/30 dark:bg-red-950/10'
                                            }`}
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                {question.question}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                                    {question.answer}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`font-semibold ${
                                                        isCorrect
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : 'text-red-600 dark:text-red-400'
                                                    }`}
                                                >
                                                    {question.given_answer || (
                                                        <span className="text-slate-400 italic">Not answered</span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                                {isCorrect ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Correct
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-300">
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Incorrect
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Action
                        action="retake-quiz"
                        data={{ quiz: quiz.uuid }}
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Retake Quiz
                    </Action>
                </div>
            </div>
        </AppLayout>
    );
};

export default QuizResults;
