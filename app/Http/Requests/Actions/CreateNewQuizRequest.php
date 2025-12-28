<?php

declare(strict_types=1);

namespace App\Http\Requests\Actions;

use App\Actions\CreateNewQuiz;
use App\Data\CreateNewQuizData;
use App\Enums\QuizType;
use Illuminate\Http\RedirectResponse;

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

    public function handle(): RedirectResponse
    {
        return app(CreateNewQuiz::class)->handle(new CreateNewQuizData(
            $this->user()->id,
            $this->input('topic_ids'),
            QuizType::from($this->input('type')),
        ))->redirect();
    }
}
