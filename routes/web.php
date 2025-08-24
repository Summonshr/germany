<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LanguageController;
use App\Models\Level;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::inertia('/', 'welcome')->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware([ 'auth', ValidateSessionWithWorkOS::class, ])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('language/{language:code}/level/{level:slug}/topic/{topic:slug}/lesson/{lesson:slug}', [LanguageController::class, 'topic'])->name('topic')->scopeBindings();
});
