<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use App\Models\Vocabulary;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function __invoke(Request $request)
    {
        match ($request->get('type')) {
            'save-quiz' => value(function () use ($request) {
                $quiz = Quiz::with('questions')->where('uuid', $request->input('data.quiz'))->firstOrFail();
                foreach ($request->input('data.selected_answers') as $answer) {
                    $quiz->questions
                        ->firstWhere('id', $answer['question_id'])
                        ->update(['given_answer' => $answer['answer']]);
                }
            }),
            'finish-quiz' => value(function () use ($request) {
                $quiz = Quiz::where('uuid', $request->input('data.quiz'))->firstOrFail();
                $quiz->finished_at = now();
                $quiz->current_question = $request->input('data.current_question');
                $quiz->selected_answers = $request->input('data.selected_answers');
                $quiz->save();

                return to_route('quiz.results', [
                    'quiz' => $quiz->uuid
                ]);
            }),
            default => throw new \Exception('Invalid action type')
        };
    }
}
