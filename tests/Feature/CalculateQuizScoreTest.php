<?php

use App\Actions\CalculateQuizScore;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;

test('calculates score correctly for all correct answers', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'score' => -1]);

    QuizQuestion::factory()->count(5)->answered()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    app(CalculateQuizScore::class)->handle($quiz);

    expect($quiz->score)->toBe(100);
});

test('calculates score correctly for partial correct answers', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'score' => -1]);

    QuizQuestion::factory()->count(3)->answered()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    QuizQuestion::factory()->count(2)->wrongAnswer()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    app(CalculateQuizScore::class)->handle($quiz);

    expect($quiz->score)->toBe(60); // 3 out of 5 = 60%
});

test('calculates score correctly for all wrong answers', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'score' => -1]);

    QuizQuestion::factory()->count(5)->wrongAnswer()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    app(CalculateQuizScore::class)->handle($quiz);

    expect($quiz->score)->toBe(0);
});

test('score is persisted to database', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'score' => -1]);

    QuizQuestion::factory()->count(4)->answered()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    QuizQuestion::factory()->count(1)->wrongAnswer()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    app(CalculateQuizScore::class)->handle($quiz);

    $quiz->refresh();
    expect($quiz->score)->toBe(80);
});
