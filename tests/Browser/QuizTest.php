<?php

use App\Models\User;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\QuizQuestion;
use App\Enums\QuizType;
use Illuminate\Support\Str;

test('user can access a quiz', function () {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();
    $quiz = Quiz::factory()
        ->has(QuizQuestion::factory()->count(1), 'questions')
        ->create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'topic_ids' => [$topic->id],
            'type' => QuizType::Vocabulary,
        ]);

    $this->actingAs($user)
        ->visit("/quiz/{$quiz->uuid}")
        ->assertSee('What is the German translation for:');
});
