<?php

use App\Http\Controllers\User\DocumentFileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->prefix('panel')->group(
    function () {
        Route::get('users/logout', [UserController::class, 'logout']);

        Route::get('document_files/download/{model}', [DocumentFileController::class, 'download']);
    }
);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
