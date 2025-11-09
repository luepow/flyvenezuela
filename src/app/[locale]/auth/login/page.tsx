'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, LogIn, Plane, User, Building2, Shield, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Particles from '@/components/effects/Particles';
import ParallaxLayer from '@/components/effects/ParallaxLayer';
import { authenticate, setCurrentUser, MOCK_USERS } from '@/lib/auth';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();
  const [locale, setLocale] = useState('es');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoUsers, setShowDemoUsers] = useState(true);

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const user = authenticate(formData.email, formData.password);

      if (user) {
        setCurrentUser(user);
        router.push(`/${locale}/dashboard`);
      } else {
        setError(locale === 'es' ? 'Credenciales inválidas' : 'Invalid credentials');
      }
    } catch (err) {
      setError(locale === 'es' ? 'Error al iniciar sesión' : 'Login error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
    setShowDemoUsers(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden relative flex items-center">
      {/* Particles Effect */}
      <Particles />

      {/* Animated background blobs with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxLayer speed={0.3}>
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5}>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </ParallaxLayer>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>

      <Container className="relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Company Info */}
          <ParallaxLayer speed={0.2}>
            <div className="text-white space-y-8 animate-fade-in-up">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
              </Link>

              <div>
                <div className="flex items-center mb-4">
                  <Plane className="w-12 h-12 text-blue-300 mr-3" />
                  <h1 className="text-5xl font-bold">FlyVenezuela</h1>
                </div>
                <h2 className="text-3xl font-semibold text-blue-200 mb-4">
                  {locale === 'es' ? 'Acceso al Sistema' : 'System Access'}
                </h2>
                <p className="text-xl text-blue-100">
                  {locale === 'es'
                    ? 'Plataforma de gestión de servicios aeroportuarios'
                    : 'Airport services management platform'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2"></div>
                  <p className="text-blue-100">
                    {locale === 'es'
                      ? 'Gestión completa de planes de vuelo'
                      : 'Complete flight plan management'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2"></div>
                  <p className="text-blue-100">
                    {locale === 'es'
                      ? 'Red de proveedores certificados'
                      : 'Certified provider network'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2"></div>
                  <p className="text-blue-100">
                    {locale === 'es'
                      ? 'Soporte técnico 24/7'
                      : '24/7 technical support'
                    }
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          {/* Right Column - Login Form */}
          <ParallaxLayer speed={0.15}>
            <Card className="shadow-2xl backdrop-blur-sm bg-white/95 animate-fade-in-up animation-delay-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {locale === 'es' ? 'Iniciar Sesión' : 'Login'}
                </h2>
                <p className="text-gray-600">
                  {locale === 'es'
                    ? 'Ingresa tus credenciales para continuar'
                    : 'Enter your credentials to continue'
                  }
                </p>
              </div>

              {showDemoUsers && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-600" />
                    {locale === 'es' ? 'Usuarios de Demostración' : 'Demo Users'}
                  </h3>
                  <div className="space-y-2">
                    {MOCK_USERS.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleDemoLogin(user.email, user.password)}
                        className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{user.avatar}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-blue-600">
                          {user.role === 'admin' && (locale === 'es' ? 'Admin' : 'Admin')}
                          {user.role === 'client' && (locale === 'es' ? 'Cliente' : 'Client')}
                          {user.role === 'provider' && (locale === 'es' ? 'Proveedor' : 'Provider')}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {locale === 'es'
                      ? 'Haz clic en un usuario para autocompletar'
                      : 'Click on a user to autofill'
                    }
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'es' ? 'Correo Electrónico' : 'Email'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder={locale === 'es' ? 'tu@email.com' : 'your@email.com'}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'es' ? 'Contraseña' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
                  disabled={loading}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  {loading ? (locale === 'es' ? 'Iniciando sesión...' : 'Logging in...') : (locale === 'es' ? 'Iniciar Sesión' : 'Login')}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  {locale === 'es' ? '¿No tienes una cuenta?' : "Don't have an account?"}{' '}
                  <Link
                    href={`/${locale}/auth/register`}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {locale === 'es' ? 'Regístrate' : 'Register'}
                  </Link>
                </div>
              </form>
            </Card>
          </ParallaxLayer>
        </div>
      </Container>
    </div>
  );
}
