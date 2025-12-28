<?php

use App\Enums\QuizType;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\Topic;
use App\Models\User;
use App\Models\Vocabulary;

test('guests cannot retake a quiz', function (): void {
    $quiz = Quiz::factory()->finished()->create();

    $this->postAction('retake-quiz', [
        'quiz' => $quiz->uuid,
    ])->assertUnauthorized();
});

test('authenticated users can retake their finished quiz', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    Vocabulary::factory()->count(10)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);

    $originalQuiz = Quiz::factory()->finished()->create([
        'user_id' => $user->id,
        'topic_ids' => [$topic->id],
        'type' => QuizType::Vocabulary,
    ]);

    QuizQuestion::factory()->count(5)->create([
        'quiz_uuid' => $originalQuiz->uuid,
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->postAction('retake-quiz', [
        'quiz' => $originalQuiz->uuid,
    ]);

    $response->assertRedirect();

    expect(Quiz::count())->toBe(2);

    $newQuiz = Quiz::where('user_id', $user->id)->where('uuid', '!=', $originalQuiz->uuid)->first();
    expect($newQuiz->uuid)->not->toBe($originalQuiz->uuid);
    expect($newQuiz->user_id)->toBe($user->id);
    expect($newQuiz->topic_ids)->toBe($originalQuiz->topic_ids);
    expect($newQuiz->type)->toBe($originalQuiz->type);
    expect($newQuiz->finished_at)->toBeNull();
    expect($newQuiz->questions()->count())->toBe(5);
});

test('users cannot retake other users quizzes', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $quiz = Quiz::factory()->finished()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($user)->postAction('retake-quiz', [
        'quiz' => $quiz->uuid,
    ]);

    $response->assertForbidden();
});

test('retaken quiz has same configuration as original', function (): void {
    $user = User::factory()->create();
    $topic1 = Topic::factory()->create();
    $topic2 = Topic::factory()->create();

    Vocabulary::factory()->count(10)->sentence()->create(['topic_id' => $topic1->id]);
    Vocabulary::factory()->count(10)->sentence()->create(['topic_id' => $topic2->id]);

    $originalQuiz = Quiz::factory()->finished()->sentence()->create([
        'user_id' => $user->id,
        'topic_ids' => [$topic1->id, $topic2->id],
    ]);

    $response = $this->actingAs($user)->postAction('retake-quiz', [
        'quiz' => $originalQuiz->uuid,
    ]);

    $newQuiz = Quiz::latest()->first();
    expect($newQuiz->type)->toBe(QuizType::Sentence);
    expect($newQuiz->topic_ids)->toBe([$topic1->id, $topic2->id]);
});
