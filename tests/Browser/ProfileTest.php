<?php

use App\Models\User;

test('user can update their profile information via browser', function () {
    $user = User::factory()->create([
        'username' => 'testuser',
    ]);

    $this->actingAs($user)
        ->visit('/settings/profile')
        ->assertSee('Profile information')
        ->fill('name', 'Updated Browser Name')
        ->fill('username', 'browseruser')
        ->fill('bio', 'Bio updated via browser test.')
        ->click('Save')
        ->assertSee('Saved');

    $user->refresh();
    expect($user->name)->toBe('Updated Browser Name');
    expect($user->username)->toBe('browseruser');
    expect($user->bio)->toBe('Bio updated via browser test.');
});
