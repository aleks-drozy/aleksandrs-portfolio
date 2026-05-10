import { socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-[clamp(16px,4vw,32px)] sm:flex-row">
        <p className="font-mono text-xs text-text-muted">
          Built by <span className="text-text-secondary">Aleksandrs Drozdovs</span> / 2026
        </p>
        <div className="flex gap-4">
          {socials.map((s) => <SocialLink key={s.name} social={s} />)}
        </div>
      </div>
    </footer>
  )
}
