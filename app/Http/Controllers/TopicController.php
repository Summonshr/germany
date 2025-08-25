<?php

namespace App\Http\Controllers;

use App\Actions\CreateNewQuiz;
use App\Data\CreateNewQuizData;
use App\Models\Enums\QuizType;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function show(Request $request, Topic $topic)
    {
        return Inertia::render('topic', ['topic' => $topic->load(['vocabulary', 'sentences'])]);
    }

    public function quiz(Request $request, Topic $topic)
    {
        $quiz = app()->make(CreateNewQuiz::class)->handle(new CreateNewQuizData(
            $request->user()->id,
            [$topic->id],
            $request->enum('type', QuizType::class),
        ));

        return to_route('quiz', [
            'quiz' => $quiz->uuid,
        ]);
    }
}
