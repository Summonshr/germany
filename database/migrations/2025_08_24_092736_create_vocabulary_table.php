<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vocabulary', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id');
            $table->enum('type', ['vocabulary', 'sentence']);
            $table->string('text');
            $table->string('text_de');
            $table->json('synonyms');
            $table->text('description')->nullable();
            $table->text('description_de')->nullable();
            $table->string('note')->nullable();
            $table->string('note_de')->nullable();
            $table->string('culture')->nullable();
            $table->string('culture_de')->nullable();
            $table->json('options_de');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vocabulary');
    }
};
