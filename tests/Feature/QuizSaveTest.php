<?php

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;

test('guests cannot save quiz progress', function (): void {
    $quiz = Quiz::factory()->create();
    $question = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid]);

    $this->postAction('save-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 1,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'test'],
        ],
    ])->assertUnauthorized();
});

test('authenticated users can save quiz progress', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'current_question' => 0]);
    $question = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);

    $response = $this->actingAs($user)->postAction('save-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 1,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'test answer'],
        ],
    ]);

    $quiz->refresh();
    expect($quiz->current_question)->toBe(1);

    $question->refresh();
    expect($question->given_answer)->toBe('test answer');
});

test('users cannot save progress for other users quizzes', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $otherUser->id]);
    $question = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $otherUser->id]);

    $response = $this->actingAs($user)->postAction('save-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 1,
        'selected_answers' => [
            ['question_id' => $question->id, 'answer' => 'test'],
        ],
    ]);

    $response->assertForbidden();
});

test('save quiz validates required fields', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->postAction('save-quiz', [
        'quiz' => $quiz->uuid,
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['current_question', 'selected_answers']);
});

test('save quiz can update multiple answers', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);
    $question1 = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);
    $question2 = QuizQuestion::factory()->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);

    $response = $this->actingAs($user)->postAction('save-quiz', [
        'quiz' => $quiz->uuid,
        'current_question' => 2,
        'selected_answers' => [
            ['question_id' => $question1->id, 'answer' => 'answer 1'],
            ['question_id' => $question2->id, 'answer' => 'answer 2'],
        ],
    ]);

    $question1->refresh();
    $question2->refresh();

    expect($question1->given_answer)->toBe('answer 1');
    expect($question2->given_answer)->toBe('answer 2');
});
