<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    public function lessons()
    {
        return $this->hasMany(Lesson::class)->where('lesson_type', 'vocabulary');
    }

    public function exercise()
    {
        return $this->hasMany(Lesson::class)->where('lesson_type', 'exercise');
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
