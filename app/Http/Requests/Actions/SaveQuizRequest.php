<?php

namespace App\Http\Requests\Actions;

use App\Actions\SaveQuiz;
use App\Data\SaveQuizData;
use App\Data\SelectedAnswerData;
use App\Models\Quiz;
use Spatie\LaravelData\DataCollection;

class SaveQuizRequest extends ActionRequest
{
    public function authorize(): bool
    {
        return $this->user()->id === Quiz::query()->where('uuid', $this->input('data.quiz'))->firstOrFail()->user_id;
    }

    public function rules(): array
    {
        return [
            'data.quiz' => ['required', 'uuid'],
            'data.current_question' => ['required', 'integer'],
            'data.selected_answers' => ['required', 'array'],
            'data.selected_answers.*.question_id' => ['required', 'integer'],
            'data.selected_answers.*.answer' => ['required', 'string'],
        ];
    }

    public function handle(): void
    {
        app(SaveQuiz::class)->handle(new SaveQuizData(
            quiz: $this->input('data.quiz'),
            current_question: $this->input('data.current_question'),
            selected_answers: new DataCollection(
                SelectedAnswerData::class,
                $this->input('data.selected_answers'),
            ),
        ));
    }
}
