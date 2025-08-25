<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    public function vocabulary() {
        return $this->hasMany(Vocabulary::class);
    }

    public function randomVocabulary() {
        return $this->vocabulary()->words()->inRandomOrder()->take(10);
    }
}
