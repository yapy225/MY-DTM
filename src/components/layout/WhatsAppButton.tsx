"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/33743537551?text=Bonjour%2C%20je%20souhaite%20un%20audit%20gratuit%20pour%20mon%20projet%20digital."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-7 right-7 z-[999] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
      style={{ animation: "wa-pulse 2s infinite" }}
      aria-label="Contactez-nous sur WhatsApp"
    >
      {/* Tooltip */}
      <span className="pointer-events-none absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-semibold text-dark shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
        Discutons sur WhatsApp
        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-white" />
      </span>

      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
        <path d="M16.004 2.667c-7.364 0-13.337 5.973-13.337 13.333 0 2.347.613 4.64 1.78 6.66L2.667 29.333l6.84-1.793a13.28 13.28 0 006.497 1.693c7.36 0 13.33-5.973 13.33-13.333S23.364 2.667 16.004 2.667zm0 24.4a11.04 11.04 0 01-5.63-1.54l-.4-.24-4.16 1.093 1.11-4.067-.26-.42a11.02 11.02 0 01-1.69-5.893c0-6.1 4.964-11.067 11.067-11.067 6.1 0 11.063 4.967 11.063 11.067S22.107 27.067 16.004 27.067zm6.067-8.287c-.333-.167-1.967-.97-2.273-1.08-.307-.113-.53-.167-.753.167s-.867 1.08-1.063 1.3c-.193.22-.393.247-.727.083-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.393.5-.587.167-.193.22-.333.333-.553.113-.22.057-.413-.03-.58-.083-.167-.753-1.813-1.033-2.487-.273-.647-.55-.56-.753-.57l-.643-.01c-.22 0-.58.083-.883.413-.307.333-1.167 1.14-1.167 2.777s1.193 3.22 1.36 3.443c.167.22 2.347 3.583 5.69 5.027.793.343 1.413.547 1.897.7.797.253 1.523.217 2.097.133.64-.097 1.967-.803 2.247-1.58.273-.777.273-1.443.193-1.58-.083-.14-.307-.22-.64-.387z" />
      </svg>
    </a>
  );
}
