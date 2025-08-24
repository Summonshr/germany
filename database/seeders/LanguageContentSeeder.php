<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Language;
use App\Models\Level;
use App\Models\Topic;
use App\Models\Lesson;
use App\Models\Vocabulary;
use App\Models\Exercise;

class LanguageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->truncateTables();

        $languages = $this->createLanguages();

        $levels = $this->createLevels($languages);

        $german = $languages->where('code', 'de')->first();
        $germanA1 = $levels->where('language_id', $german->id)->where('name', 'A1')->first();

        $topics = $this->createGermanA1Topics($germanA1);

        $lessons = $this->createLessonsForTopics($topics);

        $this->createVocabularyForLessons($lessons);

        $this->createExercisesForLessons($lessons);
    }

    /**
     * Truncate all related tables
     */
    private function truncateTables(): void
    {
        DB::table('languages')->truncate();
        DB::table('levels')->truncate();
        DB::table('topics')->truncate();
        DB::table('lessons')->truncate();
        DB::table('vocabulary')->truncate();
        DB::table('exercises')->truncate();
    }

    /**
     * Create languages
     */
    private function createLanguages()
    {
        $languages = [
            ['name' => 'German', 'code' => 'de'],
            ['name' => 'French', 'code' => 'fr'],
            ['name' => 'Spanish', 'code' => 'es'],
            ['name' => 'Italian', 'code' => 'it'],
        ];

        return collect($languages)->map(function ($lang) {
            return Language::create($lang);
        });
    }

    /**
     * Create levels for each language
     */
    private function createLevels($languages)
    {
        $levelNames = [
            ['name' => 'A1', 'description' => 'Beginner Level'],
            ['name' => 'A2', 'description' => 'Elementary Level'],
            ['name' => 'B1', 'description' => 'Intermediate Level'],
            ['name' => 'B2', 'description' => 'Upper Intermediate Level'],
        ];

        $levels = [];
        foreach ($languages as $language) {
            foreach ($levelNames as $level) {
                $levels[] = Level::create([
                    'language_id' => $language->id,
                    'name' => $level['name'],
                    'slug' => str()->slug($level['name']),
                    'description' => $level['description']
                ]);
            }
        }

        return collect($levels);
    }

    /**
     * Create topics for German A1
     */
    private function createGermanA1Topics($germanA1)
    {
        $germanTopics = [
            ['name' => 'Greetings', 'description' => 'Learn how to greet people'],
            ['name' => 'Family', 'description' => 'Family members and relationships'],
            ['name' => 'Numbers', 'description' => 'Numbers from 0 to 100'],
            ['name' => 'Colors', 'description' => 'Basic colors'],
            ['name' => 'Food & Drinks', 'description' => 'Common food and beverages'],
            ['name' => 'Time', 'description' => 'Telling time and days of the week'],
            ['name' => 'Body Parts', 'description' => 'Parts of the human body'],
            ['name' => 'Clothing', 'description' => 'Basic clothing items'],
            ['name' => 'House & Home', 'description' => 'Rooms and furniture'],
            ['name' => 'Transportation', 'description' => 'Vehicles and travel'],
        ];

        return collect($germanTopics)->map(function ($topicData) use ($germanA1) {
            return Topic::create([
                'level_id' => $germanA1->id,
                'name' => $topicData['name'],
                'slug' => str()->slug($topicData['name']),
                'description' => $topicData['description']
            ]);
        });
    }

    /**
     * Create lessons for each topic
     */
    private function createLessonsForTopics($topics)
    {
        $lessons = [];

        // Greetings Topic Lessons
        $greetingsLessons = [
            ['title' => 'Formal Greetings', 'lesson_type' => 'vocabulary'],
            ['title' => 'Informal Greetings', 'lesson_type' => 'vocabulary'],
            ['title' => 'Greetings Practice', 'lesson_type' => 'exercise'],
        ];

        foreach ($greetingsLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[0]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Family Topic Lessons
        $familyLessons = [
            ['title' => 'Family Members', 'lesson_type' => 'vocabulary'],
            ['title' => 'Family Relationships', 'lesson_type' => 'vocabulary'],
            ['title' => 'Family Exercise', 'lesson_type' => 'exercise'],
        ];

        foreach ($familyLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[1]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Numbers Topic Lessons
        $numbersLessons = [
            ['title' => 'Numbers 0-20', 'lesson_type' => 'vocabulary'],
            ['title' => 'Numbers 21-100', 'lesson_type' => 'vocabulary'],
            ['title' => 'Numbers Practice', 'lesson_type' => 'exercise'],
        ];

        foreach ($numbersLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[2]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Colors Topic Lessons
        $colorsLessons = [
            ['title' => 'Basic Colors', 'lesson_type' => 'vocabulary'],
            ['title' => 'Colors Practice', 'lesson_type' => 'exercise'],
        ];

        foreach ($colorsLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[3]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Food & Drinks Topic Lessons
        $foodLessons = [
            ['title' => 'Common Foods', 'lesson_type' => 'vocabulary'],
            ['title' => 'Beverages', 'lesson_type' => 'vocabulary'],
            ['title' => 'Food & Drinks Quiz', 'lesson_type' => 'exercise'],
        ];

        foreach ($foodLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[4]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Time Topic Lessons
        $timeLessons = [
            ['title' => 'Days of the Week', 'lesson_type' => 'vocabulary'],
            ['title' => 'Months', 'lesson_type' => 'vocabulary'],
            ['title' => 'Time Expressions', 'lesson_type' => 'vocabulary'],
            ['title' => 'Time Practice', 'lesson_type' => 'exercise'],
        ];

        foreach ($timeLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[5]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Body Parts Topic Lessons
        $bodyLessons = [
            ['title' => 'Basic Body Parts', 'lesson_type' => 'vocabulary'],
            ['title' => 'Body Parts Exercise', 'lesson_type' => 'exercise'],
        ];

        foreach ($bodyLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[6]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Clothing Topic Lessons
        $clothingLessons = [
            ['title' => 'Basic Clothing', 'lesson_type' => 'vocabulary'],
            ['title' => 'Clothing Exercise', 'lesson_type' => 'exercise'],
        ];

        foreach ($clothingLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[7]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // House & Home Topic Lessons
        $houseLessons = [
            ['title' => 'Rooms in the House', 'lesson_type' => 'vocabulary'],
            ['title' => 'Furniture', 'lesson_type' => 'vocabulary'],
            ['title' => 'House & Home Quiz', 'lesson_type' => 'exercise'],
        ];

        foreach ($houseLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[8]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        // Transportation Topic Lessons
        $transportLessons = [
            ['title' => 'Vehicles', 'lesson_type' => 'vocabulary'],
            ['title' => 'Transportation Exercise', 'lesson_type' => 'exercise'],
        ];

        foreach ($transportLessons as $lessonData) {
            $lessons[] = Lesson::create([
                'topic_id' => $topics[9]->id,
                'title' => $lessonData['title'],
                'slug' => str()->slug($lessonData['title']),
                'lesson_type' => $lessonData['lesson_type'],
            ]);
        }

        return collect($lessons);
    }

    /**
     * Create vocabulary entries for lessons
     */
    private function createVocabularyForLessons($lessons)
    {
        // Greetings Vocabulary
        $greetingsVocab = [
            ['word' => 'Guten Tag', 'translation' => 'Good day / Hello (formal)'],
            ['word' => 'Guten Morgen', 'translation' => 'Good morning'],
            ['word' => 'Guten Abend', 'translation' => 'Good evening'],
            ['word' => 'Auf Wiedersehen', 'translation' => 'Goodbye (formal)'],
            ['word' => 'Bis bald', 'translation' => 'See you soon'],
            ['word' => 'Hallo', 'translation' => 'Hello (informal)'],
            ['word' => 'Hi', 'translation' => 'Hi'],
            ['word' => 'Tschüss', 'translation' => 'Bye (informal)'],
            ['word' => 'Bis später', 'translation' => 'See you later'],
            ['word' => 'Wie geht es Ihnen?', 'translation' => 'How are you? (formal)'],
            ['word' => 'Wie geht\'s?', 'translation' => 'How are you? (informal)'],
            ['word' => 'Danke, gut', 'translation' => 'Thanks, good'],
        ];

        $greetingsVocabEntries = [];
        foreach ($greetingsVocab as $vocab) {
            $lessonId = $vocab['word'] === 'Hallo' || $vocab['word'] === 'Hi' ||
                       $vocab['word'] === 'Tschüss' || $vocab['word'] === 'Bis später' ||
                       $vocab['word'] === 'Wie geht\'s?' ? $lessons[1]->id : $lessons[0]->id;

            $greetingsVocabEntries[] = [
                'lesson_id' => $lessonId,
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($greetingsVocabEntries);

        // Family Vocabulary
        $familyVocab = [
            ['word' => 'die Familie', 'translation' => 'the family'],
            ['word' => 'der Vater', 'translation' => 'the father'],
            ['word' => 'die Mutter', 'translation' => 'the mother'],
            ['word' => 'der Sohn', 'translation' => 'the son'],
            ['word' => 'die Tochter', 'translation' => 'the daughter'],
            ['word' => 'der Bruder', 'translation' => 'the brother'],
            ['word' => 'die Schwester', 'translation' => 'the sister'],
            ['word' => 'der Großvater', 'translation' => 'the grandfather'],
            ['word' => 'die Großmutter', 'translation' => 'the grandmother'],
            ['word' => 'der Onkel', 'translation' => 'the uncle'],
            ['word' => 'die Tante', 'translation' => 'the aunt'],
            ['word' => 'der Cousin', 'translation' => 'the cousin (male)'],
            ['word' => 'die Cousine', 'translation' => 'the cousin (female)'],
            ['word' => 'die Eltern', 'translation' => 'the parents'],
            ['word' => 'die Großeltern', 'translation' => 'the grandparents'],
        ];

        $familyVocabEntries = [];
        foreach ($familyVocab as $vocab) {
            $familyVocabEntries[] = [
                'lesson_id' => $lessons[3]->id, // Family Members lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($familyVocabEntries);

        // Numbers Vocabulary
        $numbersVocab = [
            ['word' => 'null', 'translation' => 'zero'],
            ['word' => 'eins', 'translation' => 'one'],
            ['word' => 'zwei', 'translation' => 'two'],
            ['word' => 'drei', 'translation' => 'three'],
            ['word' => 'vier', 'translation' => 'four'],
            ['word' => 'fünf', 'translation' => 'five'],
            ['word' => 'sechs', 'translation' => 'six'],
            ['word' => 'sieben', 'translation' => 'seven'],
            ['word' => 'acht', 'translation' => 'eight'],
            ['word' => 'neun', 'translation' => 'nine'],
            ['word' => 'zehn', 'translation' => 'ten'],
            ['word' => 'elf', 'translation' => 'eleven'],
            ['word' => 'zwölf', 'translation' => 'twelve'],
            ['word' => 'dreizehn', 'translation' => 'thirteen'],
            ['word' => 'vierzehn', 'translation' => 'fourteen'],
            ['word' => 'fünfzehn', 'translation' => 'fifteen'],
            ['word' => 'sechzehn', 'translation' => 'sixteen'],
            ['word' => 'siebzehn', 'translation' => 'seventeen'],
            ['word' => 'achtzehn', 'translation' => 'eighteen'],
            ['word' => 'neunzehn', 'translation' => 'nineteen'],
            ['word' => 'zwanzig', 'translation' => 'twenty'],
            ['word' => 'dreißig', 'translation' => 'thirty'],
            ['word' => 'vierzig', 'translation' => 'forty'],
            ['word' => 'fünfzig', 'translation' => 'fifty'],
            ['word' => 'sechzig', 'translation' => 'sixty'],
            ['word' => 'siebzig', 'translation' => 'seventy'],
            ['word' => 'achtzig', 'translation' => 'eighty'],
            ['word' => 'neunzig', 'translation' => 'ninety'],
            ['word' => 'hundert', 'translation' => 'one hundred'],
        ];

        $numbersVocabEntries = [];
        foreach ($numbersVocab as $index => $vocab) {
            $lessonId = $index < 21 ? $lessons[6]->id : $lessons[7]->id; // 0-20 vs 21-100
            $numbersVocabEntries[] = [
                'lesson_id' => $lessonId,
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($numbersVocabEntries);

        // Colors Vocabulary
        $colorsVocab = [
            ['word' => 'rot', 'translation' => 'red'],
            ['word' => 'blau', 'translation' => 'blue'],
            ['word' => 'grün', 'translation' => 'green'],
            ['word' => 'gelb', 'translation' => 'yellow'],
            ['word' => 'schwarz', 'translation' => 'black'],
            ['word' => 'weiß', 'translation' => 'white'],
            ['word' => 'grau', 'translation' => 'gray'],
            ['word' => 'braun', 'translation' => 'brown'],
            ['word' => 'orange', 'translation' => 'orange'],
            ['word' => 'lila', 'translation' => 'purple'],
            ['word' => 'rosa', 'translation' => 'pink'],
            ['word' => 'türkis', 'translation' => 'turquoise'],
        ];

        $colorsVocabEntries = [];
        foreach ($colorsVocab as $vocab) {
            $colorsVocabEntries[] = [
                'lesson_id' => $lessons[9]->id, // Basic Colors lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($colorsVocabEntries);

        // Food & Drinks Vocabulary
        $foodVocab = [
            ['word' => 'das Brot', 'translation' => 'the bread'],
            ['word' => 'die Butter', 'translation' => 'the butter'],
            ['word' => 'der Käse', 'translation' => 'the cheese'],
            ['word' => 'das Fleisch', 'translation' => 'the meat'],
            ['word' => 'der Fisch', 'translation' => 'the fish'],
            ['word' => 'das Ei', 'translation' => 'the egg'],
            ['word' => 'die Milch', 'translation' => 'the milk'],
            ['word' => 'der Reis', 'translation' => 'the rice'],
            ['word' => 'die Nudeln', 'translation' => 'the noodles'],
            ['word' => 'der Apfel', 'translation' => 'the apple'],
            ['word' => 'die Banane', 'translation' => 'the banana'],
            ['word' => 'die Orange', 'translation' => 'the orange'],
            ['word' => 'die Kartoffel', 'translation' => 'the potato'],
            ['word' => 'die Tomate', 'translation' => 'the tomato'],
            ['word' => 'der Salat', 'translation' => 'the salad'],
        ];

        $drinksVocab = [
            ['word' => 'das Wasser', 'translation' => 'the water'],
            ['word' => 'der Kaffee', 'translation' => 'the coffee'],
            ['word' => 'der Tee', 'translation' => 'the tea'],
            ['word' => 'der Saft', 'translation' => 'the juice'],
            ['word' => 'das Bier', 'translation' => 'the beer'],
            ['word' => 'der Wein', 'translation' => 'the wine'],
            ['word' => 'die Limonade', 'translation' => 'the lemonade'],
            ['word' => 'die Cola', 'translation' => 'the cola'],
        ];

        $foodVocabEntries = [];
        foreach ($foodVocab as $vocab) {
            $foodVocabEntries[] = [
                'lesson_id' => $lessons[11]->id, // Common Foods lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($drinksVocab as $vocab) {
            $foodVocabEntries[] = [
                'lesson_id' => $lessons[12]->id, // Beverages lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($foodVocabEntries);

        // Time Vocabulary
        $daysVocab = [
            ['word' => 'Montag', 'translation' => 'Monday'],
            ['word' => 'Dienstag', 'translation' => 'Tuesday'],
            ['word' => 'Mittwoch', 'translation' => 'Wednesday'],
            ['word' => 'Donnerstag', 'translation' => 'Thursday'],
            ['word' => 'Freitag', 'translation' => 'Friday'],
            ['word' => 'Samstag', 'translation' => 'Saturday'],
            ['word' => 'Sonntag', 'translation' => 'Sunday'],
        ];

        $monthsVocab = [
            ['word' => 'Januar', 'translation' => 'January'],
            ['word' => 'Februar', 'translation' => 'February'],
            ['word' => 'März', 'translation' => 'March'],
            ['word' => 'April', 'translation' => 'April'],
            ['word' => 'Mai', 'translation' => 'May'],
            ['word' => 'Juni', 'translation' => 'June'],
            ['word' => 'Juli', 'translation' => 'July'],
            ['word' => 'August', 'translation' => 'August'],
            ['word' => 'September', 'translation' => 'September'],
            ['word' => 'Oktober', 'translation' => 'October'],
            ['word' => 'November', 'translation' => 'November'],
            ['word' => 'Dezember', 'translation' => 'December'],
        ];

        $timeVocab = [
            ['word' => 'die Zeit', 'translation' => 'the time'],
            ['word' => 'die Uhr', 'translation' => 'the clock/watch'],
            ['word' => 'heute', 'translation' => 'today'],
            ['word' => 'gestern', 'translation' => 'yesterday'],
            ['word' => 'morgen', 'translation' => 'tomorrow'],
            ['word' => 'jetzt', 'translation' => 'now'],
            ['word' => 'früh', 'translation' => 'early'],
            ['word' => 'spät', 'translation' => 'late'],
        ];

        $timeVocabEntries = [];
        foreach ($daysVocab as $vocab) {
            $timeVocabEntries[] = [
                'lesson_id' => $lessons[14]->id, // Days lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($monthsVocab as $vocab) {
            $timeVocabEntries[] = [
                'lesson_id' => $lessons[15]->id, // Months lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($timeVocab as $vocab) {
            $timeVocabEntries[] = [
                'lesson_id' => $lessons[16]->id, // Time Expressions lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($timeVocabEntries);

        // Body Parts Vocabulary
        $bodyVocab = [
            ['word' => 'der Kopf', 'translation' => 'the head'],
            ['word' => 'das Gesicht', 'translation' => 'the face'],
            ['word' => 'die Augen', 'translation' => 'the eyes'],
            ['word' => 'die Nase', 'translation' => 'the nose'],
            ['word' => 'der Mund', 'translation' => 'the mouth'],
            ['word' => 'die Ohren', 'translation' => 'the ears'],
            ['word' => 'die Haare', 'translation' => 'the hair'],
            ['word' => 'der Hals', 'translation' => 'the neck'],
            ['word' => 'die Schulter', 'translation' => 'the shoulder'],
            ['word' => 'der Arm', 'translation' => 'the arm'],
            ['word' => 'die Hand', 'translation' => 'the hand'],
            ['word' => 'der Finger', 'translation' => 'the finger'],
            ['word' => 'die Brust', 'translation' => 'the chest'],
            ['word' => 'der Bauch', 'translation' => 'the stomach'],
            ['word' => 'das Bein', 'translation' => 'the leg'],
            ['word' => 'der Fuß', 'translation' => 'the foot'],
        ];

        $bodyVocabEntries = [];
        foreach ($bodyVocab as $vocab) {
            $bodyVocabEntries[] = [
                'lesson_id' => $lessons[18]->id, // Basic Body Parts lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($bodyVocabEntries);

        // Clothing Vocabulary
        $clothingVocab = [
            ['word' => 'das T-Shirt', 'translation' => 'the t-shirt'],
            ['word' => 'das Hemd', 'translation' => 'the shirt'],
            ['word' => 'die Hose', 'translation' => 'the pants'],
            ['word' => 'die Jeans', 'translation' => 'the jeans'],
            ['word' => 'das Kleid', 'translation' => 'the dress'],
            ['word' => 'der Rock', 'translation' => 'the skirt'],
            ['word' => 'die Jacke', 'translation' => 'the jacket'],
            ['word' => 'der Mantel', 'translation' => 'the coat'],
            ['word' => 'die Schuhe', 'translation' => 'the shoes'],
            ['word' => 'die Socken', 'translation' => 'the socks'],
            ['word' => 'der Hut', 'translation' => 'the hat'],
            ['word' => 'die Mütze', 'translation' => 'the cap'],
        ];

        $clothingVocabEntries = [];
        foreach ($clothingVocab as $vocab) {
            $clothingVocabEntries[] = [
                'lesson_id' => $lessons[20]->id, // Basic Clothing lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($clothingVocabEntries);

        // House & Home Vocabulary
        $roomsVocab = [
            ['word' => 'das Haus', 'translation' => 'the house'],
            ['word' => 'die Wohnung', 'translation' => 'the apartment'],
            ['word' => 'das Wohnzimmer', 'translation' => 'the living room'],
            ['word' => 'das Schlafzimmer', 'translation' => 'the bedroom'],
            ['word' => 'die Küche', 'translation' => 'the kitchen'],
            ['word' => 'das Badezimmer', 'translation' => 'the bathroom'],
            ['word' => 'der Garten', 'translation' => 'the garden'],
            ['word' => 'der Balkon', 'translation' => 'the balcony'],
        ];

        $furnitureVocab = [
            ['word' => 'das Sofa', 'translation' => 'the sofa'],
            ['word' => 'der Stuhl', 'translation' => 'the chair'],
            ['word' => 'der Tisch', 'translation' => 'the table'],
            ['word' => 'das Bett', 'translation' => 'the bed'],
            ['word' => 'der Schrank', 'translation' => 'the wardrobe'],
            ['word' => 'der Fernseher', 'translation' => 'the television'],
            ['word' => 'der Kühlschrank', 'translation' => 'the refrigerator'],
            ['word' => 'der Herd', 'translation' => 'the stove'],
        ];

        $houseVocabEntries = [];
        foreach ($roomsVocab as $vocab) {
            $houseVocabEntries[] = [
                'lesson_id' => $lessons[22]->id, // Rooms lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($furnitureVocab as $vocab) {
            $houseVocabEntries[] = [
                'lesson_id' => $lessons[23]->id, // Furniture lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($houseVocabEntries);

        // Transportation Vocabulary
        $transportVocab = [
            ['word' => 'das Auto', 'translation' => 'the car'],
            ['word' => 'der Bus', 'translation' => 'the bus'],
            ['word' => 'der Zug', 'translation' => 'the train'],
            ['word' => 'das Flugzeug', 'translation' => 'the airplane'],
            ['word' => 'das Fahrrad', 'translation' => 'the bicycle'],
            ['word' => 'das Motorrad', 'translation' => 'the motorcycle'],
            ['word' => 'das Taxi', 'translation' => 'the taxi'],
            ['word' => 'die U-Bahn', 'translation' => 'the subway'],
            ['word' => 'das Schiff', 'translation' => 'the ship'],
            ['word' => 'der Bahnhof', 'translation' => 'the train station'],
            ['word' => 'der Flughafen', 'translation' => 'the airport'],
        ];

        $transportVocabEntries = [];
        foreach ($transportVocab as $vocab) {
            $transportVocabEntries[] = [
                'lesson_id' => $lessons[25]->id, // Vehicles lesson
                'word' => $vocab['word'],
                'translation' => $vocab['translation'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vocabulary::insert($transportVocabEntries);
    }

    /**
     * Create exercises for lessons
     */
    private function createExercisesForLessons($lessons)
    {
        // Multiple choice exercises
        $exercises = [
            [
                'lesson_id' => $lessons[2]->id, // Greetings Practice
                'type' => 'multiple_choice',
                'question' => 'How do you say "Good morning" in German?',
                'options' => json_encode(['Guten Tag', 'Guten Morgen', 'Guten Abend', 'Gute Nacht']),
                'correct_answer' => 'Guten Morgen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[2]->id,
                'type' => 'multiple_choice',
                'question' => 'What is the informal way to say "goodbye"?',
                'options' => json_encode(['Auf Wiedersehen', 'Tschüss', 'Bis bald', 'Guten Tag']),
                'correct_answer' => 'Tschüss',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[2]->id,
                'type' => 'multiple_choice',
                'question' => 'Which greeting is used in the evening?',
                'options' => json_encode(['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht']),
                'correct_answer' => 'Guten Abend',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[5]->id, // Family Exercise
                'type' => 'multiple_choice',
                'question' => 'How do you say "mother" in German?',
                'options' => json_encode(['der Vater', 'die Mutter', 'die Schwester', 'die Tochter']),
                'correct_answer' => 'die Mutter',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[5]->id,
                'type' => 'multiple_choice',
                'question' => 'What is "die Großeltern"?',
                'options' => json_encode(['parents', 'grandparents', 'children', 'siblings']),
                'correct_answer' => 'grandparents',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[8]->id, // Numbers Practice
                'type' => 'multiple_choice',
                'question' => 'What number is "fünfzehn"?',
                'options' => json_encode(['5', '15', '50', '25']),
                'correct_answer' => '15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[8]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "thirty" in German?',
                'options' => json_encode(['dreizehn', 'dreißig', 'drei', 'zwanzig']),
                'correct_answer' => 'dreißig',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[10]->id, // Colors Practice
                'type' => 'multiple_choice',
                'question' => 'What color is "grün"?',
                'options' => json_encode(['red', 'blue', 'green', 'yellow']),
                'correct_answer' => 'green',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[10]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "black" in German?',
                'options' => json_encode(['weiß', 'grau', 'schwarz', 'braun']),
                'correct_answer' => 'schwarz',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[13]->id, // Food & Drinks Quiz
                'type' => 'multiple_choice',
                'question' => 'What is "das Wasser"?',
                'options' => json_encode(['wine', 'water', 'coffee', 'tea']),
                'correct_answer' => 'water',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[13]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "apple" in German?',
                'options' => json_encode(['die Banane', 'der Apfel', 'die Orange', 'die Tomate']),
                'correct_answer' => 'der Apfel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[17]->id, // Time Practice
                'type' => 'multiple_choice',
                'question' => 'Which day comes after "Montag"?',
                'options' => json_encode(['Sonntag', 'Dienstag', 'Mittwoch', 'Freitag']),
                'correct_answer' => 'Dienstag',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[17]->id,
                'type' => 'multiple_choice',
                'question' => 'What month is "März"?',
                'options' => json_encode(['February', 'March', 'April', 'May']),
                'correct_answer' => 'March',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[19]->id, // Body Parts Exercise
                'type' => 'multiple_choice',
                'question' => 'What is "der Kopf"?',
                'options' => json_encode(['hand', 'foot', 'head', 'arm']),
                'correct_answer' => 'head',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[19]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "eyes" in German?',
                'options' => json_encode(['die Ohren', 'die Augen', 'die Nase', 'der Mund']),
                'correct_answer' => 'die Augen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[21]->id, // Clothing Exercise
                'type' => 'multiple_choice',
                'question' => 'What is "die Schuhe"?',
                'options' => json_encode(['socks', 'shoes', 'shirt', 'pants']),
                'correct_answer' => 'shoes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[21]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "dress" in German?',
                'options' => json_encode(['die Hose', 'der Rock', 'das Kleid', 'die Jacke']),
                'correct_answer' => 'das Kleid',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[24]->id, // House & Home Quiz
                'type' => 'multiple_choice',
                'question' => 'What is "die Küche"?',
                'options' => json_encode(['bedroom', 'bathroom', 'kitchen', 'living room']),
                'correct_answer' => 'kitchen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[24]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "bed" in German?',
                'options' => json_encode(['der Stuhl', 'der Tisch', 'das Sofa', 'das Bett']),
                'correct_answer' => 'das Bett',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[26]->id, // Transportation Exercise
                'type' => 'multiple_choice',
                'question' => 'What is "das Auto"?',
                'options' => json_encode(['bus', 'car', 'train', 'bicycle']),
                'correct_answer' => 'car',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[26]->id,
                'type' => 'multiple_choice',
                'question' => 'How do you say "airplane" in German?',
                'options' => json_encode(['der Zug', 'das Flugzeug', 'das Schiff', 'der Bus']),
                'correct_answer' => 'das Flugzeug',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Exercise::insert($exercises);

        // Fill-in-the-blank and translation exercises
        $additionalExercises = [
            [
                'lesson_id' => $lessons[2]->id,
                'type' => 'fill_in_blank',
                'question' => 'Complete: "Guten ___" (Good day)',
                'options' => json_encode([]),
                'correct_answer' => 'Tag',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[5]->id,
                'type' => 'fill_in_blank',
                'question' => 'Translate: "der Bruder"',
                'options' => json_encode([]),
                'correct_answer' => 'the brother',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[8]->id,
                'type' => 'fill_in_blank',
                'question' => 'Write the German word for "twenty": ___',
                'options' => json_encode([]),
                'correct_answer' => 'zwanzig',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[10]->id,
                'type' => 'fill_in_blank',
                'question' => 'Translate: "rot"',
                'options' => json_encode([]),
                'correct_answer' => 'red',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lesson_id' => $lessons[13]->id,
                'type' => 'fill_in_blank',
                'question' => 'Complete: "der ___" (the coffee)',
                'options' => json_encode([]),
                'correct_answer' => 'Kaffee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Exercise::insert($additionalExercises);
    }
}
