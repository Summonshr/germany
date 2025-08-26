import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

const QuizResults = ({ quiz }) => {
    const { questions } = quiz;

    return (
        <AppLayout>
            <div className="p-4 space-y-6">
                {/* Header summary */}

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-100 mb-4">Quiz Results</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-400">{questions.filter(q => q.given_answer === q.answer).length}</div>
                            <div className="text-sm text-gray-400">Correct</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-400">
                                {questions.filter(q => q.given_answer !== q.answer).length}
                            </div>
                            <div className="text-sm text-gray-400">Incorrect</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-400">
                                {questions.length}
                            </div>
                            <div className="text-sm text-gray-400">Total</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-400">
                                {quiz.score}%
                            </div>
                            <div className="text-sm text-gray-400">Score</div>
                        </div>
                    </div>
                </div>

                {/* Compact table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
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
                                let ok = question.answer === question.given_answer
                                return (
                                    <tr key={question.quiz_uuid} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td className="px-4 py-2">{i + 1}</td>
                                        <td className="px-4 py-2">{question.question}</td>
                                        <td className="px-4 py-2">{question.answer}</td>
                                        <td
                                            className={`px-4 py-2 font-medium ${ok ? "text-green-400" : "text-red-400"}`}
                                        >
                                            {question.given_answer}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-md font-bold ${ok
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {ok ? "✓" : "✗"}
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
                    <Link
                        method="post"
                        as="button"
                        href="/actions"
                        data={{
                            action: "retake-quiz",
                            quiz: quiz.uuid,
                        }}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Take Quiz Again (Shuffled)
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default QuizResults;
