<?php

test('basic browser test', function () {
    $this->visit('/')
        ->assertSee('Laravel');
});
