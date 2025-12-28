<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\QuizType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;

class Quiz extends Model
{
    use HasFactory;
    use HasUuids;

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'topic_ids' => 'array',
            'question_ids' => 'array',
            'type' => QuizType::class,
            'finished_at' => 'datetime',
        ];
    }

    public function questions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class, 'quiz_uuid', 'uuid')->oldest('id');
    }

    public function isNotFinished(): bool
    {
        return $this->finished_at === null;
    }

    public function isFinished(): bool
    {
        return $this->finished_at !== null;
    }

    public function redirect(): RedirectResponse
    {
        if ($this->isFinished()) {
            return to_route('quiz.results', [
                'quiz' => $this->uuid,
            ]);
        }

        return to_route('quiz', [
            'quiz' => $this->uuid,
        ]);
    }
}
