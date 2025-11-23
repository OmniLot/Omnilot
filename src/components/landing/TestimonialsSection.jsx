import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: "Michael Thompson",
        role: "General Manager",
        company: "Thompson Auto Group",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        rating: 5,
        text: "Omni.Lot transformed our dealership. Our lead response time went from hours to seconds, and our conversion rate increased by 43%. The AI tools are incredible."
    },
    {
        name: "Sarah Martinez",
        role: "Marketing Director",
        company: "Coastal RV Center",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        rating: 5,
        text: "The website builder and social media automation saved us thousands in agency fees. We're generating more content than ever and seeing real results."
    },
    {
        name: "David Chen",
        role: "Owner",
        company: "Chen Marine Sales",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        rating: 5,
        text: "As a smaller dealership, Omni.Lot gave us enterprise-level tools at an affordable price. The AI chatbot handles 80% of initial inquiries perfectly."
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-8 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-8 sm:mb-16 px-4 hidden md:block">
                    <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                        Trusted by <span className="text-blue-400">Leading Dealerships</span>
                    </h2>
                    <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        See how dealerships like yours are growing with Omni.Lot
                    </p>
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden relative hidden">
                    <div className="relative h-[500px] flex items-center px-4">
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = Math.abs(offset.x) * velocity.x;
                                        if (swipe < -10000) {
                                            nextSlide();
                                        } else if (swipe > 10000) {
                                            prevSlide();
                                        }
                                    }}
                                    className="cursor-grab active:cursor-grabbing"
                                >
                                    <Card className="bg-gray-800/50 border-gray-700">
                                        <CardContent className="p-6">
                                            <Quote className="w-10 h-10 text-blue-400 mb-4 opacity-50" />
                                            
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>

                                            <p className="text-base text-gray-300 mb-6 leading-relaxed">
                                                &ldquo;{testimonials[currentIndex].text}&rdquo;
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <img 
                                                    src={testimonials[currentIndex].image} 
                                                    alt={testimonials[currentIndex].name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="text-base text-white font-semibold">{testimonials[currentIndex].name}</p>
                                                    <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                                                    <p className="text-sm text-blue-400">{testimonials[currentIndex].company}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'w-8 bg-blue-500' 
                                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]">
                            <CardContent className="p-4 sm:p-6">
                                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mb-3 sm:mb-4 opacity-50" />
                                
                                <div className="flex gap-1 mb-3 sm:mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                <div className="flex items-center gap-3 sm:gap-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm sm:text-base text-white font-semibold">{testimonial.name}</p>
                                        <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                                        <p className="text-xs sm:text-sm text-blue-400">{testimonial.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Stats section */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gray-700 px-2">
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">500+</div>
                        <div className="text-xs sm:text-sm md:text-base text-gray-400">Active Dealerships</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">43%</div>
                        <div className="text-xs sm:text-sm md:text-base text-gray-400">Avg Lead Increase</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">24/7</div>
                        <div className="text-xs sm:text-sm md:text-base text-gray-400">AI Support</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">98%</div>
                        <div className="text-xs sm:text-sm md:text-base text-gray-400">Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
