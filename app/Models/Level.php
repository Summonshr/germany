<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    public function topics() {
        return $this->hasMany(Topic::class);
    }

    public function language() {
        return $this->belongsTo(Language::class);
    }
}
