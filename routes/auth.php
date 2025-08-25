<?php

use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Requests\AuthKitAuthenticationRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLoginRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLogoutRequest;
use Symfony\Component\HttpFoundation\Response;

Route::get('login', fn (AuthKitLoginRequest $authKitLoginRequest): Response => $authKitLoginRequest->redirect())->middleware(['guest'])->name('login');

Route::get('authenticate', fn (AuthKitAuthenticationRequest $authKitAuthenticationRequest) => tap(to_route('dashboard'), fn (): mixed => $authKitAuthenticationRequest->authenticate()))->middleware(['guest']);

Route::post('logout', fn (AuthKitLogoutRequest $authKitLogoutRequest): Response => $authKitLogoutRequest->logout())->middleware(['auth'])->name('logout');
