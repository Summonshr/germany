<?php

test('welcome page has login and register links', function () {
    $this->visit('/')
        ->assertSee('Log in');
});
