<?php

use App\Models\User;

test('dashboard is accessible after login', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->visit('/dashboard')
        ->assertSee('Dashboard');
});
