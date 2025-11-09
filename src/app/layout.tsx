import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlyVenezuela - Servicios Aeroportuarios Profesionales',
  description: 'Planifica tu vuelo en Venezuela con facilidad. Cotiza y gestiona servicios aeroportuarios para pilotos y empresas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
