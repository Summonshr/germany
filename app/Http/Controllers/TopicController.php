<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use App\Models\Vocabulary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function show(Request $request, Topic $topic)
    {
        return Inertia::render('topic', ['topic' => $topic->load(['vocabulary', 'sentences'])]);
    }

    public function quiz(Request $request, Topic $topic, ?Quiz $quiz = null)
    {
        $quiz = Quiz::create([
            'current_question' => 0,
            'user_id' => $request->user()->id,
            'uuid' => str()->uuid()->toString(),
            'topic_ids' => [$topic->id],
            'question_ids' => Vocabulary::whereIn('topic_id', [$topic->id])->where('type', 'vocabulary')->inRandomOrder()->take(10)->pluck('id')->toArray(),
            'type' => 'vocabulary',
        ]);

        return to_route('quiz', [
            'quiz' => $quiz->uuid
        ]);
    }
}
