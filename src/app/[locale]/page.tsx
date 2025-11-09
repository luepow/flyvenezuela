import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Services from '@/components/sections/Services';
import QuoteForm from '@/components/sections/QuoteForm';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <Features locale={locale} />
      <Services locale={locale} />
      <QuoteForm locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
