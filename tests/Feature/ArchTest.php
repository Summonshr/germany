<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

arch('globals')
    ->expect(['dd', 'dump', 'ray', 'var_dump', 'print_r'])
    ->not->toBeUsed();

arch('models')
    ->expect('App\Models')
    ->toBeClasses()
    ->toExtend(Model::class)
    ->toUseStrictTypes();

arch('controllers')
    ->expect('App\Http\Controllers')
    ->toBeClasses()
    ->toUseStrictTypes()
    ->ignoring('App\Http\Controllers\Controller');

arch('actions')
    ->expect('App\Actions')
    ->toBeClasses()
    ->toUseStrictTypes();

arch('data')
    ->expect('App\Data')
    ->toBeClasses()
    ->toUseStrictTypes();

arch('enums')
    ->expect('App\Enums')
    ->toBeEnums();
