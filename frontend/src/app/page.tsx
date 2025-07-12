import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className='min-h-screen text-white'>
      <Navbar />
      <Hero />
    </div>
  );
}
