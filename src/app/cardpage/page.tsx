// Server Component — exports generateMetadata for dynamic <title>.
// ⚠️ Never change this route (/cardpage) or the ?id= param:
//    physical QR codes in print point to these exact URLs.
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { cardsData } from '@/data/cardData';
import Pergamino from '@/prepages/Pergamino';

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams;
  const card = cardsData.find((c) => c.passwordImg === id);
  const townName = card?.titles[0] ?? 'Cromo';
  return {
    title: `Cromo de ${townName} — L'aventura dels 700 anys`,
  };
}

export default function CardPage() {
  return (
    <Suspense>
      <Pergamino />
    </Suspense>
  );
}
