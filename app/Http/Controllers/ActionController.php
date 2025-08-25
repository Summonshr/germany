<?php

namespace App\Http\Controllers;

use App\Actions\FinishQuiz;
use App\Actions\SaveQuiz;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function __invoke(Request $request): void
    {
        match ($request->get('type')) {
            'save-quiz' => app()->make(SaveQuiz::class)->handle($request->input('data')),
            'finish-quiz' => app()->make(FinishQuiz::class)->handle($request->input('data')),
            default => throw new \Exception('Invalid action type')
        };
    }
}
