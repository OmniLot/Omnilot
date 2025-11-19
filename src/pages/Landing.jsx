import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Footer from '@/components/landing/Footer';

export default function Landing() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <Footer />
        </div>
    );
}