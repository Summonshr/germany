<?php

use App\Models\User;
use App\Models\Vocabulary;

test('vocabulary has words scope', function (): void {
    Vocabulary::factory()->count(3)->create(['type' => 'vocabulary']);
    Vocabulary::factory()->count(2)->sentence()->create();

    expect(Vocabulary::words()->count())->toBe(3);
});

test('vocabulary has sentences scope', function (): void {
    Vocabulary::factory()->count(3)->create(['type' => 'vocabulary']);
    Vocabulary::factory()->count(2)->sentence()->create();

    expect(Vocabulary::sentences()->count())->toBe(2);
});

test('toQuizQuestion converts vocabulary to quiz question format', function (): void {
    $user = User::factory()->create();
    $vocabulary = Vocabulary::factory()->create([
        'text' => 'Hello',
        'text_de' => 'Hallo',
        'note' => 'Greeting',
        'options_de' => ['Hallo', 'Tschüss', 'Danke', 'Bitte'],
    ]);

    $quizQuestion = $vocabulary->toQuizQuestion($user->id);

    expect($quizQuestion['user_id'])->toBe($user->id);
    expect($quizQuestion['question'])->toBe('Hello');
    expect($quizQuestion['answer'])->toBe('Hallo');
    expect($quizQuestion['hint'])->toBe('Greeting');
    expect($quizQuestion['options'])->toBeArray();
    expect($quizQuestion['options'])->toHaveCount(4);
    expect($quizQuestion['options'])->toContain('Hallo');
});

test('toQuizQuestion shuffles options', function (): void {
    $user = User::factory()->create();
    $vocabulary = Vocabulary::factory()->create([
        'options_de' => ['Option1', 'Option2', 'Option3', 'Option4'],
    ]);

    $quizQuestion = $vocabulary->toQuizQuestion($user->id);

    // Options should still contain all items but potentially in different order
    expect($quizQuestion['options'])->toHaveCount(4);
    expect($quizQuestion['options'])->toContain('Option1');
    expect($quizQuestion['options'])->toContain('Option2');
    expect($quizQuestion['options'])->toContain('Option3');
    expect($quizQuestion['options'])->toContain('Option4');
});

test('vocabulary casts options_de as array', function (): void {
    $vocabulary = Vocabulary::factory()->create([
        'options_de' => ['Option1', 'Option2'],
    ]);

    expect($vocabulary->options_de)->toBeArray();
    expect($vocabulary->options_de)->toBe(['Option1', 'Option2']);
});
