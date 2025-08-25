<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $casts = [
        'options' => 'array',
    ];

    public $timestamps = false;
}
