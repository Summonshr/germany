<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SelectedAnswerData extends Data
{
    public function __construct(
        public int $question_id,
        public string $answer,
    ) {}
}
