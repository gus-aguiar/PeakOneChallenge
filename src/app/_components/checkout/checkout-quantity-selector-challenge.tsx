import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "@/app/_context/SessionContext"
import type { CheckoutPageType } from "@/interfaces/checkoutPage"
import type { ProductInfoType } from "@/interfaces/productInfo"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { delay } from "@/app/_utils/delay"
import { PriceDisplaySimple } from "./checkout-price-display-challenge"

type QuantityProps = {
  product: ProductInfoType
  info: CheckoutPageType
  setProduct: (product: ProductInfoType) => void
  couponActive: boolean
  country: string
}

// Select the number of products to purchase
const QuantitySelectorChallenge = ({ product, info, setProduct, couponActive, country }: QuantityProps) => {
  const handleProductClick = (
    productNum: number,
    productPrice: number,
    productShipping: number,
    productShippingId: number,
    productOfferId: number,
    productStickyId: number,
  ) => {
    setProduct({
      product: productNum,
      productName: `${productNum + 1}x ${info.product.name}`,
      productPrice: productPrice.toString(),
      productShipping: productShipping.toString(),
      productShippingId: productShippingId.toString(),
      productOfferId: productOfferId.toString(),
      productStickyId: productStickyId.toString(),
    })
  }

  const [price1, setPrice1] = useState(Number(info.product.price1))
  const [price2, setPrice2] = useState(Number(info.product.price2))
  const [price3, setPrice3] = useState(Number(info.product.price3))
  const [price4, setPrice4] = useState(Number(info.product.price4))

  const [showCouponFlag, setShowCouponFlag] = useState(false)

  useEffect(() => {
    function scrollIfNotVisible(elementId: string) {
      const element = document.getElementById(elementId)

      if (!element) return // Exit if the element is not found

      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      // Check if the element is completely within the viewport
      const isCompletelyVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      // If not fully visible, scroll into view
      if (!isCompletelyVisible) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center", // Adjust this if you want it to align differently
        })
      }
    }

    const changePriceDrama = async () => {
      scrollIfNotVisible("quantity-selector")
      document.getElementById("price1")!.style.background = "#5acd65"
      await delay(200)
      setPrice1(price1 - Number.parseFloat(info.product.couponValue))
      document.getElementById("price1")!.style.background = "none"
      document.getElementById("price2")!.style.background = "#5acd65"
      await delay(200)
      setPrice2(price2 - Number.parseFloat(info.product.couponValue))
      document.getElementById("price2")!.style.background = "none"
      document.getElementById("price3")!.style.background = "#5acd65"
      await delay(200)
      setPrice3(price3 - Number.parseFloat(info.product.couponValue))
      document.getElementById("price3")!.style.background = "none"
      document.getElementById("price4")!.style.background = "#5acd65"
      await delay(200)
      setPrice4(price4 - Number.parseFloat(info.product.couponValue))
      document.getElementById("price4")!.style.background = "none"
      setShowCouponFlag(true)
    }
    if (couponActive) {
      changePriceDrama()
    }
  }, [couponActive])

  return (
    <>
      <div
        className="
        flex w-full 
        justify-between 
        items-center 
        pb-6"
        id="quantity-selector"
      >
        <div className="flex w-full">
          <Image src="/images/icons/frm-hdr-icn1.png" width={60} height={60} alt="Secure Checkout" />
          <div className="flex flex-col ml-3">
            <h2 className="font-bold text-[22px]">Select Quantity</h2>
            <h3 className="text-[14px] text-black]">How many units do you want?</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <div
          className={`
            flex w-full  
            border-[2px] 
            border-gray 
            rounded-md 
            cursor-pointer  
            transition-all  
            p-3
            mb-4
            ${product.product === 0 && "border-blue-600 border-[1px] bg-[#FFFFCB] "} `}
          onClick={() => {
            handleProductClick(
              0,
              Number(info.product.price1),
              Number(info.product.ship1),
              Number(info.product.shippingId1),
              Number(info.product.offerId1),
              Number(info.product.stickyId1),
            )
          }}
        >
          <div className="flex w-1/2 sm:w-1/2 justify-between items-center">
            <div className="flex-col">
              <div className="flex gap-3 items-center p-1">
                <input
                  type="checkbox"
                  name="quantity"
                  id="quantity1"
                  checked={product.product === 0}
                  className="h-5 w-5 accent-black cursor-pointer"
                />
                <p className="text-[20px] font-bold ">Buy 1 Unit</p>
              </div>
              <div className="mt-3">
                <Image src={info.product.image1 || "/placeholder.svg"} width={120} height={120} alt="Quantity 1" />
              </div>
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-center items-center text-end">
            <div className="flex flex-col  justify-center items-end w-full space-x-2 sm:space-x-0">
              <p>
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice1)}
                  countryCode={country}
                  digits={2}
                  ogPrice={true}
                />
              </p>

              <p className="text-[30px] text-black  font-bold" id="price1">
                <PriceDisplaySimple priceUSD={price1} countryCode={country} digits={2} />
              </p>

              <p className="text-[17px] sm:text-[19px] text-[#26b80e]  font-bold">
                You Save{" "}
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice1) - price1}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
            relative 
            flex 
            w-full  
            border-[2px] 
            border-gray 
            rounded-md 
            cursor-pointer  
            transition-all  
            p-3
            ${product.product === 1 && "border-blue-600 border-[1px] bg-[#FFFFCB] "} `}
          onClick={() => {
            handleProductClick(
              1,
              Number(info.product.price2),
              Number(info.product.ship2),
              Number(info.product.shippingId2),
              Number(info.product.offerId2),
              Number(info.product.stickyId2),
            )
          }}
        >
          <div className="absolute -top-6 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Image src="/images/icons/one-star.png" width={12} height={12} alt="" />
            BESTSELLER
          </div>
          <div className="flex w-1/2 sm:w-1/2 justify-between items-center">
            <div className="flex-col">
              <div className="flex gap-3 items-center p-1">
                <input
                  type="checkbox"
                  name="quantity"
                  id="quantity2"
                  checked={product.product === 1}
                  className="h-5 w-5 accent-black cursor-pointer"
                />
                <p className="text-[20px] font-bold ">Buy 2 Units</p>
              </div>
              <div className="mt-3">
                <Image src={info.product.image2 || "/placeholder.svg"} width={120} height={120} alt="Quantity 1" />
              </div>
            </div>
          </div>

          <div className="flex w-2/3 sm:w-1/2 flex-col justify-center items-center text-end">
            <div className="flex flex-col  justify-center items-end w-full space-x-2 sm:space-x-0">
              <p>
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice2)}
                  countryCode={country}
                  digits={2}
                  ogPrice={true}
                />
              </p>

              <p className="text-[30px] text-black  font-bold" id="price1">
                <PriceDisplaySimple priceUSD={price2} countryCode={country} digits={2} />
              </p>

              <p className="text-[17px] sm:text-[19px] text-[#26b80e]  font-bold">
                You Save{" "}
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice2) - price2}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
            flex w-full  
            border-[2px] 
            border-gray 
            rounded-md 
            cursor-pointer  
            transition-all  
            p-3
            ${product.product === 2 && "border-blue-600 border-[1px] bg-[#FFFFCB] "} `}
          onClick={() =>
            handleProductClick(
              2,
              Number(info.product.price3),
              Number(info.product.ship3),
              Number(info.product.shippingId3),
              Number(info.product.offerId3),
              Number(info.product.stickyId3),
            )
          }
        >
          <div className="flex w-1/2 sm:w-1/2 justify-between items-center">
            <div className="flex-col">
              <div className="flex gap-3 items-center p-1">
                <input
                  type="checkbox"
                  name="quantity"
                  id="quantity1"
                  checked={product.product === 2}
                  className="h-5 w-5 accent-black cursor-pointer"
                />
                <p className="text-[20px] font-bold ">Buy 3 Units</p>
              </div>
              <div className="mt-3">
                <Image src={info.product.image3 || "/placeholder.svg"} width={120} height={120} alt="Quantity 3" />
              </div>
            </div>
          </div>

          <div className="flex w-2/3 sm:w-1/2 flex-col justify-center items-center text-end">
            <div className="flex flex-col  justify-center items-end w-full space-x-2 sm:space-x-0">
              <p>
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice3)}
                  countryCode={country}
                  digits={2}
                  ogPrice={true}
                />
              </p>

              <p className="text-[30px] text-black  font-bold" id="price1">
                <PriceDisplaySimple priceUSD={price3} countryCode={country} digits={2} />
              </p>

              <p className="text-[17px] sm:text-[19px] text-[#26b80e]  font-bold">
                You Save{" "}
                <PriceDisplaySimple
                  priceUSD={Number.parseFloat(info.product.ogPrice3) - price3}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuantitySelectorChallenge

