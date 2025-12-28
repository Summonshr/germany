<?php

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;

test('isFinished returns true when quiz has finished_at timestamp', function (): void {
    $quiz = Quiz::factory()->finished()->create();

    expect($quiz->isFinished())->toBeTrue();
});

test('isFinished returns false when quiz has no finished_at timestamp', function (): void {
    $quiz = Quiz::factory()->create(['finished_at' => null]);

    expect($quiz->isFinished())->toBeFalse();
});

test('isNotFinished returns true when quiz has no finished_at timestamp', function (): void {
    $quiz = Quiz::factory()->create(['finished_at' => null]);

    expect($quiz->isNotFinished())->toBeTrue();
});

test('isNotFinished returns false when quiz has finished_at timestamp', function (): void {
    $quiz = Quiz::factory()->finished()->create();

    expect($quiz->isNotFinished())->toBeFalse();
});

test('redirect returns quiz results route for finished quiz', function (): void {
    $quiz = Quiz::factory()->finished()->create();

    $redirect = $quiz->redirect();

    expect($redirect->getTargetUrl())->toContain(route('quiz.results', $quiz));
});

test('redirect returns quiz route for unfinished quiz', function (): void {
    $quiz = Quiz::factory()->create(['finished_at' => null]);

    $redirect = $quiz->redirect();

    expect($redirect->getTargetUrl())->toContain(route('quiz', $quiz));
});

test('quiz has questions relationship', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    QuizQuestion::factory()->count(3)->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
    ]);

    expect($quiz->questions()->count())->toBe(3);
});

test('questions are ordered by id oldest first', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $question1 = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);
    $question2 = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);
    $question3 = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);

    $questions = $quiz->questions;

    expect($questions[0]->id)->toBe($question1->id);
    expect($questions[1]->id)->toBe($question2->id);
    expect($questions[2]->id)->toBe($question3->id);
});
