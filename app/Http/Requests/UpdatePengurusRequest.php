<?php

namespace App\Http\Requests;

use App\Models\Pengurus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePengurusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pengurus = $this->route('penguru');

        if (is_string($pengurus)) {
            $pengurus = Pengurus::findOrFail($pengurus);
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$pengurus->user_id],
            'password' => ['nullable', 'string', 'min:8'],
            'nik' => ['required', 'string', 'size:16', 'unique:pengurus,nik,'.$pengurus->id],
            'role_detail' => ['required', 'string', 'in:Bidan,Admin Puskesmas,Admin Dinas,Kader'],
            'status' => ['required', 'string', 'in:Aktif,Nonaktif'],
        ];
    }
}
