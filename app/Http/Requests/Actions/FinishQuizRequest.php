<?php

namespace App\Http\Requests\Actions;

use App\Actions\FinishQuiz;
use App\Data\FinishQuizData;
use App\Data\SelectedAnswerData;
use App\Models\Quiz;
use Spatie\LaravelData\DataCollection;

class FinishQuizRequest extends ActionRequest
{
    public function authorize(): bool
    {
        return $this->user()->id === Quiz::query()->where('uuid', $this->input('quiz'))->firstOrFail()->user_id;
    }

    public function rules(): array
    {
        return [
            'quiz' => ['required', 'uuid'],
            'current_question' => ['required', 'integer'],
            'selected_answers' => ['required', 'array'],
            'selected_answers.*.question_id' => ['required', 'integer'],
            'selected_answers.*.answer' => ['required', 'string'],
        ];
    }

    public function handle()
    {
        return app(FinishQuiz::class)->handle(new FinishQuizData(
            quiz: $this->input('quiz'),
            current_question: $this->input('current_question'),
            selected_answers: new DataCollection(
                SelectedAnswerData::class,
                $this->input('selected_answers'),
            ),
        ))->redirect();
    }
}
