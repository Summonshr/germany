<?php

namespace App\Providers;

use App\Http\Requests\Actions\ActionRequest;
use App\Http\Requests\Actions\CreateHardQuizRequest;
use App\Http\Requests\Actions\CreateNewQuizRequest;
use App\Http\Requests\Actions\FinishQuizRequest;
use App\Http\Requests\Actions\RetakeQuizRequest;
use App\Http\Requests\Actions\SaveQuizRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Model::preventLazyLoading(app()->environment('local'));
        Model::unguard();
        app()->bind(function (): ActionRequest {
            $actions = [
                'save-quiz' => SaveQuizRequest::class,
                'finish-quiz' => FinishQuizRequest::class,
                'create-quiz' => CreateNewQuizRequest::class,
                'hard-quiz' => CreateHardQuizRequest::class,
                'retake-quiz' => RetakeQuizRequest::class,
            ];
            if ($class = data_get($actions, request('action'))) {
                return app($class);
            }

            throw new \Exception('Invalid action type');
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
