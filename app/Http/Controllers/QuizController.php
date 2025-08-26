<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function quiz(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);

        if ($quiz->finished_at !== null) {
            return to_route('quiz.results', [
                'quiz' => $quiz->uuid,
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
            'topics' => Topic::query()->find($quiz->topic_ids),
        ]);
    }
}
