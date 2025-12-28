<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Topic>
 */
class TopicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(2, true);

        return [
            'name' => ucfirst($name),
            'name_de' => ucfirst(fake()->words(2, true)),
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'description_de' => fake()->sentence(),
        ];
    }
}
