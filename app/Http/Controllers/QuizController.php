<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use App\Models\Vocabulary;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function quiz(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);

        if ($quiz->finished_at !== null) {
            return redirect()->route('quiz.results', [
                'quiz' => $quiz->uuid
            ]);
        }

        return inertia('quiz', [
            'quiz' => $quiz->load('questions'),
        ]);
    }

    public function results(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);

        if ($quiz->finished_at !== null && $quiz->score <= 0) {
            $score = $quiz->questions->filter(function ($question) use ($quiz) {
                return $question->answer === (collect($quiz->selected_answers)->firstWhere('question_id', $question->id)['answer'] ?? '');
            })->count();
            $quiz->score = 100 * $score / $quiz->questions->count();
            $quiz->save();
        }

        return inertia('quiz-result', [
            'quiz' => $quiz->load('questions'),
            'topics' => Topic::find($quiz->topic_ids),
        ]);
    }

    public function reTake(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);

        $newQuiz = Quiz::create([
            'current_question' => 0,
            'user_id' => $request->user()->id,
            'uuid' => str()->uuid()->toString(),
            'topic_ids' => $quiz->topic_ids,
            'type' => $quiz->type,
        ]);

        $newQuiz->questions()->createMany(
            Vocabulary::whereIn('topic_id', $quiz->topic_ids)
                ->where('type', $quiz->type)
                ->inRandomOrder()
                ->take(5)
                ->get()->map->toQuizQuestion($quiz->uuid, $request->user()->id)
        );

        return to_route('quiz', [
            'quiz' => $newQuiz->uuid
        ]);
    }
}
