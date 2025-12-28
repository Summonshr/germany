<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Topic extends Model
{
    use HasFactory;

    public function vocabulary(): HasMany
    {
        return $this->hasMany(Vocabulary::class)->words();
    }

    public function sentences(): HasMany
    {
        return $this->hasMany(Vocabulary::class)->sentences();
    }

    public function randomVocabulary(): HasMany
    {
        return $this->vocabulary()->inRandomOrder()->take(10);
    }
}
