<?php

namespace App\Http\Requests\Actions;

use App\Actions\CreateNewQuiz;
use App\Data\CreateNewQuizData;
use App\Models\Enums\QuizType;

class CreateNewQuizRequest extends ActionRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'data.type' => ['required', 'in:vocabulary,sentence'],
            'data.topic_ids' => ['required', 'array'],
            'data.topic_ids.*' => ['integer', 'exists:topics,id'],
        ];
    }

    public function handle()
    {
        return app(CreateNewQuiz::class)->handle(new CreateNewQuizData(
            $this->user()->id,
            $this->input('data.topic_ids'),
            QuizType::from($this->input('data.type')),
        ))->redirect();
    }
}
