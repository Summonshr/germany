<?php

namespace App\Http\Controllers;

use App\Actions\CreateNewQuiz;
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
        $quiz = app(CreateNewQuiz::class)->handle([
            'user_id' => $request->user()->id,
            'topic_ids' => [$topic->id],
            'type' => $request->get('type')
        ]);

        return to_route('quiz', [
            'quiz' => $quiz->uuid
        ]);
    }
}
