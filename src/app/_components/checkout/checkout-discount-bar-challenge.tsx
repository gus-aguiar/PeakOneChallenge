"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Info {
  product: {
    price1: string
    ogPrice1: string
    price2: string
    ogPrice2: string
    price3: string
    ogPrice3: string
  }
}

interface PromotionalBannerProps {
  info: Info
  product: number
}

export default function PromotionalBanner({ info, product }: PromotionalBannerProps) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  const calculateDiscount = (ogPrice: string, price: string) => {
    return Math.round(((Number(ogPrice) - Number(price)) / Number(ogPrice)) * 100)
  }

  const discounts = [
    calculateDiscount(info.product.ogPrice1, info.product.price1),
    calculateDiscount(info.product.ogPrice2, info.product.price2),
    calculateDiscount(info.product.ogPrice3, info.product.price3),
  ]

  const selectedDiscount = discounts[product]




  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="bg-[#FFF1AF] rounded-lg p-2  w-full ">
      <div className="flex items-center align-middle justify-center ">
        <div className="flex items-center gap-2">
          <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
            <Image src="/images/icons/save-seal.png" alt="Discount seal" fill className="object-contain" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-xs leading-tight">
              <span>{selectedDiscount}%</span>
              <span>OFF</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-1">
              <p className="font-bold text-red-600 text-sm">HURRY!</p>
              <p className="font-bold text-black text-sm">LIMITED TO 100 SPOTS ONLY!</p>
            </div>
            <div className="flex flex-row gap-1">

              <div className="flex items-center gap-1 rounded">
                <p className="font font-semibold text-sm">Your spot is reserved for:</p>
                <Image src="/images/icons/clock-icon.png" alt="Timer icon" width={16} height={16} className="object-contain" />
                <span className="font font-semibold text-sm">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

