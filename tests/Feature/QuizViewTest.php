<?php

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;

test('guests cannot view a quiz', function (): void {
    $quiz = Quiz::factory()->create();

    $this->get(route('quiz', $quiz))->assertRedirect('/login');
});

test('authenticated users can view their own quiz', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id]);
    QuizQuestion::factory()->count(5)->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('quiz', $quiz));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('quiz')
        ->has('quiz')
        ->has('quiz.questions', 5)
    );
});

test('users cannot view other users quizzes', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($user)->get(route('quiz', $quiz));

    $response->assertForbidden();
});

test('finished quizzes redirect to results page', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->finished()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('quiz', $quiz));

    $response->assertRedirect(route('quiz.results', $quiz));
});

test('guests cannot view quiz results', function (): void {
    $quiz = Quiz::factory()->finished()->create();

    $this->get(route('quiz.results', $quiz))->assertRedirect('/login');
});

test('authenticated users can view their finished quiz results', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->finished()->create(['user_id' => $user->id]);
    QuizQuestion::factory()->count(5)->create(['quiz_uuid' => $quiz->uuid, 'user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('quiz.results', $quiz));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('quiz-result')
        ->has('quiz')
        ->has('topics')
    );
});

test('users cannot view results of unfinished quiz', function (): void {
    $user = User::factory()->create();
    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'finished_at' => null]);

    $response = $this->actingAs($user)->get(route('quiz.results', $quiz));

    $response->assertForbidden();
});

test('users cannot view other users quiz results', function (): void {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $quiz = Quiz::factory()->finished()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($user)->get(route('quiz.results', $quiz));

    $response->assertForbidden();
});
