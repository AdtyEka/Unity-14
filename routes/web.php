<?php

use App\Http\Controllers\Admin\AdminExportController;
use App\Http\Controllers\Admin\JadwalKesehatanController;
use App\Http\Controllers\Admin\JamLayananController;
use App\Http\Controllers\Admin\MpasiVideoController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\PemeriksaanController;
use App\Http\Controllers\Admin\PengurusController;
use App\Http\Controllers\Admin\PosyanduController;
use App\Http\Controllers\Admin\PuskesmasController;
use App\Http\Controllers\Auth\LoginController;
use App\Models\MpasiVideo;
use App\Models\Puskesmas;

Route::inertia('/', 'welcome')->name('home');

Route::get('/layanan', function () {
    $puskesmas = Puskesmas::with(['jamLayanans', 'posyandus'])->first();

    return inertia('layanan/page', [
        'puskesmas' => $puskesmas,
    ]);
})->name('layanan');

Route::get('/mpasi', function () {
    return inertia('Mpasi/page', [
        'videos' => MpasiVideo::all(),
    ]);
})->name('mpasi');
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
        Route::resource('admin/pasien', PasienController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
        Route::post('admin/pasien/{pasien}/pemeriksaan', [PemeriksaanController::class, 'store'])->name('admin.pemeriksaan.store');
        Route::patch('admin/pasien/{pasien}/pemeriksaan/{pemeriksaan}', [PemeriksaanController::class, 'update'])->name('admin.pemeriksaan.update');
        Route::delete('admin/pasien/{pasien}/pemeriksaan/{pemeriksaan}', [PemeriksaanController::class, 'destroy'])->name('admin.pemeriksaan.destroy');
        Route::get('admin/mpasi', [MpasiVideoController::class, 'index'])->name('admin.mpasi.index');
        Route::post('admin/mpasi', [MpasiVideoController::class, 'store'])->name('admin.mpasi.store');
        Route::patch('admin/mpasi/{mpasiVideo}', [MpasiVideoController::class, 'update'])->name('admin.mpasi.update');
        Route::delete('admin/mpasi/{mpasiVideo}', [MpasiVideoController::class, 'destroy'])->name('admin.mpasi.destroy');
        Route::get('admin/konfigurasi-posyankes', [PuskesmasController::class, 'index'])->name('admin.konfigurasi-posyankes.index');
        Route::patch('admin/konfigurasi-posyankes/{puskesmas}', [PuskesmasController::class, 'update'])->name('admin.konfigurasi-posyankes.update');
        Route::post('admin/konfigurasi-posyankes/{puskesmas}/jam-layanan/batch', [JamLayananController::class, 'updateBatch'])->name('admin.jam-layanan.updateBatch');
        Route::post('admin/konfigurasi-posyankes/{puskesmas}/posyandu', [PosyanduController::class, 'store'])->name('admin.posyandu.store');
        Route::patch('admin/konfigurasi-posyankes/{puskesmas}/posyandu/{posyandu}', [PosyanduController::class, 'update'])->name('admin.posyandu.update');
        Route::delete('admin/konfigurasi-posyankes/{puskesmas}/posyandu/{posyandu}', [PosyanduController::class, 'destroy'])->name('admin.posyandu.destroy');
        Route::get('admin/jadwal-kesehatan', [JadwalKesehatanController::class, 'index'])->name('admin.jadwal-kesehatan.index');
        Route::get('admin/ekspor', [AdminExportController::class, 'index'])->name('admin.ekspor.index');
        Route::post('admin/ekspor', [AdminExportController::class, 'store'])->name('admin.ekspor.store');
    });

    Route::middleware('role:kader')->group(function () {
        Route::inertia('/kader', 'kader/page')->name('kader.dashboard');
    });
});
