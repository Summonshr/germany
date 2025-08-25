<?php

namespace App\Actions;

use App\Data\CreateNewQuizData;
use App\Models\Quiz;
use App\Models\Vocabulary;

class CreateNewQuiz
{
    public function handle(CreateNewQuizData $createNewQuizData)
    {
        $quiz = Quiz::query()->create([
            'current_question' => 0,
            'user_id' => $createNewQuizData->user_id,
            'uuid' => str()->uuid()->toString(),
            'topic_ids' => $createNewQuizData->topic_ids,
            'type' => $createNewQuizData->type,
        ]);

        $quiz->questions()->createMany(
            Vocabulary::query()->whereIn('topic_id', $createNewQuizData->topic_ids)
                ->where('type', $createNewQuizData->type)
                ->inRandomOrder()
                ->take(5)
                ->get()->map->toQuizQuestion($createNewQuizData->user_id)
        );

        return $quiz;
    }
}
