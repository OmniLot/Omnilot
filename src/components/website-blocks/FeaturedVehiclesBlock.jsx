import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

export default function FeaturedVehiclesBlock({ vehicles, styleKit, onApplyNow }) {
    const [visibleCards, setVisibleCards] = useState([]);
    const cardRefs = useRef([]);
    
    const theme = styleKit?.theme || {};
    const variants = styleKit?.variants || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    
    const cardElevated = variants.cardStyle === 'elevated';
    const buttonShape = variants.buttonShape === 'rounded-full' ? 'rounded-full' : 'rounded-md';
    
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
    }, [vehicles]);
    
    return (
        <div 
            className="px-6 relative overflow-hidden"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.soft || '#F8FAFC'
            }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: fonts.heading, color: theme.text }}
                    >
                        Featured Inventory
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vehicles?.map((vehicle, idx) => (
                        <div
                            key={idx}
                            ref={el => cardRefs.current[idx] = el}
                            className={`transition-all duration-700 ${
                                visibleCards.includes(idx) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <Card 
                                className={`overflow-hidden transition-all duration-300 hover:-translate-y-2 group ${
                                    cardElevated ? 'shadow-lg hover:shadow-2xl' : 'border-2 hover:border-gray-300'
                                }`}
                                style={{ borderRadius: `${spacing.radius || 12}px` }}
                            >
                                {/* Featured badge */}
                                {idx === 0 && (
                                    <div 
                                        className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-lg"
                                        style={{ backgroundColor: theme.accent }}
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Featured
                                    </div>
                                )}
                                
                                <div className="h-48 bg-gray-200 overflow-hidden relative">
                                    {vehicle.image_url ? (
                                        <img 
                                            src={vehicle.image_url} 
                                            alt={vehicle.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-4">
                                            <p className="text-xs text-gray-500 text-center">{vehicle.title}</p>
                                        </div>
                                    )}
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                <CardContent className="p-5">
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: fonts.heading }}>
                                        {vehicle.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: fonts.body }}>{vehicle.tagline}</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <p 
                                            className="text-2xl font-bold" 
                                            style={{ color: theme.primary }}
                                        >
                                            {vehicle.price}
                                        </p>
                                        <div 
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12"
                                            style={{ backgroundColor: `${theme.primary}20` }}
                                        >
                                            <Sparkles className="w-5 h-5" style={{ color: theme.primary }} />
                                        </div>
                                    </div>
                                    <ul className="space-y-1 mb-4">
                                        {vehicle.key_features?.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="text-sm text-gray-600 flex items-center">
                                                <span className="mr-2" style={{ color: theme.accent }}>✓</span>{feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button 
                                        className={`w-full ${buttonShape} transition-all duration-300 hover:scale-105 hover:shadow-md`}
                                        style={{ backgroundColor: theme.primary }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}