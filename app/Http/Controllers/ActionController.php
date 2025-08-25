<?php

namespace App\Http\Controllers;

use App\Actions\FinishQuiz;
use App\Actions\SaveQuiz;
use App\Data\FinishQuizData;
use App\Data\SaveQuizData;
use App\Data\SelectedAnswerData;
use Illuminate\Http\Request;
use Spatie\LaravelData\DataCollection;

class ActionController extends Controller
{
    public function __invoke(Request $request): void
    {
        match ($request->get('type')) {
            'save-quiz' => app()->make(SaveQuiz::class)->handle(new SaveQuizData(
                quiz: $request->input('data.quiz'),
                current_question: $request->input('data.current_question'),
                selected_answers: new DataCollection(
                    SelectedAnswerData::class,
                    $request->input('data.selected_answers'),
                ),
            )),
            'finish-quiz' => app()->make(FinishQuiz::class)->handle(new FinishQuizData(
                quiz: $request->input('data.quiz'),
                current_question: $request->input('data.current_question'),
                selected_answers: new DataCollection(
                    SelectedAnswerData::class,
                    $request->input('data.selected_answers'),
                ),
            )),
            default => throw new \Exception('Invalid action type')
        };
    }
}
