<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Topic;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function index(Language $language)
    {
        return Inertia::render('language', [
            'language' => $language->load('levels.topics.lessons'),
        ]);
    }

    public function topic(Language $language, Level $level, Topic $topic, Lesson $lesson)
    {
        return Inertia::render('language', [
            'language' => $language,
            'level' => $level,
            'lesson' => $lesson->load('vocabulary'),
            'nextLessonUrl' => $lesson->nextLesson()?->url,
            'previousLessonUrl' => $lesson->prevLesson()?->url,
            'topic' => $topic,
        ]);
    }
}
