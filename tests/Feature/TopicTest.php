<?php

use App\Models\Topic;
use App\Models\User;
use App\Models\Vocabulary;

test('guests cannot view topics', function (): void {
    $topic = Topic::factory()->create();

    $this->get(route('topic', $topic))->assertRedirect('/login');
});

test('authenticated users can view a topic', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    $response = $this->actingAs($user)->get(route('topic', $topic));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('topic')
        ->has('topic')
        ->where('topic.id', $topic->id)
    );
});

test('topic page displays vocabulary and sentences', function (): void {
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    $vocabulary = Vocabulary::factory()->count(3)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);
    $sentences = Vocabulary::factory()->count(2)->sentence()->create(['topic_id' => $topic->id]);

    $response = $this->actingAs($user)->get(route('topic', $topic));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('topic')
        ->has('topic.vocabulary', 3)
        ->has('topic.sentences', 2)
    );
});
