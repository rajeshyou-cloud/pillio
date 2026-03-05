import Link from 'next/link'

interface PillioLogoProps {
  href?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const dims = { sm: 28, md: 34, lg: 44 }
const textSizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }

export default function PillioLogo({ href = '/', size = 'md' }: PillioLogoProps) {
  const d = dims[size]

  const mark = (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Hexagonal circuit badge */}
      <svg width={d} height={d} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="20,1 36.5,10.5 36.5,29.5 20,39 3.5,29.5 3.5,10.5" fill="#0A1128" />
        {/* Center hub */}
        <circle cx="20" cy="20" r="3.5" fill="#00E5FF" />
        {/* Top node — gold accent */}
        <circle cx="20" cy="9" r="2.5" fill="#FFB703" />
        <line x1="20" y1="11.5" x2="20" y2="16.5" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bottom-right node */}
        <circle cx="29" cy="27" r="2.5" fill="#00E5FF" opacity="0.8" />
        <line x1="27.1" y1="25.6" x2="22.8" y2="22.2" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bottom-left node */}
        <circle cx="11" cy="27" r="2.5" fill="#00E5FF" opacity="0.8" />
        <line x1="12.9" y1="25.6" x2="17.2" y2="22.2" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className={`font-display ${textSizes[size]} font-bold tracking-tight text-pillio-navy`}>
        Pillio
      </span>
    </span>
  )

  if (href) {
    return <Link href={href} className="inline-flex">{mark}</Link>
  }
  return mark
}
