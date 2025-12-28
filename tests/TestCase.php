<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    //

    public function postAction(string $action, array $data = [])
    {
        return $this->postJson(route('actions'), array_merge(['action' => $action], $data));
    }
}
