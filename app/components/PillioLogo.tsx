import Link from 'next/link'
import Image from 'next/image'

interface PillioLogoProps {
  href?: string | null
  size?: 'sm' | 'md' | 'lg'
  fullName?: boolean
}

const dims = { sm: 32, md: 36, lg: 44 }
const textSizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-xl' }

export default function PillioLogo({ href = '/', size = 'md', fullName = false }: PillioLogoProps) {
  const d = dims[size]

  const mark = (
    <span className="inline-flex items-center gap-2.5 select-none">
      <Image
        src="/pilliologo.jpeg"
        alt="Pillio logo"
        width={d}
        height={d}
        className="rounded-md object-contain"
      />
      <span className={`font-display ${textSizes[size]} font-bold tracking-tight text-pillio-navy`}>
        {fullName ? 'Pillio Technology Solutions' : 'Pillio'}
      </span>
    </span>
  )

  if (href) {
    return <Link href={href} className="inline-flex">{mark}</Link>
  }
  return mark
}
