<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ReelsController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/', [PostController::class, 'index'])->name('home')->middleware('auth');
// Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login')->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/{user:username}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::post('/posts', [PostController::class, 'store'])->name('post.store');
    Route::resource('posts', PostController::class);

    Route::get('/explore', [ExploreController::class, 'index'])->name('explore');
    Route::get('/reels', [ReelsController::class, 'index'])->name('reels');
});

require __DIR__ . '/auth.php';
