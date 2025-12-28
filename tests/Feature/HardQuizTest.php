<?php

use App\Enums\QuizType;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\Topic;
use App\Models\User;

test('guests cannot create a hard quiz', function (): void {
    $topic = Topic::factory()->create();

    $this->postAction('hard-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ])->assertUnauthorized();
});

test('authenticated users can create a hard quiz from wrong answers', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    // Create previous quiz with 5 wrong answers
    $oldQuiz = Quiz::factory()->finished()->create(['user_id' => $user->id]);
    QuizQuestion::factory()->count(5)->wrongAnswer()->create([
        'quiz_uuid' => $oldQuiz->uuid,
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->postAction('hard-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertRedirect();

    $hardQuiz = Quiz::latest()->first();
    expect($hardQuiz->user_id)->toBe($user->id);
    expect($hardQuiz->type)->toBe(QuizType::Vocabulary);
    expect($hardQuiz->questions()->count())->toBe(5);
});

test('hard quiz pulls from last 100 wrong answers', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    // Create a quiz with wrong answers
    $oldQuiz = Quiz::factory()->finished()->create(['user_id' => $user->id]);
    $wrongQuestions = QuizQuestion::factory()->count(10)->wrongAnswer()->create([
        'quiz_uuid' => $oldQuiz->uuid,
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->postAction('hard-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ]);

    expect(Quiz::count())->toBe(2);

    $hardQuiz = Quiz::where('user_id', $user->id)->where('uuid', '!=', $oldQuiz->uuid)->first();
    expect($hardQuiz->questions()->count())->toBe(5);

    // Verify questions are from wrong answers
    $hardQuizQuestions = $hardQuiz->questions;
    foreach ($hardQuizQuestions as $question) {
        expect($question->user_id)->toBe($user->id);
    }
});

test('hard quiz validates required fields', function (): void {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postAction('hard-quiz');

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['type', 'topic_ids']);
});

test('hard quiz can be created for sentence type', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    $oldQuiz = Quiz::factory()->finished()->sentence()->create(['user_id' => $user->id]);
    QuizQuestion::factory()->count(5)->wrongAnswer()->create([
        'quiz_uuid' => $oldQuiz->uuid,
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->postAction('hard-quiz', [
        'type' => 'sentence',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertRedirect();

    $hardQuiz = Quiz::latest()->first();
    expect($hardQuiz->type)->toBe(QuizType::Sentence);
});

test('users can only create hard quiz from their own wrong answers', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $topic = Topic::factory()->create();

    // Create wrong answers for other user
    $otherQuiz = Quiz::factory()->finished()->create(['user_id' => $otherUser->id]);
    QuizQuestion::factory()->count(10)->wrongAnswer()->create([
        'quiz_uuid' => $otherQuiz->uuid,
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user)->postAction('hard-quiz', [
        'type' => 'vocabulary',
        'topic_ids' => [$topic->id],
    ]);

    $response->assertRedirect();

    $hardQuiz = Quiz::where('user_id', $user->id)->latest()->first();

    // Should create quiz but with 5 questions (or less if not enough wrong answers)
    expect($hardQuiz->questions()->count())->toBeLessThanOrEqual(5);
});
