'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/lib/auth';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ClientDashboard from '@/components/dashboards/ClientDashboard';
import ProviderDashboard from '@/components/dashboards/ProviderDashboard';

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [locale, setLocale] = useState('es');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push(`/${locale}/auth/login`);
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{locale === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Renderizar dashboard según el rol del usuario
  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} locale={locale} />;
    case 'client':
      return <ClientDashboard user={user} locale={locale} />;
    case 'provider':
      return <ProviderDashboard user={user} locale={locale} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-red-600">{locale === 'es' ? 'Rol de usuario no válido' : 'Invalid user role'}</p>
          </div>
        </div>
      );
  }
}
