<?php

declare(strict_types=1);

namespace App\Data;

use App\Enums\QuizType;
use Spatie\LaravelData\Data;

class CreateNewQuizData extends Data
{
    public function __construct(
        public int $user_id,
        /** @var int[] */
        public array $topic_ids,
        public QuizType $type,
        public bool $hard = false,
    ) {}
}
