import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plane, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">
                Fly<span className="text-primary-400">Venezuela</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}#services`} className="hover:text-primary-400 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#about`} className="hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#contact`} className="hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/auth/login`} className="hover:text-primary-400 transition-colors">
                  {t('nav.login')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FlyVenezuela. {t('footer.rights')}</p>
        </div>
      </Container>
    </footer>
  );
}
