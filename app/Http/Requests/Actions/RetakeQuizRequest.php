<?php

declare(strict_types=1);

namespace App\Http\Requests\Actions;

use App\Actions\CreateNewQuiz;
use App\Data\CreateNewQuizData;
use App\Models\Quiz;
use Illuminate\Http\RedirectResponse;

class RetakeQuizRequest extends ActionRequest
{
    public Quiz $quiz;

    public function authorize(): bool
    {
        $this->quiz = Quiz::with('questions')->where('uuid', $this->input('quiz'))->firstOrFail();

        return $this->quiz->user_id === $this->user()->id;
    }

    public function rules(): array
    {
        return [];
    }

    public function handle(): RedirectResponse
    {
        $quiz = app(CreateNewQuiz::class)->handle(new CreateNewQuizData(
            $this->user()->id,
            $this->quiz->topic_ids,
            $this->quiz->type,
        ));

        return to_route('quiz', [
            'quiz' => $quiz->uuid,
        ]);
    }
}
