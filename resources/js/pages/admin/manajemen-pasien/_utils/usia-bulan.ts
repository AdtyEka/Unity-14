/**
 * Usia balita dalam bulan (dibulatkan ke bawah jika belum lewat tanggal yang sama di bulan berjalan).
 */
export function usiaBulanDariTanggalLahir(tanggalLahir: string, referensi: Date = new Date()): number | null {
    if (!tanggalLahir.trim()) {
        return null;
    }

    const lahir = new Date(tanggalLahir);

    if (Number.isNaN(lahir.getTime())) {
        return null;
    }

    let bulan = (referensi.getFullYear() - lahir.getFullYear()) * 12;

    bulan += referensi.getMonth() - lahir.getMonth();

    if (referensi.getDate() < lahir.getDate()) {
        bulan -= 1;
    }

    return Math.max(0, bulan);
}
