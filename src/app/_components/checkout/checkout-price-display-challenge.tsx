import React from "react"
import { useCurrencyRates, countryToCurrency, currencySymbols } from "@/app/_utils/currencyUtils"

interface PriceDisplayProps {
  priceUSD: number
  countryCode: string
  priceId?: string
  ogPrice?: boolean
}

export function PriceDisplay({ priceUSD, countryCode, priceId, ogPrice }: PriceDisplayProps) {
  const { rates } = useCurrencyRates()

  const currency = countryToCurrency[countryCode] || "USD"
  const symbol = currencySymbols[currency] || "$"

  const exchangeRate = rates ? rates[currency] : 1
  const convertedPrice = priceUSD * (exchangeRate || 1)

  return (
    <p className={`${ogPrice ? "prod-det_cut-tx" : "text-[#5acd65]"} text-[16px] font-bold`} id={priceId}>
      {symbol}
      {ogPrice ? convertedPrice.toFixed(0) : convertedPrice.toFixed(2)}
    </p>
  )
}

type PriceDisplaySimpleProps = {
  priceUSD: number
  countryCode: string
  digits: number
  smallSymbol?: boolean
  ogPrice?: boolean
}

export function PriceDisplaySimple({ priceUSD, countryCode, digits, smallSymbol, ogPrice }: PriceDisplaySimpleProps) {
  const { rates } = useCurrencyRates()

  const currency = countryToCurrency[countryCode] || "USD"
  const symbol = currencySymbols[currency] || "$"

  const exchangeRate = rates ? rates[currency] : 1
  const convertedPrice = priceUSD * (exchangeRate || 1)

  return (
    <span className={ogPrice ? "prod-det_cut-tx " : ""}>
      <span className={`${smallSymbol ? "text-[16px] md:text-[20px] xl:text-[24px]" : ""}`}>{symbol}</span>
      {convertedPrice.toFixed(digits)}
    </span>
  )
}

const styles = `
.prod-det_cut-tx {
  position: relative;
  display: inline-block;
}

.prod-det_cut-tx::after {
  content: "";
  position: absolute;
  left: 0;
  top: 12px;
  width: calc(100% + 10px);
  margin-left: -5px;
  border-top: 2px solid #f00;
  transform: rotate(-10deg);
  -webkit-transform: rotate(-10deg);
}
`

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

