import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';

export default function AboutHomeBlock({ content, styleKit }) {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef(null);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    const variants = styleKit?.variants || {};
    
    const buttonShape = variants.buttonShape === 'rounded-full' ? 'rounded-full' : 'rounded-md';
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                setScrollProgress(progress);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <div 
            ref={sectionRef}
            className="px-6 relative overflow-hidden"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.bg || '#FFFFFF'
            }}
        >
            {/* Animated background elements */}
            <div 
                className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl transition-transform duration-1000"
                style={{ 
                    backgroundColor: theme.primary,
                    transform: `scale(${0.8 + scrollProgress * 0.4}) rotate(${scrollProgress * 45}deg)`
                }}
            />
            <div 
                className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl transition-transform duration-1000"
                style={{ 
                    backgroundColor: theme.accent,
                    transform: `scale(${0.8 + scrollProgress * 0.4}) rotate(${-scrollProgress * 45}deg)`
                }}
            />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div 
                        className={`rounded-2xl overflow-hidden shadow-2xl relative group transition-all duration-1000 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                        }`}
                    >
                        {content?.image_url ? (
                            <>
                                <img 
                                    src={content.image_url} 
                                    alt={content.heading}
                                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{ transform: `translateY(${scrollProgress * -20}px)` }}
                                />
                                {/* Gradient overlay */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${theme.primary}40, ${theme.accent}40)` 
                                    }}
                                />
                                {/* Decorative corner accent */}
                                <div 
                                    className="absolute top-0 right-0 w-32 h-32 opacity-80 transition-transform duration-500 group-hover:scale-110"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${theme.accent}, transparent)`,
                                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                                    }}
                                />
                            </>
                        ) : (
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500">{content?.heading}</p>
                            </div>
                        )}
                        
                        {/* Floating badge */}
                        <div 
                            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                            style={{ backgroundColor: theme.accent }}
                        >
                            <Sparkles className="w-10 h-10 text-white animate-pulse" />
                        </div>
                    </div>
                    
                    <div 
                        className={`transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                        }`}
                    >
                        {/* Section label */}
                        <div 
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse"
                            style={{ 
                                backgroundColor: `${theme.primary}15`,
                                color: theme.primary 
                            }}
                        >
                            About Us
                        </div>
                        
                        <h2 
                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: fonts.heading, color: theme.text }}
                        >
                            {content?.heading}
                            {/* Animated underline */}
                            <div 
                                className="h-1 mt-4 rounded-full transition-all duration-1000"
                                style={{ 
                                    width: isVisible ? '80px' : '0px',
                                    backgroundColor: theme.accent 
                                }}
                            />
                        </h2>
                        
                        <p 
                            className="text-lg text-gray-700 mb-8 leading-relaxed"
                            style={{ fontFamily: fonts.body }}
                        >
                            {content?.paragraph}
                        </p>
                        
                        {/* Stats or features */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { value: '25+', label: 'Years' },
                                { value: '10K+', label: 'Customers' },
                                { value: '98%', label: 'Satisfied' }
                            ].map((stat, idx) => (
                                <div 
                                    key={idx}
                                    className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{ 
                                        backgroundColor: `${theme.primary}10`,
                                        transitionDelay: `${idx * 100}ms`
                                    }}
                                >
                                    <div 
                                        className="text-3xl font-bold mb-1"
                                        style={{ color: theme.primary }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        
                        <Button 
                            size="lg"
                            className={`${buttonShape} transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
                            style={{ backgroundColor: theme.primary }}
                        >
                            {/* Shimmer effect */}
                            <span 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                                style={{ animation: 'shimmer 2s infinite' }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                {content?.button_text}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}