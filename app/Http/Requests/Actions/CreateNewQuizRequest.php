<?php

namespace App\Http\Requests\Actions;

use App\Actions\CreateNewQuiz;
use App\Data\CreateNewQuizData;
use App\Enums\QuizType;

class CreateNewQuizRequest extends ActionRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:vocabulary,sentence'],
            'topic_ids' => ['required', 'array'],
            'topic_ids.*' => ['integer', 'exists:topics,id'],
        ];
    }

    public function handle()
    {
        return app(CreateNewQuiz::class)->handle(new CreateNewQuizData(
            $this->user()->id,
            $this->input('topic_ids'),
            QuizType::from($this->input('type')),
        ))->redirect();
    }
}
