<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's public profile.
     */
    public function show(string $username): Response
    {
        $user = User::where('username', $username)->firstOrFail();

        return Inertia::render('profile', [
            'user' => $user,
        ]);
    }
}
