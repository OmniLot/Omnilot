import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';

export default function TestimonialsBlock({ testimonials, styleKit }) {
    const [visibleCards, setVisibleCards] = useState([]);
    const cardRefs = useRef([]);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    const variants = styleKit?.variants || {};
    
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
    }, [testimonials]);
    
    // Generate avatar colors based on name
    const getAvatarColor = (name) => {
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
        const index = name?.charCodeAt(0) % colors.length;
        return colors[index];
    };
    
    return (
        <div 
            className="px-6 relative"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.soft || '#F8FAFC'
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: fonts.heading, color: theme.text }}
                    >
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 text-lg" style={{ fontFamily: fonts.body }}>
                        Real stories from real people
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials?.map((testimonial, idx) => (
                        <div
                            key={idx}
                            ref={el => cardRefs.current[idx] = el}
                            className={`transition-all duration-700 ${
                                visibleCards.includes(idx) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <Card 
                                className={`h-full transition-all duration-300 hover:-translate-y-1 group ${
                                    cardElevated ? 'shadow-md hover:shadow-xl' : 'border-2 hover:border-gray-300'
                                }`}
                                style={{ borderRadius: `${spacing.radius || 12}px` }}
                            >
                                <CardContent className="p-6 flex flex-col h-full">
                                    {/* Quote icon */}
                                    <div className="mb-4">
                                        <Quote 
                                            className="w-10 h-10 opacity-20 transition-opacity group-hover:opacity-30" 
                                            style={{ color: theme.primary }}
                                        />
                                    </div>
                                    
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-transform hover:scale-125" 
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Quote */}
                                    <p 
                                        className="text-gray-700 mb-5 italic leading-relaxed flex-grow"
                                        style={{ fontFamily: fonts.body }}
                                    >
                                        "{testimonial.quote}"
                                    </p>
                                    
                                    {/* Customer info with avatar */}
                                    <div className="border-t pt-4 flex items-center gap-3" style={{ borderColor: theme.soft }}>
                                        <div 
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 relative"
                                            style={{ 
                                                backgroundColor: getAvatarColor(testimonial.customer_name),
                                                animation: 'pulse 3s ease-in-out infinite'
                                            }}
                                        >
                                            {testimonial.customer_name?.charAt(0)}
                                            <div 
                                                className="absolute inset-0 rounded-full animate-ping opacity-20"
                                                style={{ backgroundColor: getAvatarColor(testimonial.customer_name) }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold" style={{ color: theme.text }}>{testimonial.customer_name}</p>
                                            <p className="text-sm text-gray-600">{testimonial.location}</p>
                                            <p className="text-xs mt-1 font-medium" style={{ color: theme.accent }}>
                                                {testimonial.vehicle_purchased}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}