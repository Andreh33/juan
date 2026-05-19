import { Hero } from '@/components/home/Hero';
import { HoursStrip } from '@/components/home/HoursStrip';
import { Bento } from '@/components/home/Bento';
import { DishSelection } from '@/components/home/DishSelection';
import { Storytelling } from '@/components/home/Storytelling';
import { Gallery } from '@/components/home/Gallery';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaReservas } from '@/components/home/CtaReservas';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HoursStrip />
      <Bento />
      <DishSelection />
      <Storytelling />
      <Gallery />
      <Testimonials />
      <CtaReservas />
    </>
  );
}
