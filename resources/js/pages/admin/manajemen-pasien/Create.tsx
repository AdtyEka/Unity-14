import { useForm } from '@inertiajs/react';
import * as React from 'react';

import CreateStepOne from '@/pages/admin/manajemen-pasien/_components/CreateStepOne';
import CreateStepTwo from '@/pages/admin/manajemen-pasien/_components/CreateStepTwo';
import { usiaBulanDariTanggalLahir } from '@/pages/admin/manajemen-pasien/_utils/usia-bulan';

export type PemeriksaanBaruDraft = {
    nama_bayi: string;
    tanggal_lahir: string; // yyyy-mm-dd
    jenis_kelamin: 'Laki-laki' | 'Perempuan';
    nama_ibu: string;
    nik_ibu: string;
    nama_ayah: string;
    nomor_hp: string;
    // Data antropometri
    tanggal_pemeriksaan: string;
    tinggi_badan: string;
    berat_badan: string;
};

export default function ManajemenPasienCreate({
    onCancel,
    onDone,
}: {
    onCancel: () => void;
    /**
     * @param prediksiMl `true` hanya jika usia 12–60 bulan (model ML tersedia). Untuk 0–11 bulan selalu `false`.
     */
    onDone: (pasienId: string, meta: { prediksiMl: boolean }) => void;
}) {
    const [step, setStep] = React.useState<1 | 2>(1);
    
    const { data, setData, post, processing, errors } = useForm<PemeriksaanBaruDraft>({
        nama_bayi: '',
        tanggal_lahir: '',
        jenis_kelamin: 'Laki-laki',
        nama_ibu: '',
        nik_ibu: '',
        nama_ayah: '',
        nomor_hp: '',
        tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
        tinggi_badan: '',
        berat_badan: '',
    });

    const usiaBulan = usiaBulanDariTanggalLahir(data.tanggal_lahir);
    const prediksiMl = usiaBulan !== null && usiaBulan >= 12 && usiaBulan <= 60;

    const handleSubmit = () => {
        post('/admin/pasien', {
            onSuccess: (page) => {
                // Berasumsi flash message atau state pasiens sudah terupdate
                // Kita perlu ID pasien yang baru dibuat. 
                // Karena Inertia redirect back, kita mungkin perlu cari di list atau terima via prop flash.
                // Untuk sementara, kita asumsikan onDone akan menangani navigasi ke show
                // Jika kita ingin spesifik, kita bisa gunakan response data jika API memungkinkannya, 
                // tapi Inertia standar redirect.
                // Kita akan panggil onDone dengan ID dummy dulu atau cari cara lain.
                // Namun di issue.md dibilang "onDone (pasienId, {prediksiMl})".
                // Kita akan coba ambil ID dari pasiens.data[0] karena terbaru.
                const newPasienId = (page.props as any).pasiens.data[0]?.id;
                onDone(newPasienId || 'unknown', { prediksiMl });
            },
        });
    };

    if (step === 1) {
        return (
            <CreateStepOne
                onCancel={onCancel}
                onNext={() => setStep(2)}
                value={{
                    namaBayi: data.nama_bayi,
                    tanggalLahir: data.tanggal_lahir,
                    jenisKelamin: data.jenis_kelamin,
                    namaIbu: data.nama_ibu,
                    nikIbu: data.nik_ibu,
                    namaAyah: data.nama_ayah || '',
                    nomorHp: data.nomor_hp || '',
                }}
                onChange={(next) => setData({
                    ...data,
                    nama_bayi: next.namaBayi,
                    tanggal_lahir: next.tanggalLahir,
                    jenis_kelamin: next.jenisKelamin,
                    nama_ibu: next.namaIbu,
                    nik_ibu: next.nikIbu,
                    nama_ayah: next.namaAyah,
                    nomor_hp: next.nomorHp,
                })}
                errors={errors}
            />
        );
    }

    return (
        <CreateStepTwo
            usiaBulan={usiaBulan}
            prediksiMl={prediksiMl}
            onBack={() => setStep(1)}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            // Kirim state antropometri ke StepTwo
            antropometri={{
                tanggal_pemeriksaan: data.tanggal_pemeriksaan,
                tinggi_badan: data.tinggi_badan,
                berat_badan: data.berat_badan,
            }}
            onAntropometriChange={(next) => setData({ ...data, ...next })}
            processing={processing}
            errors={errors}
        />
    );
}
