<?php

namespace App\Models;

use App\Models\Enums\QuizType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
