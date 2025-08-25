<?php

namespace App\Actions;

use App\Data\SaveQuizData;
use App\Models\Quiz;

class SaveQuiz
{
    public function handle(SaveQuizData $saveQuizData)
    {
        $quiz = Quiz::with('questions')->where('uuid', $saveQuizData->quiz)->firstOrFail();

        $quiz->update([
            'current_question' => $saveQuizData->current_question,
        ]);

        foreach ($saveQuizData->selected_answers as $answer) {
            $quiz->questions
                ->firstWhere('id', $answer->question_id)
                ->update(['given_answer' => $answer->answer]);
        }

        return $quiz;
    }
}
