<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/login', 'auth/login')->name('login');

Route::inertia('/admin', 'admin/page')->name('admin.dashboard');
Route::inertia('/kader', 'kader/page')->name('kader.dashboard');
