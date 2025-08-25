<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'vocabulary';

    public $casts = [
        'options_de' => 'array',
    ];

    public function scopeWords($query) {
        return $query->where('type', 'vocabulary');
    }

    public function scopeSentences($query) {
        return $query->where('type', 'sentence');
    }

    public function toQuizQuestion($quizUuid, $userId) {
        return [
            'user_id' => $userId,
            'quiz_uuid' => $quizUuid,
            'question' => $this->text,
            'answer' => $this->text_de,
            'options' => $this->options_de,
            'hint' => $this->note,
        ];
    }
}
