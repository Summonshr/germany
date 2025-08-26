import { Action } from '@/components/action';
import AppLayout from '@/layouts/app-layout';

interface Question {
    given_answer: string;
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
}

const QuizResults = ({ quiz }: QuizResultsProps) => {
    const { questions } = quiz;

    return (
        <AppLayout>
            <div className="space-y-6 p-4">
                {/* Header summary */}

                <div className="rounded-sm border border-gray-700 bg-gray-800 p-6">
                    <h1 className="mb-4 text-2xl font-bold text-gray-100">Quiz Results</h1>
                    <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                        <div className="rounded-sm bg-gray-700 p-4">
                            <div className="text-2xl font-bold text-green-400">{questions.filter((q) => q.given_answer === q.answer).length}</div>
                            <div className="text-sm text-gray-400">Correct</div>
                        </div>
                        <div className="rounded-sm bg-gray-700 p-4">
                            <div className="text-2xl font-bold text-red-400">{questions.filter((q) => q.given_answer !== q.answer).length}</div>
                            <div className="text-sm text-gray-400">Incorrect</div>
                        </div>
                        <div className="rounded-sm bg-gray-700 p-4">
                            <div className="text-2xl font-bold text-blue-400">{questions.length}</div>
                            <div className="text-sm text-gray-400">Total</div>
                        </div>
                        <div className="rounded-sm bg-gray-700 p-4">
                            <div className="text-2xl font-bold text-yellow-400">{quiz.score}%</div>
                            <div className="text-sm text-gray-400">Score</div>
                        </div>
                    </div>
                </div>

                {/* Compact table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-gray-700 text-xs text-gray-400 uppercase">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">English</th>
                                <th className="px-4 py-3">German</th>
                                <th className="px-4 py-3">Your Answer</th>
                                <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, i) => {
                                let ok = question.answer === question.given_answer;
                                return (
                                    <tr key={question.quiz_uuid} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td className="px-4 py-2">{i + 1}</td>
                                        <td className="px-4 py-2">{question.question}</td>
                                        <td className="px-4 py-2">{question.answer}</td>
                                        <td className={`px-4 py-2 font-medium ${ok ? 'text-green-400' : 'text-red-400'}`}>{question.given_answer}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span
                                                className={`text-md inline-block rounded px-2 py-1 font-bold ${
                                                    ok ? 'text-green-600' : 'text-red-600'
                                                }`}
                                            >
                                                {ok ? '✓' : '✗'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Re-take button */}
                <div className="text-center">
                    <Action
                        action="retake-quiz"
                        data={{ quiz: quiz.uuid }}
                        className="inline-flex items-center rounded-sm bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Take Quiz Again (Shuffled)
                    </Action>
                </div>
            </div>
        </AppLayout>
    );
};

export default QuizResults;
