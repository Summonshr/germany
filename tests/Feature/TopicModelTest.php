<?php

use App\Models\Topic;
use App\Models\Vocabulary;

test('topic has vocabulary relationship', function (): void {
    $topic = Topic::factory()->create();
    Vocabulary::factory()->count(3)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);

    expect($topic->vocabulary()->count())->toBe(3);
});

test('topic has sentences relationship', function (): void {
    $topic = Topic::factory()->create();
    Vocabulary::factory()->count(2)->sentence()->create(['topic_id' => $topic->id]);

    expect($topic->sentences()->count())->toBe(2);
});

test('vocabulary relationship only returns vocabulary type', function (): void {
    $topic = Topic::factory()->create();
    Vocabulary::factory()->count(3)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);
    Vocabulary::factory()->count(2)->sentence()->create(['topic_id' => $topic->id]);

    expect($topic->vocabulary()->count())->toBe(3);
});

test('sentences relationship only returns sentence type', function (): void {
    $topic = Topic::factory()->create();
    Vocabulary::factory()->count(3)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);
    Vocabulary::factory()->count(2)->sentence()->create(['topic_id' => $topic->id]);

    expect($topic->sentences()->count())->toBe(2);
});

test('randomVocabulary returns random vocabulary items', function (): void {
    $topic = Topic::factory()->create();
    Vocabulary::factory()->count(15)->create(['topic_id' => $topic->id, 'type' => 'vocabulary']);

    $randomVocab = $topic->randomVocabulary()->get();

    expect($randomVocab->count())->toBe(10);
    expect($randomVocab->first()->type)->toBe('vocabulary');
});
