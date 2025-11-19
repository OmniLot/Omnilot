import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp, Star } from 'lucide-react';

export default function FinancingHomeBlock({ content, styleKit, onApplyNow }) {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardRefs = useRef([]);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    const variants = styleKit?.variants || {};
    
    const buttonShape = variants.buttonShape === 'rounded-full' ? 'rounded-full' : 'rounded-md';
    const cardElevated = variants.cardStyle === 'elevated';
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target);
                        setVisibleCards(prev => [...prev, index]);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        
        return () => observer.disconnect();
    }, [content?.plans]);
    
    return (
        <div 
            className="px-6 relative overflow-hidden"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.soft || '#F8FAFC'
            }}
        >
            {/* Animated background gradients */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div 
                    className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{ 
                        backgroundColor: theme.primary,
                        animationDuration: '4s'
                    }}
                />
                <div 
                    className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{ 
                        backgroundColor: theme.accent,
                        animationDuration: '6s',
                        animationDelay: '1s'
                    }}
                />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div 
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce"
                        style={{ 
                            backgroundColor: `${theme.primary}15`,
                            color: theme.primary 
                        }}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Financing Options
                    </div>
                    
                    <h2 
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: fonts.heading, color: theme.text }}
                    >
                        {content?.heading}
                    </h2>
                    
                    <p 
                        className="text-lg text-gray-700 max-w-3xl mx-auto"
                        style={{ fontFamily: fonts.body }}
                    >
                        {content?.paragraph}
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {content?.plans?.map((plan, idx) => (
                        <div
                            key={idx}
                            ref={el => cardRefs.current[idx] = el}
                            className={`transition-all duration-700 ${
                                visibleCards.includes(idx) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <Card 
                                className={`h-full relative overflow-hidden transition-all duration-500 group ${
                                    cardElevated ? 'shadow-lg hover:shadow-2xl' : 'border-2 hover:border-gray-300'
                                } ${hoveredCard === idx ? 'scale-105' : 'scale-100'}`}
                                style={{ borderRadius: `${spacing.radius || 12}px` }}
                            >
                                {/* Recommended badge */}
                                {idx === 1 && (
                                    <div 
                                        className="absolute top-0 right-0 px-6 py-2 text-white text-xs font-bold flex items-center gap-1 shadow-lg"
                                        style={{ 
                                            backgroundColor: theme.accent,
                                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
                                        }}
                                    >
                                        <Star className="w-3 h-3 fill-white" />
                                        POPULAR
                                    </div>
                                )}
                                
                                {/* Animated gradient background */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                                    }}
                                />
                                
                                <CardContent className="p-8 relative z-10">
                                    {/* Icon */}
                                    <div 
                                        className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                        style={{ backgroundColor: `${theme.primary}15` }}
                                    >
                                        <span className="text-3xl">{['💰', '🚀', '⭐'][idx]}</span>
                                    </div>
                                    
                                    <h3 
                                        className="text-2xl font-bold mb-2 text-center transition-colors duration-300" 
                                        style={{ 
                                            color: hoveredCard === idx ? theme.primary : theme.text, 
                                            fontFamily: fonts.heading 
                                        }}
                                    >
                                        {plan.name}
                                    </h3>
                                    
                                    <p className="text-gray-600 mb-6 text-center" style={{ fontFamily: fonts.body }}>
                                        {plan.description}
                                    </p>
                                    
                                    {/* Details */}
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { label: 'Down Payment', value: plan.down_payment },
                                            { label: 'APR', value: plan.apr },
                                            { label: 'Terms', value: plan.terms }
                                        ].map((detail, i) => (
                                            <div 
                                                key={i}
                                                className="flex justify-between items-center p-3 rounded-lg transition-all duration-300 hover:scale-105"
                                                style={{ backgroundColor: `${theme.primary}05` }}
                                            >
                                                <span className="text-sm font-semibold text-gray-600">{detail.label}</span>
                                                <span 
                                                    className="font-bold"
                                                    style={{ color: theme.primary }}
                                                >
                                                    {detail.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        className={`w-full ${buttonShape} transition-all duration-300 hover:scale-105 relative overflow-hidden group/btn`}
                                        variant="outline"
                                        style={{ 
                                            borderColor: theme.primary, 
                                            color: hoveredCard === idx ? 'white' : theme.primary,
                                            backgroundColor: hoveredCard === idx ? theme.primary : 'transparent'
                                        }}
                                    >
                                        <span 
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transition-opacity"
                                            style={{ animation: 'shimmer 2s infinite' }}
                                        />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {plan.cta}
                                            <Check className="w-4 h-4" />
                                        </span>
                                    </Button>
                                </CardContent>
                                
                                {/* Corner decoration */}
                                <div 
                                    className="absolute bottom-0 right-0 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:scale-110"
                                    style={{ 
                                        background: `linear-gradient(135deg, transparent, ${theme.accent})`,
                                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                                    }}
                                />
                            </Card>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <Button 
                        size="lg"
                        onClick={onApplyNow}
                        className={`${buttonShape} px-10 py-6 text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl relative overflow-hidden group`}
                        style={{ backgroundColor: theme.primary }}
                    >
                        <span 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                            style={{ animation: 'shimmer 2s infinite' }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            {content?.main_cta || "Apply for Financing"}
                            <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Button>
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