/**
 * Tests for GameCard component.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run with: npx vitest
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameCard } from './GameCard';
import type { Card } from '@/types/game';

// ── Minimal mock for next/image ──────────────────────────────────────────
vi.mock('next/image', () => ({
  default: (props: { alt: string; src: string; fill?: boolean; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={typeof props.src === 'string' ? props.src : ''} />;
  },
}));

// ── Minimal mock for next/link ───────────────────────────────────────────
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// ── Minimal mock for framer-motion ───────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        ({ children, ...rest }: { children?: React.ReactNode; [key: string]: unknown }) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          // Strip framer-specific props so DOM doesn't warn
          const { animate, initial, whileHover, transition, ...domProps } = rest;
          void animate; void initial; void whileHover; void transition;
          return <Tag {...(domProps as object)}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Fixture ──────────────────────────────────────────────────────────────
const baseCard: Card = {
  id: '1',
  slug: 'siurana',
  townName: 'Siurana',
  titles: ['Siurana'],
  imagePath: '/images/cardsBlackAndWhite/cat-bn-1.png',
  colorImagePath: '/images/cardsColor/700-Prades-Pilarin-1.webp',
  borderColor: '#84be94',
  passwordImg: '86753098',
  poem: {
    row1: 'El bon rei Jaume II',
    row2: 'ha estat molt espavilat',
    row3: 'en fer néixer un comtat',
    row4: 'per tenir a ratlla els barons.',
  },
  mapLink: 'https://maps.google.com',
  isUnlocked: false,
};

// ── Tests ─────────────────────────────────────────────────────────────────

describe('GameCard — initial state (locked)', () => {
  it('renders the town name', () => {
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={vi.fn()} index={0} />);
    expect(screen.getByText('Siurana')).toBeDefined();
  });

  it('shows the lock icon when locked', () => {
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={vi.fn()} index={0} />);
    expect(screen.getByText('🔒')).toBeDefined();
  });

  it('does NOT render a link to /cardpage when locked', () => {
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={vi.fn()} index={0} />);
    const links = screen.queryAllByRole('link');
    const cardPageLink = links.find((l) =>
      (l as HTMLAnchorElement).href?.includes('/cardpage'),
    );
    expect(cardPageLink).toBeUndefined();
  });
});

describe('GameCard — initial state (unlocked)', () => {
  const unlockedCard: Card = { ...baseCard, isUnlocked: true };

  it('does NOT show the lock icon when unlocked', () => {
    render(<GameCard card={unlockedCard} isUnlocked onUnlock={vi.fn()} index={0} />);
    expect(screen.queryByText('🔒')).toBeNull();
  });

  it('renders a link to /cardpage?id= when unlocked', () => {
    render(<GameCard card={unlockedCard} isUnlocked onUnlock={vi.fn()} index={0} />);
    const link = screen.getByRole('link');
    expect((link as HTMLAnchorElement).href).toContain('/cardpage?id=86753098');
  });
});

describe('GameCard — click interaction', () => {
  it('calls onUnlock when a locked card is clicked', () => {
    const onUnlock = vi.fn();
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={onUnlock} index={0} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onUnlock when an unlocked card is clicked', () => {
    const onUnlock = vi.fn();
    const unlockedCard: Card = { ...baseCard, isUnlocked: true };
    render(<GameCard card={unlockedCard} isUnlocked onUnlock={onUnlock} index={0} />);
    // unlocked card renders a <Link>, no button
    expect(screen.queryByRole('button')).toBeNull();
    expect(onUnlock).not.toHaveBeenCalled();
  });
});

describe('GameCard — accessibility', () => {
  it('article has aria-label with town name and locked state', () => {
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={vi.fn()} index={0} />);
    const article = screen.getByRole('listitem');
    const label = article.getAttribute('aria-label');
    expect(label).toContain('Siurana');
    expect(label).toContain('per descobrir');
  });

  it('article has aria-label with town name and unlocked state', () => {
    const unlockedCard: Card = { ...baseCard, isUnlocked: true };
    render(<GameCard card={unlockedCard} isUnlocked onUnlock={vi.fn()} index={0} />);
    const article = screen.getByRole('listitem');
    const label = article.getAttribute('aria-label');
    expect(label).toContain('Siurana');
    expect(label).toContain("col·leccionat");
  });

  it('unlock button has descriptive aria-label', () => {
    render(<GameCard card={baseCard} isUnlocked={false} onUnlock={vi.fn()} index={0} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toContain('Siurana');
  });
});
