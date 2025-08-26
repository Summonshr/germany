<?php

namespace App\Models;

use App\Models\Enums\QuizType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;

class Quiz extends Model
{
    use HasFactory;
    use HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    public $casts = [
        'topic_ids' => 'array',
        'question_ids' => 'array',
        'type' => QuizType::class,
    ];

    public $primaryKey = 'uuid';

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class)->oldest('id');
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
