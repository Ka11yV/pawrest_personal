import Image from "next/image"
import Link from "next/link"

interface IconCardProps {
  icon: string
  title: string
  link?: string
}

export default function IconCard({ icon, title, link = "#" }: IconCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-col items-center p-4 text-center hover:bg-slate-50 rounded-lg transition-colors"
    >
      <div className="mb-3 relative w-16 h-16">
        <Image src={icon || "/placeholder.svg"} alt={title} fill className="object-contain" />
      </div>
      <span className="text-sm text-slate-700 line-clamp-2">{title}</span>
    </Link>
  )
}

