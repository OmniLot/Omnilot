import React, { useState, useEffect } from 'react';
import { Globe, Cog, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom pulse animation for glow effect
const slowPulseStyle = `
  @keyframes slow-pulse {
    0%, 100% {
      opacity: 0.15;
    }
    50% {
      opacity: 0.35;
    }
  }
  .slow-pulse {
    animation: slow-pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

const features = [
    {
        icon: Globe,
        title: "AI Websites",
        description: "Launch a fully-branded, mobile-ready website in minutes",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Cog,
        title: "Automations", 
        description: "Handle leads, messages, and appointments automatically",
        gradient: "from-purple-500 to-blue-500"
    },
    {
        icon: TrendingUp,
        title: "Analytics",
        description: "See which vehicles, ads, and customers drive real sales",
        gradient: "from-green-500 to-blue-500"
    }
];

export default function FeaturesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 pt-0 pb-3 sm:py-20 px-4 sm:px-6 overflow-hidden -mt-4 sm:mt-0">
            <style>{slowPulseStyle}</style>
            {/* Background tech patterns */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent hidden sm:block"></div>
                <div className="absolute top-40 right-1/4 w-96 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent hidden sm:block"></div>
                <div className="absolute bottom-40 left-1/3 w-96 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent hidden sm:block"></div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Mobile Carousel */}
                <div className="md:hidden max-w-4xl mx-auto">
                    <div className="relative h-[240px] flex items-center">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 z-20 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 z-20 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Slides */}
                        <div className="w-full relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center group relative px-4"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                                    
                                    <div className="relative">
                                        <div className="relative mb-3">
                                            <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r ${features[currentIndex].gradient} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 relative`}>
                                                {React.createElement(features[currentIndex].icon, { className: "w-10 h-10 text-white" })}
                                                
                                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${features[currentIndex].gradient} slow-pulse blur-lg group-hover:opacity-50 transition-opacity duration-500`}></div>
                                            </div>
                                            
                                            <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                                            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40 delay-200"></div>
                                        </div>
                                        
                                        <h3 className="text-3xl font-light text-white mb-2 tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                                            {features[currentIndex].title}
                                        </h3>

                                        <p className="text-lg text-gray-300 leading-snug max-w-2xl mx-auto font-light group-hover:text-gray-200 transition-colors duration-300">
                                            {features[currentIndex].description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-3">
                        {features.map((_, index) => (
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
                <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group relative px-4 sm:px-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                            
                            <div className="relative">
                                <div className="relative mb-6 sm:mb-8">
                                    <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 relative`}>
                                        <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                        
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} slow-pulse blur-lg group-hover:opacity-50 transition-opacity duration-500`}></div>
                                    </div>
                                    
                                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-300 delay-200"></div>
                                </div>
                                
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-4 sm:mb-6 tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-sm mx-auto font-light group-hover:text-gray-200 transition-colors duration-300">
                                    {feature.description}
                                </p>

                                {index < features.length - 1 && (
                                    <div className="hidden md:block absolute top-12 -right-6 w-12 h-px bg-gradient-to-r from-blue-400/30 to-transparent"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
