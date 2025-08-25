<?php

namespace App\Actions;

use App\Models\Quiz;
use App\Models\Vocabulary;

class CreateNewQuiz
{
    public function handle($data)
    {
        $quiz = Quiz::create([
            'current_question' => 0,
            'user_id' => $data['user_id'],
            'uuid' => str()->uuid()->toString(),
            'topic_ids' => $data['topic_ids'],
            'type' => $data['type'],
        ]);

        $quiz->questions()->createMany(
            Vocabulary::whereIn('topic_id', $data['topic_ids'])
                ->where('type', $data['type'])
                ->inRandomOrder()
                ->take(5)
                ->get()->map->toQuizQuestion($data['user_id'])
        );

        return $quiz;
    }
}
