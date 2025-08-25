<?php

namespace App\Http\Controllers;

use App\Actions\CreateNewQuiz;
use App\Models\Quiz;
use App\Models\Topic;
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
        abort_if($quiz->user_id !== $request->user()->id || $quiz->isNotFinished(), 403);

        return inertia('quiz-result', [
            'quiz' => $quiz->load('questions'),
            'topics' => Topic::find($quiz->topic_ids),
        ]);
    }

    public function reTake(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);

        $quiz = app(CreateNewQuiz::class)->handle([
            'user_id' => $request->user()->id,
            'topic_ids' => $quiz->topic_ids,
            'type' => $quiz->type,
        ]);

        return to_route('quiz', [
            'quiz' => $quiz->uuid
        ]);
    }
}
