<?php

use App\Models\User;

test('public profile is viewable by other users', function () {
    $user = User::factory()->create([
        'username' => 'profileuser',
        'bio' => 'My public bio.',
    ]);

    $viewer = User::factory()->create();

    $this->actingAs($viewer)
        ->visit("/profile/{$user->username}")
        ->assertSee($user->name)
        ->assertSee('@' . $user->username)
        ->assertSee('My public bio.');
});
