<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/layanan', 'layanan/page')->name('layanan');
Route::inertia('/mpasi', 'Mpasi/page')->name('mpasi');
Route::inertia('/artikel', 'artikel/page')->name('artikel');
Route::get('/artikel/{slug}', function (string $slug) {
    return inertia('artikel/[slug]/page', ['slug' => $slug]);
})->name('artikel.show');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'auth/login')->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    Route::middleware('role:admin')->group(function () {
        Route::inertia('/admin', 'admin/page')->name('admin.dashboard');
    });

    Route::middleware('role:kader')->group(function () {
        Route::inertia('/kader', 'kader/page')->name('kader.dashboard');
    });
});
