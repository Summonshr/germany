import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Target, BarChart3, Sparkles } from 'lucide-react';

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
        if (score >= 80) return 'from-emerald-500 to-teal-500';
        if (score >= 60) return 'from-blue-500 to-indigo-500';
        if (score >= 40) return 'from-amber-500 to-orange-500';
        return 'from-red-500 to-rose-500';
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

            <div className="min-h-screen">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header Card */}
                    <div className="mb-8 animate-fade-in">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 shadow-2xl dark:border-slate-800/50">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                            <div className="relative mb-8 text-center">
                                <div
                                    className={`mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${getScoreColor(
                                        quiz.score,
                                    )} shadow-2xl`}
                                >
                                    <Trophy className="h-14 w-14 text-white" />
                                </div>
                                <h1 className="mb-3 text-5xl font-bold text-white">Quiz Complete!</h1>
                                <p className="text-xl text-blue-100">{getScoreMessage(quiz.score)}</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="rounded-2xl border-2 border-white/30 bg-white/20 p-5 text-center backdrop-blur-sm">
                                    <div className="mb-3 flex justify-center">
                                        <CheckCircle2 className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="mb-1 text-4xl font-bold text-white">{correctCount}</div>
                                    <div className="text-sm font-semibold text-blue-100">Correct</div>
                                </div>

                                <div className="rounded-2xl border-2 border-white/30 bg-white/20 p-5 text-center backdrop-blur-sm">
                                    <div className="mb-3 flex justify-center">
                                        <XCircle className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="mb-1 text-4xl font-bold text-white">{incorrectCount}</div>
                                    <div className="text-sm font-semibold text-blue-100">Incorrect</div>
                                </div>

                                <div className="rounded-2xl border-2 border-white/30 bg-white/20 p-5 text-center backdrop-blur-sm">
                                    <div className="mb-3 flex justify-center">
                                        <Target className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="mb-1 text-4xl font-bold text-white">{totalQuestions}</div>
                                    <div className="text-sm font-semibold text-blue-100">Total</div>
                                </div>

                                <div className="rounded-2xl border-2 border-white/30 bg-white/20 p-5 text-center backdrop-blur-sm">
                                    <div className="mb-3 flex justify-center">
                                        <BarChart3 className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="mb-1 text-4xl font-bold text-white">{quiz.score}%</div>
                                    <div className="text-sm font-semibold text-blue-100">Score</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-8">
                                <div className="mb-3 flex items-center justify-between text-sm font-semibold text-white">
                                    <span>Overall Performance</span>
                                    <span>{percentage}%</span>
                                </div>
                                <div className="h-4 w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(quiz.score)} transition-all duration-1000 ease-out shadow-lg`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/80">
                        <div className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-5 dark:border-slate-800/50 dark:from-slate-800/50 dark:to-slate-900/50">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Question Review</h2>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        Review your answers and learn from mistakes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-slate-200/50 bg-slate-50/50 dark:border-slate-800/50 dark:bg-slate-800/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            #
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            English
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Correct Answer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Your Answer
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                                    {questions.map((question, index) => {
                                        const isCorrect = question.given_answer && question.answer === question.given_answer;
                                        return (
                                            <tr
                                                key={question.id || index}
                                                className={`transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30 ${
                                                    isCorrect
                                                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20'
                                                        : 'bg-red-50/50 dark:bg-red-950/20'
                                                }`}
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                    {question.question}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                        {question.answer}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {question.given_answer ? (
                                                        <span
                                                            className={`font-bold ${
                                                                isCorrect
                                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                                    : 'text-red-600 dark:text-red-400'
                                                            }`}
                                                        >
                                                            {question.given_answer}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 italic">Not answered</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                                    {isCorrect ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm dark:bg-emerald-950/50 dark:text-emerald-300">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Correct
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 shadow-sm dark:bg-red-950/50 dark:text-red-300">
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
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                        >
                            <RotateCcw className="h-5 w-5" />
                            Retake Quiz
                        </Action>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default QuizResults;
