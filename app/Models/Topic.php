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
        /** @var HasMany $query */
        $query = $this->hasMany(Vocabulary::class);

        return $query->words();
    }

    public function sentences(): HasMany
    {
        /** @var HasMany $query */
        $query = $this->hasMany(Vocabulary::class);

        return $query->sentences();
    }

    public function randomVocabulary(): HasMany
    {
        /** @var HasMany $query */
        $query = $this->vocabulary();

        return $query->words()->inRandomOrder()->take(10);
    }
}
