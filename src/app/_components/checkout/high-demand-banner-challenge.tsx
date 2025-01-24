import Image from "next/image"

interface HighDemandBannerProps {
    peopleCount?: number
}

export default function HighDemandBannerChallenge({ peopleCount = 80 }: HighDemandBannerProps) {
    return (
        <div className="w-full bg-red-50 p-3 rounded-lg mt-4">
            <div className="flex items-center justify-center gap-2 text-red-600">
                <Image src="/images/icons/fire-img.png" alt="" width={20} height={20} className="w-5 h-5" />
                <p className="font-semibold">
                    High Demand: <span className="text-black">{peopleCount} people are looking this offer!</span>
                </p>
            </div>
        </div>
    )
}

