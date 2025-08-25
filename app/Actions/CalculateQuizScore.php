<?php

namespace App\Actions;

use App\Models\Quiz;
use Illuminate\Support\Collection;

class CalculateQuizScore
{
    public function handle(Quiz $quiz): void
    {
        $score = $quiz->questions->filter(fn ($question): bool => $question->answer === ((new Collection($quiz->selected_answers))->firstWhere('question_id', $question->id)['answer'] ?? ''))->count();
        $quiz->score = 100 * $score / $quiz->questions->count();
        $quiz->save();
    }
}
