<?php

namespace Database\Factories;

use App\Enums\QuizType;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'current_question' => 0,
            'user_id' => User::factory(),
            'topic_ids' => [1, 2],
            'score' => -1,
            'type' => QuizType::Vocabulary,
            'finished_at' => null,
        ];
    }

    public function finished(): static
    {
        return $this->state(fn (array $attributes): array => [
            'finished_at' => now(),
            'score' => fake()->numberBetween(0, 100),
        ]);
    }

    public function sentence(): static
    {
        return $this->state(fn (array $attributes): array => [
            'type' => QuizType::Sentence,
        ]);
    }
}
