<?php

namespace App\Actions;

use App\Models\Quiz;

class CalculateQuizScore
{
    public function handle(Quiz $quiz): void
    {
        $score = $quiz->questions()->whereColumn('answer', 'given_answer')->count();

        $quiz->score = (int) (100 * $score / $quiz->questions->count());
        $quiz->save();
    }
}
