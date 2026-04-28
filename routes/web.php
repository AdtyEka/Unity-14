<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/layanan', 'layanan/page')->name('layanan');
Route::inertia('/mpasi', 'Mpasi/page')->name('mpasi');
Route::inertia('/artikel', 'artikel/page')->name('artikel');
Route::get('/artikel/{slug}', function (string $slug) {
    return inertia('artikel/[slug]/page', ['slug' => $slug]);
})->name('artikel.show');
Route::inertia('/login', 'auth/login')->name('login');

Route::inertia('/admin', 'admin/page')->name('admin.dashboard');
Route::inertia('/kader', 'kader/page')->name('kader.dashboard');
