<?php

namespace App\Actions;

use App\Models\Quiz;

class CalculateQuizScore
{
    public function __invoke(Quiz $quiz)
    {
        $score = $quiz->questions->filter(function ($question) use ($quiz) {
            return $question->answer === (collect($quiz->selected_answers)->firstWhere('question_id', $question->id)['answer'] ?? '');
        })->count();
        $quiz->score = 100 * $score / $quiz->questions->count();
        $quiz->save();
    }
}
