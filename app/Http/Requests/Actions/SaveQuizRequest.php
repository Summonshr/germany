<?php

declare(strict_types=1);

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
        $quiz = Quiz::query()->where('uuid', $this->input('quiz'))->firstOrFail();

        return $this->user()->can('update', $quiz);
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

    public function handle(): mixed
    {
        app(SaveQuiz::class)->handle(new SaveQuizData(
            quiz: $this->input('quiz'),
            current_question: $this->input('current_question'),
            selected_answers: new DataCollection(
                SelectedAnswerData::class,
                $this->input('selected_answers'),
            ),
        ));

        return null;
    }
}
