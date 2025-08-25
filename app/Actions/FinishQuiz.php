<?php

namespace App\Actions;

use App\Models\Quiz;

class FinishQuiz
{
    public function handle(array $data)
    {
        $quiz = Quiz::query()->where('uuid', $data['quiz'])->firstOrFail();
        $quiz->finished_at = now();
        $quiz->current_question = $data['current_question'];
        $quiz->selected_answers = $data['selected_answers'];
        $quiz->save();

        app()->make(CalculateQuizScore::class)->handle($quiz);

        return to_route('quiz.results', [
            'quiz' => $quiz->uuid,
        ]);
    }
}
