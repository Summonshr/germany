<?php

use App\Enums\QuizType;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\User;
use App\Models\Vocabulary;

test('guests cannot create a new quiz', function (): void {
    $topic = Topic::factory()->create();

    $this->postAction('create-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ])->assertUnauthorized();
});

test('authenticated users can create a new vocabulary quiz', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    Vocabulary::factory()->count(10)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);

    $response = $this->actingAs($user)->postAction('create-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertRedirect();

    expect(Quiz::count())->toBe(1);

    $quiz = Quiz::first();
    expect($quiz->user_id)->toBe($user->id);
    expect($quiz->type)->toBe(QuizType::Vocabulary);
    expect($quiz->topic_ids)->toBe([$topic->id]);
    expect($quiz->questions()->count())->toBe(5);
});

test('authenticated users can create a new sentence quiz', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    Vocabulary::factory()->count(10)->sentence()->create(['topic_id' => $topic->id]);

    $response = $this->actingAs($user)->postAction('create-quiz', [
        'type' => 'sentence',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertRedirect();

    $quiz = Quiz::first();
    expect($quiz->type)->toBe(QuizType::Sentence);
    expect($quiz->questions()->count())->toBe(5);
});

test('quiz creation validates required fields', function (): void {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postAction('create-quiz');

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['type', 'topic_ids']);
});

test('quiz creation validates topic_ids exist', function (): void {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postAction('create-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [999],
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['topic_ids.0']);
});

test('quiz creation validates type is valid', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    $response = $this->actingAs($user)->postAction('create-quiz', [
        'type' => 'invalid',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['type']);
});

test('users can create quiz with multiple topics', function (): void {
    $user = User::factory()->create();
    $topic1 = Topic::factory()->create();
    $topic2 = Topic::factory()->create();

    Vocabulary::factory()->count(5)->create(['topic_id' => $topic1->id, 'type' => 'vocabulary']);
    Vocabulary::factory()->count(5)->create(['topic_id' => $topic2->id, 'type' => 'vocabulary']);

    $response = $this->actingAs($user)->postAction('create-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic1->id, $topic2->id],
    ]);

    $response->assertRedirect();

    $quiz = Quiz::first();
    expect($quiz->topic_ids)->toBe([$topic1->id, $topic2->id]);
    expect($quiz->questions()->count())->toBe(5);
});
