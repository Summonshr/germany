<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TopicController extends Controller
{
    public function show(Request $request, Topic $topic): Response
    {
        return Inertia::render('topic', ['topic' => $topic->load(['vocabulary', 'sentences'])]);
    }
}
