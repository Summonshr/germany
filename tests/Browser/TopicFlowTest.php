<?php

use App\Models\User;
use App\Models\Topic;

test('user can navigate to a topic and see breadcrumbs', function () {
    $user = User::factory()->create();
    $topic = Topic::factory()->create([
        'name' => 'German Grammar',
        'slug' => 'german-grammar',
    ]);

    $this->actingAs($user)
        ->visit('/dashboard')
        ->waitForText('German Grammar')
        ->click('German Grammar')
        ->waitForText('Vocabulary', 10000)
        ->assertPathIs("/topic/{$topic->slug}")
        ->assertSee('Dashboard');
});
