<?php

use App\Http\Controllers\Api\DebitController;
use App\Http\Controllers\Api\KreditController;
use App\Http\Controllers\Api\TransaksiController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ApiAuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('/login', [ApiAuthController::class, 'login']);
Route::middleware(['auth:sanctum', 'role:user,admin'])->group(function () {
    Route::get('/logout', [ApiAuthController::class, 'logout']);
    Route::get('/user', [ApiAuthController::class, 'show']);

    Route::get('/debits', [DebitController::class, 'myDebit']);
    Route::post('/debits', [DebitController::class, 'store']);
    Route::get('/debits/{id}', [DebitController::class, 'show']);
    Route::put('/debits/{id}', [DebitController::class, 'update']);
    Route::delete('/debits/{id}', [DebitController::class, 'destroy']);

    Route::get('/kredits', [KreditController::class, 'myKredit']);
    Route::post('/kredits', [KreditController::class, 'store']);
    Route::get('/kredits/{id}', [KreditController::class, 'show']);
    Route::put('/kredits/{id}', [KreditController::class, 'update']);
    Route::delete('/kredits/{id}', [KreditController::class, 'destroy']);

    Route::get('/transaksi', [TransaksiController::class, 'index']);
    Route::post('/transaksi', [TransaksiController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'roleApi:admin'])->group(function () {
    Route::get('/debits/All', [DebitController::class, 'allDebit']);
    Route::get('/kredits/All', [KreditController::class, 'allKredit']);
    Route::get('/transaksi/saldo/all', [TransaksiController::class, 'allTransaksi']);
    Route::get('/transaksi/saldo', [TransaksiController::class, 'myTransaksi']);
});
