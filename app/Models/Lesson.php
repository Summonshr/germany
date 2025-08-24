<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    public function topic() {
        return $this->belongsTo(Topic::class);
    }

    public function vocabulary() {
        return $this->hasMany(Vocabulary::class);
    }

    public function exercises() {
        return $this->hasMany(Exercise::class);
    }
}
