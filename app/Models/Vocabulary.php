<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
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

    #[Scope]
    protected function words($query)
    {
        return $query->where('type', 'vocabulary');
    }

    #[Scope]
    protected function sentences($query)
    {
        return $query->where('type', 'sentence');
    }

    public function toQuizQuestion($userId): array
    {
        return [
            'user_id' => $userId,
            'question' => $this->text,
            'answer' => $this->text_de,
            'options' => $this->options_de,
            'hint' => $this->note,
        ];
    }
}
