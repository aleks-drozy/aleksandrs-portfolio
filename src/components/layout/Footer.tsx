import { socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">Built by <span className="text-text-primary font-medium">Aleksandrs Drozdovs</span> · 2026</p>
        <div className="flex gap-4">{socials.map((s) => <SocialLink key={s.name} social={s}/>)}</div>
      </div>
    </footer>
  )
}
