<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard', [
            'topics' => Topic::query()->withCount(['vocabulary', 'sentences'])->get(),
        ]);
    }
}
