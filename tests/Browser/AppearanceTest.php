<?php

use App\Models\User;

test('user can switch to dark mode', function () {
    $user = User::factory()->create();

    $page = $this->actingAs($user)
        ->visit('/settings/appearance')
        ->waitForText('Appearance')
        ->click('Dark');

    expect($page->script("document.documentElement.classList.contains('dark')"))->toBeTrue();
});
