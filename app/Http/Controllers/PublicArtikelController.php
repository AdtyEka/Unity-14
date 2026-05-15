<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Inertia\Inertia;

class PublicArtikelController extends Controller
{
    public function index()
    {
        return Inertia::render('artikel/page', [
            'articles' => Artikel::latest()->get(),
        ]);
    }

    public function show(string $slug)
    {
        $article = Artikel::where('slug', $slug)->firstOrFail();

        return Inertia::render('artikel/[slug]/page', [
            'article' => $article,
        ]);
    }
}
