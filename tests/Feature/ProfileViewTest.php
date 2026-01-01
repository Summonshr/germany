<?php

use App\Models\User;

test('public profile page can be viewed', function (): void {
    $user = User::factory()->create([
        'username' => 'testuser',
        'bio' => 'This is my bio.',
    ]);

    $response = $this
        ->actingAs($user)
        ->get("/profile/{$user->username}");

    $response->assertOk();
    $response->assertSee($user->name);
    $response->assertSee($user->username);
    $response->assertSee($user->bio);
});

test('public profile page returns 404 for non-existent user', function (): void {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/profile/nonexistentuser');

    $response->assertNotFound();
});
