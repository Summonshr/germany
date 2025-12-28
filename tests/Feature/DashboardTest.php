<?php

use App\Models\Topic;
use App\Models\User;
use App\Models\Vocabulary;

test('guests are redirected to the login page', function (): void {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function (): void {
    $this->actingAs($user = User::factory()->create());

    $this->get('/dashboard')->assertOk();
});

test('dashboard displays topics with vocabulary and sentence counts', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    Vocabulary::factory()->count(5)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);
    Vocabulary::factory()->count(3)->sentence()->create(['topic_id' => $topic->id]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('topics', 1)
        ->where('topics.0.vocabulary_count', 5)
        ->where('topics.0.sentences_count', 3)
    );
});
