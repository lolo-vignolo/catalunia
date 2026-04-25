/**
 * Tests for CelebrationModal.
 *
 * Run with: npx vitest
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CelebrationModal } from './CelebrationModal';
import type { Card } from '@/types/game';

// ── Mocks ────────────────────────────────────────────────────────────────

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        ({ children, ...rest }: { children?: React.ReactNode; [key: string]: unknown }) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          const { animate, initial, exit, transition, whileHover, ...domProps } = rest;
          void animate; void initial; void exit; void transition; void whileHover;
          return <Tag {...(domProps as object)}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Fixture ──────────────────────────────────────────────────────────────

const mockCard: Card = {
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
  isUnlocked: true,
};

// ── Tests ─────────────────────────────────────────────────────────────────

describe('CelebrationModal — initial state (hidden)', () => {
  it('renders nothing when card is null', () => {
    const { container } = render(
      <CelebrationModal card={null} unlockedCount={0} onClose={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('CelebrationModal — initial state (visible)', () => {
  it('shows "Enhorabona!" heading when card is provided', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /enhorabona/i })).toBeDefined();
  });

  it('displays the town name', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    expect(screen.getByText(/siurana/i)).toBeDefined();
  });

  it('displays the unlocked count and total', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={3} onClose={vi.fn()} />);
    expect(screen.getByText(/3/)).toBeDefined();
    expect(screen.getByText(/20/)).toBeDefined();
  });

  it('renders the card image with descriptive alt text', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    const img = screen.getByAltText('Cromo de Siurana');
    expect(img).toBeDefined();
  });
});

describe('CelebrationModal — close interaction', () => {
  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /tanca/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('CelebrationModal — accessibility', () => {
  it('has role="dialog" on the panel', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('has aria-modal="true"', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
  });

  it('dialog is labelled by the heading (aria-labelledby)', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    const labelledById = dialog.getAttribute('aria-labelledby');
    const heading = document.getElementById(labelledById!);
    expect(heading).toBeDefined();
    expect(heading?.textContent).toMatch(/enhorabona/i);
  });

  it('close button has descriptive aria-label', () => {
    render(<CelebrationModal card={mockCard} unlockedCount={1} onClose={vi.fn()} />);
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toContain('Tanca');
  });
});
