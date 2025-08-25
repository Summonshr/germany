<?php

namespace App\Models\Enums;

enum QuizType: string
{
    case Vocabulary = 'vocabulary';
    case Sentence = 'sentence';
}
