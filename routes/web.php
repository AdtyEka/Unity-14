<?php

use App\Http\Controllers\Admin\PengurusController;
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
        Route::resource('admin/pengurus', PengurusController::class);
        Route::get('admin/konfigurasi-posyankes', [\App\Http\Controllers\Admin\PuskesmasController::class, 'index'])->name('admin.konfigurasi-posyankes.index');
        Route::patch('admin/konfigurasi-posyankes/{puskesmas}', [\App\Http\Controllers\Admin\PuskesmasController::class, 'update'])->name('admin.konfigurasi-posyankes.update');
        Route::post('admin/konfigurasi-posyankes/{puskesmas}/jam-layanan/batch', [\App\Http\Controllers\Admin\JamLayananController::class, 'updateBatch'])->name('admin.jam-layanan.updateBatch');
        Route::post('admin/konfigurasi-posyankes/{puskesmas}/posyandu', [\App\Http\Controllers\Admin\PosyanduController::class, 'store'])->name('admin.posyandu.store');
        Route::patch('admin/konfigurasi-posyankes/{puskesmas}/posyandu/{posyandu}', [\App\Http\Controllers\Admin\PosyanduController::class, 'update'])->name('admin.posyandu.update');
        Route::delete('admin/konfigurasi-posyankes/{puskesmas}/posyandu/{posyandu}', [\App\Http\Controllers\Admin\PosyanduController::class, 'destroy'])->name('admin.posyandu.destroy');
    });

    Route::middleware('role:kader')->group(function () {
        Route::inertia('/kader', 'kader/page')->name('kader.dashboard');
    });
});
