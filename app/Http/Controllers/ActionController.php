<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Actions\ActionRequest;
use Illuminate\Http\RedirectResponse;

class ActionController extends Controller
{
    public function __invoke(ActionRequest $actionRequest): ?RedirectResponse
    {
        return $actionRequest->handle();
    }
}
