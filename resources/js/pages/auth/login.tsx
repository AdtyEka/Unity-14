import { Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Login" />

            <div className="relative flex min-h-screen w-screen overflow-hidden bg-white">
                <img
                    src="/assets/images/login/Login-Kiri.webp"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-auto select-none lg:block"
                />
                <img
                    src="/assets/images/login/Login-Kanan.webp"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-auto select-none lg:block"
                />

                {/* Konten tengah */}
                <div className="relative z-10 flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-12 sm:py-0 lg:px-20">
                    <div className="w-full max-w-sm sm:-mt-14 sm:max-w-xl lg:max-w-2xl">
                        <div className="mb-4 flex justify-center sm:mb-5">
                            <img
                                src="/assets/images/login/Icon Dashboard.webp"
                                alt="Logo Unity Stunting"
                                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                            />
                        </div>

                        <h1 className="text-center text-2xl font-bold text-[#1e2d3d] sm:text-[28px] lg:text-[32px]">
                            Welcome Back!
                        </h1>
                        <p className="mx-auto mt-2 max-w-xs text-center text-xs leading-relaxed text-[#7a8494] sm:max-w-md sm:text-[13px] lg:text-[14px]">
                            Selamat Datang di Dashboard Stunting: Cepat, Akurat, Terarah
                        </p>

                        <form className="mt-7 space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-[11.5px] font-semibold text-[#374151]">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    className="h-10 rounded-full border-[#d1d5db] bg-white px-4 text-sm text-[#364152] shadow-none placeholder:text-[#b0b8c5] focus-visible:border-[#16a34a] focus-visible:ring-1 focus-visible:ring-[#16a34a]/25"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-[11.5px] font-semibold text-[#374151]">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="h-10 rounded-full border-[#d1d5db] bg-white px-4 pr-11 text-sm text-[#364152] shadow-none placeholder:text-[#b0b8c5] focus-visible:border-[#16a34a] focus-visible:ring-1 focus-visible:ring-[#16a34a]/25"
                                    />
                                    <button
                                        type="button"
                                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#a0a7b4] transition hover:text-[#6b7280]"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-0.5 text-[11px] text-[#5e6470]">
                                <label className="flex cursor-pointer items-center gap-1.5">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded border-[#cfd4dc] accent-[#16a34a]"
                                    />
                                    <span>Remember Password</span>
                                </label>
                                <a href="#" className="font-semibold text-[#3f4754] hover:text-[#16a34a]">
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="pt-2 text-center">
                                <Button
                                    type="submit"
                                    className="h-10 min-w-[160px] rounded-full bg-gradient-to-r from-[#0c7a0c] via-[#0d9410] to-[#17d334] px-8 text-sm font-bold tracking-[0.18em] text-white shadow-[0_6px_18px_rgba(22,163,74,0.32)] transition hover:brightness-110 active:brightness-95"
                                >
                                    LOGIN
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
