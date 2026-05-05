import * as React from 'react';

import CreateStepOne from '@/pages/admin/manajemen-pasien/_components/CreateStepOne';
import CreateStepTwo from '@/pages/admin/manajemen-pasien/_components/CreateStepTwo';
import { usiaBulanDariTanggalLahir } from '@/pages/admin/manajemen-pasien/_utils/usia-bulan';

export type PemeriksaanBaruDraft = {
    namaBayi: string;
    tanggalLahir: string; // yyyy-mm-dd
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    namaIbu: string;
    nikIbu: string;
    namaAyah: string;
    nomorHp: string;
};

/** UID sementara untuk navigasi ke detail setelah pemeriksaan (ganti saat sudah ada respons API). */
export function uidPemeriksaanBaru(): string {
    return `#B-${Date.now()}`;
}

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
    const [draft, setDraft] = React.useState<PemeriksaanBaruDraft>({
        namaBayi: '',
        tanggalLahir: '',
        jenisKelamin: 'Laki-laki',
        namaIbu: '',
        nikIbu: '',
        namaAyah: '',
        nomorHp: '',
    });

    if (step === 1) {
        return (
            <CreateStepOne
                onCancel={onCancel}
                onNext={() => setStep(2)}
                value={draft}
                onChange={setDraft}
            />
        );
    }

    const usiaBulan = usiaBulanDariTanggalLahir(draft.tanggalLahir);
    const prediksiMl = usiaBulan !== null && usiaBulan >= 12 && usiaBulan <= 60;

    return (
        <CreateStepTwo
            usiaBulan={usiaBulan}
            prediksiMl={prediksiMl}
            onBack={() => setStep(1)}
            onCancel={onCancel}
            onSubmit={() => onDone(uidPemeriksaanBaru(), { prediksiMl })}
        />
    );
}

