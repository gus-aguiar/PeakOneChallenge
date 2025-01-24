"use client"

import { useState } from "react"
import Image from "next/image"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface CVVModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CVVModal({ isOpen, onClose }: CVVModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="p-6">
                    <Image
                        src="/images/cvv2-location.jpg"
                        alt="Credit card CVV location guide"
                        width={800}
                        height={600}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export function CVVHelper() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex items-center w-1/2 text-center pt-7" >
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-black text-sm underline"
                aria-label="Learn where to find your CVV number"
            >
                what's this?
            </button>
            <CVVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

