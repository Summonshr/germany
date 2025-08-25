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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid();
            $table->unsignedInteger('current_question');
            $table->json('selected_answers')->default('[]');
            $table->foreignId('user_id');
            $table->json('topic_ids');
            $table->json('question_ids');
            $table->integer('score')->default(-1);
            $table->string('type');
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
