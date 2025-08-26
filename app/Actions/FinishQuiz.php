<?php

namespace App\Actions;

use App\Data\FinishQuizData;
use App\Models\Quiz;

class FinishQuiz
{
    public function handle(FinishQuizData $finishQuizData)
    {
        $quiz = Quiz::with('questions')->where('uuid', $finishQuizData->quiz)->firstOrFail();

        $quiz->update([
            'finished_at' => now(),
            'current_question' => $finishQuizData->current_question,
        ]);

        foreach ($finishQuizData->selected_answers as $answer) {
            $quiz->questions
                ->firstWhere('id', $answer->question_id)
                ->update(['given_answer' => $answer->answer]);
        }

        app(CalculateQuizScore::class)->handle($quiz);

        return $quiz;
    }
}
