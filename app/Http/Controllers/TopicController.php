<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function show(Request $request, Topic $topic)
    {
        return Inertia::render('topic', ['topic' => $topic->load(['vocabulary', 'sentences'])]);
    }
}
