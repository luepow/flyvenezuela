'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, Plane } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const otherLocale = locale === 'es' ? 'en' : 'es';

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">
              Fly<span className="text-primary-600">Venezuela</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}#services`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('nav.services')}
            </Link>
            <Link href={`/${locale}#about`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('nav.about')}
            </Link>
            <Link href={`/${locale}#contact`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('nav.contact')}
            </Link>

            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <Link href={`/${locale}/auth/login`}>
              <Button variant="outline" size="sm">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href={`/${locale}/auth/register`}>
              <Button size="sm">
                {t('nav.register')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href={`/${locale}#services`}
              className="block text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              href={`/${locale}#about`}
              className="block text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="block text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link href={`/${otherLocale}`} className="block">
              <Button variant="ghost" size="sm" className="w-full">
                {otherLocale === 'es' ? 'Español' : 'English'}
              </Button>
            </Link>
            <Link href={`/${locale}/auth/login`} className="block">
              <Button variant="outline" size="sm" className="w-full">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href={`/${locale}/auth/register`} className="block">
              <Button size="sm" className="w-full">
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
