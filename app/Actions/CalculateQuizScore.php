<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Quiz;

class CalculateQuizScore
{
    public function handle(Quiz $quiz): void
    {
        $totalQuestions = $quiz->questions->count();

        if ($totalQuestions === 0) {
            $quiz->score = 0;
            $quiz->save();

            return;
        }

        $correctAnswers = $quiz->questions()
            ->whereColumn('answer', 'given_answer')
            ->count();

        $quiz->score = (int) (100 * $correctAnswers / $totalQuestions);
        $quiz->save();
    }
}
