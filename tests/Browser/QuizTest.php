<?php

use App\Models\User;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\QuizQuestion;
use App\Enums\QuizType;
use Illuminate\Support\Str;

test('user can complete a full quiz flow', function () {
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

    $question = $quiz->questions->first();

    $page = $this->actingAs($user)
        ->visit("/quiz/{$quiz->uuid}")
        ->waitForText('What is the German translation for:')
        ->click($question->answer)
        ->click('Finish Quiz'); // Open Dialog

    $page->waitForText('Are you sure you want to finish the quiz?')
        ->click('div[role="dialog"] button:has-text("Finish Quiz")')
        ->waitForText('Quiz Complete!', 10000)
        ->assertSee('Overall Performance');
});
