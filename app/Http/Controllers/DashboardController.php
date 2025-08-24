<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $language = $request->user()->language()->with('levels.topics.lessons')->first();

        return Inertia::render('dashboard', [
            'language' => $language,
        ]);
    }
}
