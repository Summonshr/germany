<?php

declare(strict_types=1);

namespace App\Actions;

use App\Data\CreateNewQuizData;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\Vocabulary;

class CreateNewQuiz
{
    public function handle(CreateNewQuizData $createNewQuizData): Quiz
    {
        $quiz = Quiz::create([
            'current_question' => 0,
            'user_id' => $createNewQuizData->user_id,
            'uuid' => str()->uuid()->toString(),
            'topic_ids' => $createNewQuizData->topic_ids,
            'type' => $createNewQuizData->type,
        ]);

        if ($createNewQuizData->hard) {
            $this->createHardQuiz($createNewQuizData, $quiz);

            return $quiz;
        }

        $quiz->questions()->createMany(
            Vocabulary::query()->whereIn('topic_id', $createNewQuizData->topic_ids)
                ->where('type', $createNewQuizData->type)
                ->inRandomOrder()
                ->take(5)
                ->get()->map->toQuizQuestion($createNewQuizData->user_id)
        );

        return $quiz;
    }

    private function createHardQuiz(CreateNewQuizData $createNewQuizData, Quiz $quiz): void
    {
        $lastWrongQuestionIds = QuizQuestion::query()
            ->where('user_id', $createNewQuizData->user_id)
            ->whereColumn('answer', '!=', 'given_answer')
            ->latest('id')
            ->limit(100);

        $quiz->questions()->createMany(
            QuizQuestion::query()
                ->whereIn('id', $lastWrongQuestionIds->select('id'))
                ->inRandomOrder()
                ->limit(5)
                ->get()
                ->map(fn (QuizQuestion $question) => [
                    'user_id' => $createNewQuizData->user_id,
                    'quiz_uuid' => $quiz->uuid,
                    'question' => $question->question,
                    'answer' => $question->answer,
                    'options' => $question->options,
                    'hint' => $question->hint,
                ])
        );
    }
}
