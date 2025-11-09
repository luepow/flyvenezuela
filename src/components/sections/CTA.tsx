import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function CTA({ locale }: { locale: string }) {
  const t = useTranslations('cta');

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
      <Container>
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <Link href={`/${locale}/auth/register`}>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 group">
              {t('button')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
