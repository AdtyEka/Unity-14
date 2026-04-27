import * as React from 'react';

import CreateStepOne from '@/pages/admin/manajemen-pasien/_components/CreateStepOne';
import CreateStepTwo from '@/pages/admin/manajemen-pasien/_components/CreateStepTwo';

export type PemeriksaanBaruDraft = {
    namaBayi: string;
    tanggalLahir: string; // yyyy-mm-dd
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    namaIbu: string;
    nikIbu: string;
    namaAyah: string;
    nomorHp: string;
};

function diffMonths(from: Date, to: Date): number {
    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();
    let total = years * 12 + months;
    if (to.getDate() < from.getDate()) {
        total -= 1;
    }
    return Math.max(0, total);
}

export default function ManajemenPasienCreate({
    onCancel,
    onDone,
}: {
    onCancel: () => void;
    onDone: () => void;
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

    const birthDate = draft.tanggalLahir ? new Date(draft.tanggalLahir) : null;
    const ageMonths = birthDate ? diffMonths(birthDate, new Date()) : null;
    const isUnder2Years = ageMonths === null ? true : ageMonths < 24;

    return (
        <CreateStepTwo
            variant={isUnder2Years ? 'under-2' : 'over-2'}
            onBack={() => setStep(1)}
            onCancel={onCancel}
            onSubmit={onDone}
        />
    );
}

