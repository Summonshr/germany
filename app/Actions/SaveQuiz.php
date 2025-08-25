<?php

namespace App\Actions;

use App\Models\Quiz;

class SaveQuiz
{
    public function handle(array $data)
    {
        $quiz = Quiz::with('questions')->where('uuid', $data['quiz'])->firstOrFail();

        $quiz->update([
            'current_question' => $data['current_question'],
        ]);

        foreach ($data['selected_answers'] as $answer) {
            $quiz->questions
                ->firstWhere('id', $answer['question_id'])
                ->update(['given_answer' => $answer['answer']]);
        }

        return $quiz;
    }
}
