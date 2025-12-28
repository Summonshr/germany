<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\QuizType;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Vocabulary extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'vocabulary';

    protected function casts(): array
    {
        return [
            'options_de' => 'array',
            'synonyms' => 'array',
            'type' => QuizType::class,
        ];
    }

    #[Scope]
    protected function words(Builder $query): void
    {
        $query->where('type', QuizType::Vocabulary);
    }

    #[Scope]
    protected function sentences(Builder $query): void
    {
        $query->where('type', QuizType::Sentence);
    }

    /**
     * @return array<string, mixed>
     */
    public function toQuizQuestion(int|string $userId): array
    {
        return [
            'user_id' => $userId,
            'question' => $this->text,
            'answer' => $this->text_de,
            'options' => Arr::shuffle($this->options_de),
            'hint' => $this->note,
        ];
    }
}
