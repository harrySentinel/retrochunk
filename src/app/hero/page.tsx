import { HeroDotSection } from '@/components/blocks';

export default function HeroPage() {
  return (
    <HeroDotSection
      logo="RetroChunk"
      badge="Now in open beta"
      headline={"UI components\nthat feel"}
      accent="alive."
      subheadline="Canvas-powered, pixel-perfect React components. Drop one line of code and watch your product breathe."
      ctaPrimary={{ text: 'Start building free', href: '/' }}
      ctaSecondary={{ text: 'See all components →', href: '/' }}
      stats={[
        { value: '60fps', label: 'Buttery smooth' },
        { value: '0', label: 'Peer deps' },
        { value: '14k+', label: 'Developers' },
      ]}
      avatarCount={5}
    />
  );
}
