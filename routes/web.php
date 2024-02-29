<?php

use App\Events\MessageCreated;
use App\Http\Controllers\FirstPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Web\ProjectController;
use App\Http\Controllers\Web\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     // MessageCreated::dispatch('Hello boss!');
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [FirstPageController::class, 'index']);

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/dashboard', [TransaksiController::class, 'index'])->name('dashboard.index');
    Route::delete('/dashboard/debit/{id}', [TransaksiController::class, 'destroyDebit'])->name('dashboard.destroyDebit');
    Route::delete('/dashboard/kredit/{id}', [TransaksiController::class, 'destroyKredit'])->name('dashboard.destroyKredit');
    Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
});
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/users', [UserController::class, 'index']);
require __DIR__ . '/auth.php';
