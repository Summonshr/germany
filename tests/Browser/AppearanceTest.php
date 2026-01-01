<?php

use App\Models\User;

test('user can access appearance settings', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->visit('/settings/appearance')
        ->assertSee('Appearance')
        ->assertSee("Update your account's appearance settings");
});
