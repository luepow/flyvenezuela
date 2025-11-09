'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Building, UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [locale, setLocale] = useState('es');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    userType: 'client' as 'client' | 'provider',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      // Aquí iría la lógica de registro real
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Guardar usuario y redirigir
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        fullName: formData.fullName,
        userType: formData.userType
      }));

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 py-12 px-4">
      <Container className="max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('register_title')}
          </h1>
          <p className="text-gray-600">
            FlyVenezuela
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder={t('full_name')}
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t('phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  name="company"
                  placeholder={t('company')}
                  value={formData.company}
                  onChange={handleChange}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  name="password"
                  placeholder={t('password')}
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder={t('confirm_password')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('user_type')}
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="client">{t('user_type_client')}</option>
                <option value="provider">{t('user_type_provider')}</option>
              </select>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? 'Creando cuenta...' : t('register_button')}
            </Button>

            <div className="text-center text-sm text-gray-600">
              {t('have_account')}{' '}
              <Link
                href={`/${locale}/auth/login`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('login_link')}
              </Link>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href={`/${locale}`}
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </Container>
    </div>
  );
}
