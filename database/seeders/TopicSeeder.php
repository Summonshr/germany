<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run()
    {
        $topicsData = $topicsData = [
            [
                'name' => 'Greetings',
                'name_de' => 'Begrüßungen',
                'description' => 'Learn how to greet people',
                'description_de' => 'Lerne, wie man Menschen begrüßt',
            ],
            [
                'name' => 'Family',
                'name_de' => 'Familie',
                'description' => 'Family members and relationships',
                'description_de' => 'Familienmitglieder und Beziehungen',
            ],
            [
                'name' => 'Numbers',
                'name_de' => 'Zahlen',
                'description' => 'Numbers from 0 to 100',
                'description_de' => 'Zahlen von 0 bis 100',
            ],
            [
                'name' => 'Colors',
                'name_de' => 'Farben',
                'description' => 'Basic colors',
                'description_de' => 'Grundfarben',
            ],
            [
                'name' => 'Food & Drinks',
                'name_de' => 'Essen & Getränke',
                'description' => 'Common food and beverages',
                'description_de' => 'Häufige Lebensmittel und Getränke',
            ],
            [
                'name' => 'Time',
                'name_de' => 'Zeit',
                'description' => 'Telling time and days of the week',
                'description_de' => 'Uhrzeit und Wochentage angeben',
            ],
            [
                'name' => 'Body Parts',
                'name_de' => 'Körperteile',
                'description' => 'Parts of the human body',
                'description_de' => 'Teile des menschlichen Körpers',
            ],
            [
                'name' => 'Clothing',
                'name_de' => 'Kleidung',
                'description' => 'Basic clothing items',
                'description_de' => 'Grundlegende Kleidungsstücke',
            ],
            [
                'name' => 'House & Home',
                'name_de' => 'Haus & Zuhause',
                'description' => 'Rooms and furniture',
                'description_de' => 'Räume und Möbel',
            ],
            [
                'name' => 'Transportation',
                'name_de' => 'Verkehrsmittel',
                'description' => 'Vehicles and travel',
                'description_de' => 'Fahrzeuge und Reisen',
            ],
            [
                'name' => 'Daily Routine',
                'name_de' => 'Tagesablauf',
                'description' => 'Talking about daily activities',
                'description_de' => 'Über tägliche Aktivitäten sprechen',
            ],
            [
                'name' => 'Shopping',
                'name_de' => 'Einkaufen',
                'description' => 'Buying things and asking for prices',
                'description_de' => 'Einkaufen und nach Preisen fragen',
            ],
            [
                'name' => 'Health',
                'name_de' => 'Gesundheit',
                'description' => 'Talking about illnesses and doctor visits',
                'description_de' => 'Über Krankheiten und Arztbesuche sprechen',
            ],
            [
                'name' => 'Work & Profession',
                'name_de' => 'Arbeit & Beruf',
                'description' => 'Discussing jobs and careers',
                'description_de' => 'Über Berufe und Karrieren sprechen',
            ],
            [
                'name' => 'Travel',
                'name_de' => 'Reisen',
                'description' => 'Planning trips and asking for directions',
                'description_de' => 'Reisen planen und nach dem Weg fragen',
            ],
            [
                'name' => 'Hobbies',
                'name_de' => 'Hobbys',
                'description' => 'Talking about leisure activities',
                'description_de' => 'Über Freizeitaktivitäten sprechen',
            ],
            [
                'name' => 'Education',
                'name_de' => 'Bildung',
                'description' => 'School and university life',
                'description_de' => 'Schul- und Universitätsleben',
            ],
            [
                'name' => 'Weather',
                'name_de' => 'Wetter',
                'description' => 'Describing weather conditions',
                'description_de' => 'Wetterbedingungen beschreiben',
            ],
            [
                'name' => 'Bank & Money',
                'name_de' => 'Bank & Geld',
                'description' => 'Handling finances',
                'description_de' => 'Finanzen verwalten',
            ],
            [
                'name' => 'Technology',
                'name_de' => 'Technologie',
                'description' => 'Basic technology terms',
                'description_de' => 'Grundlegende Technologiebereiche',
            ],
            [
                'name' => 'Opinions & Discussions',
                'name_de' => 'Meinungen & Diskussionen',
                'description' => 'Expressing views and debating',
                'description_de' => 'Meinungen äußern und diskutieren',
            ],
            [
                'name' => 'Environment',
                'name_de' => 'Umwelt',
                'description' => 'Environmental issues and conservation',
                'description_de' => 'Umweltprobleme und Naturschutz',
            ],
            [
                'name' => 'Politics',
                'name_de' => 'Politik',
                'description' => 'Basic political concepts',
                'description_de' => 'Grundlegende politische Konzepte',
            ],
            [
                'name' => 'Culture & Arts',
                'name_de' => 'Kultur & Kunst',
                'description' => 'Discussing cultural events and art forms',
                'description_de' => 'Über kulturelle Ereignisse und Kunstformen sprechen',
            ],
            [
                'name' => 'Media',
                'name_de' => 'Medien',
                'description' => 'News, social media, and entertainment',
                'description_de' => 'Nachrichten, soziale Medien und Unterhaltung',
            ],
            [
                'name' => 'Relationships',
                'name_de' => 'Beziehungen',
                'description' => 'Friendships, family, and romantic relationships',
                'description_de' => 'Freundschaften, Familie und romantische Beziehungen',
            ],
            [
                'name' => 'Future Plans',
                'name_de' => 'Zukunftspläne',
                'description' => 'Talking about aspirations and goals',
                'description_de' => 'Über Ziele und Zukunftspläne sprechen',
            ],
            [
                'name' => 'History',
                'name_de' => 'Geschichte',
                'description' => 'Historical events and figures',
                'description_de' => 'Historische Ereignisse und Persönlichkeiten',
            ],
            [
                'name' => 'Law & Justice',
                'name_de' => 'Recht & Gerechtigkeit',
                'description' => 'Legal system and rights',
                'description_de' => 'Rechtssystem und Rechte',
            ],
            [
                'name' => 'Science',
                'name_de' => 'Wissenschaft',
                'description' => 'Scientific discoveries and concepts',
                'description_de' => 'Wissenschaftliche Entdeckungen und Konzepte',
            ],
            [
                'name' => 'Abstract Concepts',
                'name_de' => 'Abstrakte Konzepte',
                'description' => 'Discussing complex ideas',
                'description_de' => 'Komplexe Ideen diskutieren',
            ],
            [
                'name' => 'Global Issues',
                'name_de' => 'Globale Themen',
                'description' => 'Analyzing international problems',
                'description_de' => 'Internationale Probleme analysieren',
            ],
            [
                'name' => 'Business & Economy',
                'name_de' => 'Wirtschaft & Geschäft',
                'description' => 'Advanced economic and business topics',
                'description_de' => 'Fortgeschrittene Wirtschafts- und Geschäftsthemen',
            ],
            [
                'name' => 'Literature',
                'name_de' => 'Literatur',
                'description' => 'Analyzing literary works',
                'description_de' => 'Literarische Werke analysieren',
            ],
            [
                'name' => 'Philosophy',
                'name_de' => 'Philosophie',
                'description' => 'Philosophical ideas and thinkers',
                'description_de' => 'Philosophische Ideen und Denker',
            ],
            [
                'name' => 'Psychology',
                'name_de' => 'Psychologie',
                'description' => 'Human behavior and mind',
                'description_de' => 'Menschliches Verhalten und Geist',
            ],
            [
                'name' => 'Sociology',
                'name_de' => 'Soziologie',
                'description' => 'Social structures and issues',
                'description_de' => 'Soziale Strukturen und Probleme',
            ],
            [
                'name' => 'Advanced Technology',
                'name_de' => 'Fortgeschrittene Technologie',
                'description' => 'Emerging technologies and their impact',
                'description_de' => 'Neue Technologien und ihre Auswirkungen',
            ],
            [
                'name' => 'Research & Development',
                'name_de' => 'Forschung & Entwicklung',
                'description' => 'Scientific research and innovation',
                'description_de' => 'Wissenschaftliche Forschung und Innovation',
            ],
            [
                'name' => 'Ethics',
                'name_de' => 'Ethik',
                'description' => 'Moral principles and dilemmas',
                'description_de' => 'Moralische Prinzipien und Dilemmata',
            ],
        ];

        foreach ($topicsData as $topicData) {
            Topic::create([
                'name' => $topicData['name'],
                'name_de' => $topicData['name_de'],
                'slug' => str()->slug($topicData['name']),
                'description' => $topicData['description'],
                'description_de' => $topicData['description_de'],
            ]);
        }
    }
}
