<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePengurusRequest;
use App\Http\Requests\UpdatePengurusRequest;
use App\Models\Pengurus as PengurusModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PengurusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PengurusModel::with('user');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nik', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('role') && $request->role !== 'Semua Peran') {
            $query->where('role_detail', $request->role);
        }

        if ($request->filled('status') && $request->status !== 'Semua Status') {
            $query->where('status', $request->status);
        }

        $pengurus = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/page', [
            'pengurus' => $pengurus,
            'filters' => $request->only(['search', 'role', 'status']),
            'activeSection' => 'manajemen-pengurus',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePengurusRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        $user->pengurus()->create([
            'nik' => $request->nik,
            'role_detail' => $request->role_detail,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Pengurus berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePengurusRequest $request, PengurusModel $penguru)
    {
        $penguru->user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $penguru->user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        $penguru->update([
            'nik' => $request->nik,
            'role_detail' => $request->role_detail,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Data pengurus berhasil diperbarui.');
    }

    /**
     * Remove the specified resource in storage.
     */
    public function destroy(PengurusModel $penguru)
    {
        $penguru->user->delete(); // Cascades to pengurus profile

        return redirect()->back()->with('success', 'Pengurus berhasil dihapus.');
    }
}
