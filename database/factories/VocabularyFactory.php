<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\Vocabulary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vocabulary>
 */
class VocabularyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'topic_id' => Topic::factory(),
            'type' => 'vocabulary',
            'text' => fake()->word(),
            'text_de' => fake()->word(),
            'synonyms' => json_encode([]),
            'description' => fake()->sentence(),
            'description_de' => fake()->sentence(),
            'note' => fake()->sentence(),
            'note_de' => fake()->sentence(),
            'culture' => null,
            'culture_de' => null,
            'options_de' => [
                fake()->word(),
                fake()->word(),
                fake()->word(),
                fake()->word(),
            ],
        ];
    }

    public function sentence(): static
    {
        return $this->state(fn (array $attributes): array => [
            'type' => 'sentence',
            'text' => fake()->sentence(),
            'text_de' => fake()->sentence(),
        ]);
    }
}
