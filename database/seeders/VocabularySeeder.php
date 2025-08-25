<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Topic;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\File;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::each($this->seedVocabulary(...));
    }

    public function seedVocabulary(Topic $topic)
    {
        $file = public_path('vocabulary/' . str($topic->name)->slug() . '.json');

        if (! File::exists($file)) {
            return;
        }

        $content = collect(File::json($file));

        $content->each(function ($word) use ($topic) {
            Vocabulary::create([
                'topic_id' => $topic->id,
                'text' => $word['text'],
                'text_de' => $word['text_de'],
                'type' => $word['type'] ?? null,
                'options_de' => $word['options_de'] ?? [],
                'synonyms' => $word['synonyms'] ?? '[]',
                'description' => $word['description'] ?? '-',
                'description_de' => $word['description_de'] ?? '-',
                'note' => $word['note'] ?? '-',
                'note_de' => $word['note_de'] ?? '-',
                'culture' => $word['culture'] ?? '-',
                'culture_de' => $word['culture_de'] ?? '-',
            ]);
        });
    }
}
