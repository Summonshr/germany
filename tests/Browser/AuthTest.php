<?php

test('welcome page has login link', function () {
    $this->visit('/')
        ->assertSee('Log in');
});

test('guests are redirected to login when accessing protected routes', function () {
    $this->visit('/dashboard')
        ->assertPathIsNot('/dashboard');
});

test('user can log out', function () {
    $user = \App\Models\User::factory()->create();

    $this->actingAs($user)
        ->visit('/dashboard')
        ->waitForText($user->name)
        ->click($user->name)
        ->waitForText('Log out')
        ->click('Log out')
        ->assertPathIs('/');
});
