<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\LanguageSeeder;
use Database\Seeders\TopicSeeder;
use Database\Seeders\LessonSeeder;
use Database\Seeders\VocabularySeeder;
use Database\Seeders\ExerciseSeeder;

class LanguageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->truncateTables();

        $this->call([
            TopicSeeder::class,
            VocabularySeeder::class,
        ]);
    }

    /**
     * Truncate all related tables
     */
    private function truncateTables(): void
    {
        if (DB::getDriverName() === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
        } elseif (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF');
        }

        DB::table('topics')->truncate();
        DB::table('vocabulary')->truncate();

        if (DB::getDriverName() === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
        } elseif (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON');
        }
    }
}
