<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);

// Route::post('/contact', [ContactController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/my-projects', [ProjectController::class, 'myProjects']);

    Route::prefix('admin')->group(function () {
        Route::apiResource('projects', ProjectController::class)
            ->except(['index', 'show']);
    });
});
