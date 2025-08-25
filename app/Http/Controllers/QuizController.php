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
            'quiz' => $quiz,
            'questions' => Vocabulary::find($quiz->question_ids),
            'topics' => Topic::find($quiz->topic_ids),
        ]);
    }

    public function results(Request $request, Quiz $quiz)
    {
        abort_if($quiz->user_id !== $request->user()->id, 403);
        if ($quiz->finished_at !== null && $quiz->score <= 0){
            $score = Vocabulary::whereIn('id', $quiz->question_ids)->get()->filter(function ($question, $index) use ($quiz) {
                return $question->text_de === (collect($quiz->selected_answers)->firstWhere('question_id', $question->id)['answer'] ?? '');
            })->count();
            $quiz->score = $score;
            $quiz->save();
        }
        return inertia('quiz-result', [
            'quiz' => $quiz,
            'questions' => Vocabulary::find($quiz->question_ids),
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
            'question_ids' => Vocabulary::whereIn('topic_id', $quiz->topic_ids)->where('type', $quiz->type)->inRandomOrder()->take(10)->pluck('id')->toArray(),
            'type' => 'vocabulary',
        ]);

        return to_route('quiz', [
            'quiz' => $newQuiz->uuid
        ]);
    }
}
