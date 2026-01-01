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

test('profile update validates required fields', function () {
    $user = User::factory()->create();

    $page = $this->actingAs($user)
        ->visit('/settings/profile')
        ->waitForText('Profile information');

    $page->script("document.getElementById('name').removeAttribute('required')");

    $page->fill('name', '')
        ->click('Save')
        ->waitForText('The name field is required.');
});

test('profile update validates unique username', function () {
    User::factory()->create(['username' => 'existinguser']);
    $user = User::factory()->create(['username' => 'newuser']);

    $this->actingAs($user)
        ->visit('/settings/profile')
        ->waitForText('Profile information')
        ->fill('username', 'existinguser')
        ->click('Save')
        ->waitForText('The username has already been taken.');
});
