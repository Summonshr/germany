<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\TopicController;
use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::inertia('/', 'welcome')->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware(['auth', ValidateSessionWithWorkOS::class])->group(function (): void {
    Route::get('/profile/{username}', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/actions', ActionController::class)->name('actions');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/topic/{topic:slug}', [TopicController::class, 'show'])->name('topic');
    Route::get('/quiz/{quiz:uuid}', [QuizController::class, 'quiz'])->name('quiz');
    Route::get('/quiz/{quiz:uuid}/results', [QuizController::class, 'results'])->name('quiz.results');
});
