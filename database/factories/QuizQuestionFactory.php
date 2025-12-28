<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<QuizQuestion>
 */
class QuizQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $correctAnswer = fake()->word();

        return [
            'user_id' => User::factory(),
            'quiz_uuid' => Quiz::factory(),
            'question' => fake()->sentence(),
            'answer' => $correctAnswer,
            'given_answer' => null,
            'options' => [
                $correctAnswer,
                fake()->word(),
                fake()->word(),
                fake()->word(),
            ],
            'hint' => fake()->sentence(),
        ];
    }

    public function answered(): static
    {
        return $this->state(fn (array $attributes): array => [
            'given_answer' => $attributes['answer'],
        ]);
    }

    public function wrongAnswer(): static
    {
        return $this->state(fn (array $attributes): array => [
            'given_answer' => fake()->word(),
        ]);
    }
}
