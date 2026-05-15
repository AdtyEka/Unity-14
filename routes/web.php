<?php

use App\Http\Controllers\Admin\AdminExportController;
use App\Http\Controllers\Admin\ArtikelController as AdminArtikelController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JadwalKesehatanController;
use App\Http\Controllers\Admin\JamLayananController;
use App\Http\Controllers\Admin\MpasiVideoController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\PemeriksaanController;
use App\Http\Controllers\Admin\PengurusController;
use App\Http\Controllers\Admin\PosyanduController;
use App\Http\Controllers\Admin\PuskesmasController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PublicArtikelController;
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

Route::get('/artikel', [PublicArtikelController::class, 'index'])->name('artikel');
Route::get('/artikel/{slug}', [PublicArtikelController::class, 'show'])->name('artikel.show');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'auth/login')->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/pengurus', PengurusController::class);
        Route::resource('admin/pasien', PasienController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
        Route::get('admin/pasien/{pasien}/pemeriksaan/download', [PemeriksaanController::class, 'downloadReport'])->name('admin.pemeriksaan.download');
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
        Route::post('admin/jadwal-kesehatan/{pasien}/mark-reminded', [JadwalKesehatanController::class, 'markReminded'])->name('admin.jadwal-kesehatan.mark-reminded');
        Route::get('admin/ekspor', [AdminExportController::class, 'index'])->name('admin.ekspor.index');
        Route::post('admin/ekspor', [AdminExportController::class, 'store'])->name('admin.ekspor.store');

        Route::get('admin/artikel', [AdminArtikelController::class, 'index'])->name('admin.artikel.index');
        Route::post('admin/artikel', [AdminArtikelController::class, 'store'])->name('admin.artikel.store');
        Route::put('admin/artikel/{artikel}', [AdminArtikelController::class, 'update'])->name('admin.artikel.update');
        Route::delete('admin/artikel/{artikel}', [AdminArtikelController::class, 'destroy'])->name('admin.artikel.destroy');
    });

    Route::middleware('role:kader')->group(function () {
        Route::get('/kader', [App\Http\Controllers\Kader\DashboardController::class, 'index'])->name('kader.dashboard');
        Route::get('/kader/pasien', [PasienController::class, 'index'])->name('kader.pasien.index');
        Route::get('/kader/pasien/{pasien}', [PasienController::class, 'show'])->name('kader.pasien.show');
        Route::get('/kader/pasien/{pasien}/pemeriksaan/download', [PemeriksaanController::class, 'downloadReport'])->name('kader.pemeriksaan.download');
        Route::post('/kader/pasien', [PasienController::class, 'store'])->name('kader.pasien.store');
        Route::patch('/kader/pasien/{pasien}', [PasienController::class, 'update'])->name('kader.pasien.update');
        Route::delete('/kader/pasien/{pasien}', [PasienController::class, 'destroy'])->name('kader.pasien.destroy');
        Route::post('/kader/pasien/{pasien}/pemeriksaan', [PemeriksaanController::class, 'store'])->name('kader.pemeriksaan.store');
        Route::patch('/kader/pasien/{pasien}/pemeriksaan/{pemeriksaan}', [PemeriksaanController::class, 'update'])->name('kader.pemeriksaan.update');
        Route::delete('/kader/pasien/{pasien}/pemeriksaan/{pemeriksaan}', [PemeriksaanController::class, 'destroy'])->name('kader.pemeriksaan.destroy');
    });
});
