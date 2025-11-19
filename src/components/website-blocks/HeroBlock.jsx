import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function HeroBlock({ content, styleKit, onApplyNow }) {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    const theme = styleKit?.theme || {};
    const variants = styleKit?.variants || {};
    const fonts = styleKit?.fonts || {};
    
    const buttonShape = variants.buttonShape === 'rounded-full' ? 'rounded-full' : 'rounded-md';
    const isGradient = variants.buttonStyle === 'gradient';
    
    useEffect(() => {
        setIsVisible(true);
        
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const backgroundStyle = content?.background_type === 'photo' ? {
        backgroundImage: `linear-gradient(${content.background_overlay || 'rgba(0,0,0,0.4)'}, ${content.background_overlay || 'rgba(0,0,0,0.4)'}), url('${content.background_image_url || 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1600'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Parallax effect
    } : {
        background: `linear-gradient(135deg, ${theme.primary || '#1B4332'}, ${theme.accent || '#2D6A4F'})`
    };
    
    return (
        <div 
            className="relative min-h-[600px] flex items-center justify-center text-white overflow-hidden"
            style={{
                ...backgroundStyle,
                transform: `translateY(${scrollY * 0.5}px)` // Parallax
            }}
        >
            {/* Animated gradient overlay */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${theme.accent}40, transparent 70%)`,
                    animation: 'pulse 8s ease-in-out infinite'
                }}
            />
            
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
            
            <div className={`max-w-5xl mx-auto text-center px-6 py-24 relative z-10 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <h1 
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                    style={{ 
                        fontFamily: fonts.heading,
                        animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none'
                    }}
                >
                    {content?.headline}
                </h1>
                <p 
                    className="text-xl md:text-2xl mb-10 text-gray-100 leading-relaxed"
                    style={{ 
                        fontFamily: fonts.body,
                        animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none'
                    }}
                >
                    {content?.subheadline}
                </p>
                <div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none' }}
                >
                    <Button 
                        size="lg" 
                        className={`${buttonShape} px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group`}
                        style={isGradient ? {
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                            border: 'none'
                        } : {
                            backgroundColor: theme.primary,
                            border: 'none'
                        }}
                    >
                        {isGradient && (
                            <span 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity"
                                style={{ animation: 'shimmer 2s infinite' }}
                            />
                        )}
                        <span className="relative z-10">{content?.cta_primary}</span>
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline"
                        onClick={onApplyNow}
                        className={`${buttonShape} px-8 py-6 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2`}
                    >
                        {content?.cta_secondary || "Apply for Financing"}
                    </Button>
                </div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                            animation: `float ${3 + i}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
}