<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class QuizController extends Controller
{
    public function quiz(Request $request, Quiz $quiz): Response|RedirectResponse
    {
        Gate::authorize('view', $quiz);

        if ($quiz->isFinished()) {
            return to_route('quiz.results', [
                'quiz' => $quiz->uuid,
            ]);
        }

        return inertia('quiz', [
            'quiz' => $quiz->load('questions'),
        ]);
    }

    public function results(Request $request, Quiz $quiz): Response
    {
        Gate::authorize('view', $quiz);

        if ($quiz->isNotFinished()) {
            abort(403, 'Quiz must be finished to view results.');
        }

        return inertia('quiz-result', [
            'quiz' => $quiz->load('questions'),
            'topics' => Topic::query()->find($quiz->topic_ids),
        ]);
    }
}
