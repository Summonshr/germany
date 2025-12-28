<?php

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;

test('guests cannot finish a quiz', function (): void {
    $quiz = Quiz::factory()->create();
    $question = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid]);

    $this->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 5,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'test'],
        ],
    ])->assertUnauthorized();
});

test('authenticated users can finish their quiz', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'finished_at' => null]);
    $question = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct answer',
    ]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 5,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'correct answer'],
        ],
    ]);

    $response->assertRedirect(route('quiz.results', $quiz));

    $quiz->refresh();
    expect($quiz->finished_at)->not->toBeNull();
    expect($quiz->current_question)->toBe(5);

    $question->refresh();
    expect($question->given_answer)->toBe('correct answer');
});

test('quiz score is calculated correctly when finishing', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $correctQuestion1 = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct1',
    ]);

    $correctQuestion2 = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct2',
    ]);

    $wrongQuestion = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct3',
    ]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 3,
        'selected_answers' => [
            ['question_id' => $correctQuestion1->id, 'answer' => 'correct1'],
            ['question_id' => $correctQuestion2->id, 'answer' => 'correct2'],
            ['question_id' => $wrongQuestion->id, 'answer' => 'wrong'],
        ],
    ]);

    $response->assertRedirect();

    $quiz->refresh();
    expect($quiz->score)->toBe(66); // 2 out of 3 correct = 66%
});

test('quiz with all correct answers gets 100 score', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $question1 = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct1',
    ]);

    $question2 = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct2',
    ]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 2,
        'selected_answers' => [
            ['question_id' => $question1->id, 'answer' => 'correct1'],
            ['question_id' => $question2->id, 'answer' => 'correct2'],
        ],
    ]);

    $quiz->refresh();
    expect($quiz->score)->toBe(100);
});

test('quiz with all wrong answers gets 0 score', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $question = QuizQuestion::factory()->create([
        'quiz_uuid' => $quiz->uuid,
        'user_id' => $user->id,
        'answer' => 'correct',
    ]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 1,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'wrong'],
        ],
    ]);

    $quiz->refresh();
    expect($quiz->score)->toBe(0);
});

test('users cannot finish other users quizzes', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $otherUser->id]);
    $question = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $otherUser->id]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 1,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'test'],
        ],
    ]);

    $response->assertForbidden();
});

test('finish quiz validates required fields', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->postAction('finish-quiz', [
        'quiz' => $quiz->uuid,
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['current_question', 'selected_answers']);
});
