<?php

declare(strict_types=1);

namespace App\Enums;

enum QuizType: string
{
    case Vocabulary = 'vocabulary';
    case Sentence = 'sentence';
}
