import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        ({ children, ...rest }: { children?: React.ReactNode; [key: string]: unknown }) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          const { animate, initial, transition, ...domProps } = rest;
          void animate; void initial; void transition;
          return <Tag {...(domProps as object)}>{children}</Tag>;
        },
    },
  ),
}));

// ── Initial state ────────────────────────────────────────────────────────

describe('ProgressBar — initial state', () => {
  it('renders the progressbar role', () => {
    render(<ProgressBar unlocked={0} />);
    expect(screen.getByRole('progressbar')).toBeDefined();
  });

  it('shows aria-valuemin=0 and aria-valuemax=20', () => {
    render(<ProgressBar unlocked={0} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('20');
  });

  it('shows aria-valuenow=0 at start', () => {
    render(<ProgressBar unlocked={0} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
  });

  it('displays "0 de 20" in label text', () => {
    render(<ProgressBar unlocked={0} />);
    expect(screen.getByText(/0/)).toBeDefined();
    expect(screen.getByText(/20/)).toBeDefined();
  });
});

// ── Interaction (prop change) ────────────────────────────────────────────

describe('ProgressBar — interaction', () => {
  it('updates aria-valuenow when unlocked changes', () => {
    const { rerender } = render(<ProgressBar unlocked={3} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('3');

    rerender(<ProgressBar unlocked={7} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('7');
  });

  it('reflects full completion at 20', () => {
    render(<ProgressBar unlocked={20} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('20');
  });
});

// ── Accessibility ────────────────────────────────────────────────────────

describe('ProgressBar — accessibility', () => {
  it('progressbar has a descriptive aria-label', () => {
    render(<ProgressBar unlocked={5} />);
    const bar = screen.getByRole('progressbar');
    const label = bar.getAttribute('aria-label');
    expect(label).toContain('5');
    expect(label).toContain('20');
  });
});
