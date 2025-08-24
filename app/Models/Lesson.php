<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    use HasFactory;
    /**
     * Create a new Eloquent model instance.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function __construct(private readonly UrlGenerator $urlGenerator, array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function topic() {
        return $this->belongsTo(Topic::class);
    }

    public function vocabulary() {
        return $this->hasMany(Vocabulary::class);
    }

    public function exercises() {
        return $this->hasMany(Exercise::class);
    }

    public function nextLesson() {
        return $this->topic->lessons
        ->where('id', '>', $this->id)
        ->where('lesson_type', 'vocabulary')
        ->first()?->load('topic.level.language');
    }

    public function prevLesson() {
        return $this->topic->lessons
        ->where('lesson_type', 'vocabulary')
        ->where('id', '<', $this->id)
        ->last()?->load('topic.level.language');
    }

    protected function url(): Attribute {
        return Attribute::make(fn() => $this->urlGenerator->route('topic', [
            'language' => $this->topic->level->language->code,
            'level' => $this->topic->level->slug,
            'topic' => $this->topic->slug,
            'lesson' => $this->slug,
        ]));
    }
}
