"use client";

import { useLocale } from "next-intl";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return isArabic ? (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M40 45C40 45 45 42 45 30C45 18 40 15 40 15M60 45C60 45 65 42 65 30C65 18 60 15 60 15"
        stroke="#B4975A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M85 15H95C100 15 105 20 105 25V35C105 40 100 45 95 45H85V15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      <path
        d="M115 15H125C130 15 135 20 135 25V35C135 40 130 45 125 45H115V15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      <path
        d="M145 15H155C160 15 165 20 165 25V35C165 40 160 45 155 45H145V15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      {/* Dots for Arabic text */}
      <circle cx="95" cy="25" r="2" fill="#B4975A" />
      <circle cx="125" cy="25" r="2" fill="#B4975A" />
      <circle cx="155" cy="25" r="2" fill="#B4975A" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Q */}
      <path
        d="M45 15C35 15 30 20 30 30C30 40 35 45 45 45C55 45 60 40 60 30C60 20 55 15 45 15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      <path d="M55 35L65 45" stroke="#B4975A" strokeWidth="2" />
      {/* A */}
      <path d="M70 45L85 15L100 45M75 35H95" stroke="#B4975A" strokeWidth="2" />
      {/* N */}
      <path d="M110 45V15L130 45V15" stroke="#B4975A" strokeWidth="2" />
      {/* O */}
      <path
        d="M145 15C135 15 130 20 130 30C130 40 135 45 145 45C155 45 160 40 160 30C160 20 155 15 145 15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      {/* O */}
      <path
        d="M175 15C165 15 160 20 160 30C160 40 165 45 175 45C185 45 190 40 190 30C190 20 185 15 175 15Z"
        stroke="#B4975A"
        strokeWidth="2"
      />
      {/* N */}
      <path d="M200 45V15L220 45V15" stroke="#B4975A" strokeWidth="2" />
    </svg>
  );
}
