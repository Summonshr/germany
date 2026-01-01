<?php

use App\Models\User;
use App\Models\Topic;

test('user can navigate to a topic', function () {
    $user = User::factory()->create();
    $topic = Topic::factory()->create([
        'name' => 'German Grammar',
        'slug' => 'german-grammar',
    ]);

    $this->actingAs($user)
        ->visit("/topic/{$topic->slug}")
        ->assertSee('German Grammar');
});
