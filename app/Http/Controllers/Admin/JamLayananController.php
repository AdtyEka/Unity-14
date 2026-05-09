<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Puskesmas;
use Illuminate\Http\RedirectResponse;

class JamLayananController extends Controller
{
    public function updateBatch(Request $request, Puskesmas $puskesmas): RedirectResponse
    {
        $validated = $request->validate([
            'jam_layanans' => 'required|array',
            'jam_layanans.*.id' => 'nullable|integer|exists:jam_layanans,id',
            'jam_layanans.*.hari' => 'required|string|max:255',
            'jam_layanans.*.jam' => 'required|string|max:255',
            'jam_layanans.*.status' => 'required|string|in:Buka,Tutup',
        ]);

        $existingIds = $puskesmas->jamLayanans()->pluck('id')->toArray();
        $submittedIds = collect($validated['jam_layanans'])->pluck('id')->filter()->toArray();

        // Delete items that are not in the submitted data
        $idsToDelete = array_diff($existingIds, $submittedIds);
        if (!empty($idsToDelete)) {
            $puskesmas->jamLayanans()->whereIn('id', $idsToDelete)->delete();
        }

        // Update or create items
        foreach ($validated['jam_layanans'] as $item) {
            if (isset($item['id']) && in_array($item['id'], $existingIds)) {
                $puskesmas->jamLayanans()->where('id', $item['id'])->update([
                    'hari' => $item['hari'],
                    'jam' => $item['jam'],
                    'status' => $item['status'],
                ]);
            } else {
                $puskesmas->jamLayanans()->create([
                    'hari' => $item['hari'],
                    'jam' => $item['jam'],
                    'status' => $item['status'],
                ]);
            }
        }

        return back()->with('success', 'Jam Layanan berhasil diperbarui.');
    }
}
