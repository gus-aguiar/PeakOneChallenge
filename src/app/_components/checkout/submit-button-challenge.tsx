"use client"

import Image from "next/image"
import type { ButtonHTMLAttributes } from "react"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonCta: string
}

export default function SubmitButton({ buttonCta, ...props }: SubmitButtonProps) {
  return (
    <div className="flex justify-between">
      <button
        type="submit"
        className="relative w-full py-8 mt-4 text-lg uppercase font-bold text-white bg-[#00af3a] rounded-lg  cursor-pointer  duration-200 ease-in-out border-[#77d496]"
        {...props}
      >
        {buttonCta}
        <Image
          src="/images/icons/btn-arw.png"
          width={20}
          height={20}
          alt=""
          className="absolute right-20 top-1/2 transform -translate-y-1/2"
        />
      </button>
    </div>
  )
}

