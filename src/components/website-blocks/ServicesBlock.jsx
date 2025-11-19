import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesBlock({ services, styleKit }) {
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    const variants = styleKit?.variants || {};
    
    const cardElevated = variants.cardStyle === 'elevated';
    
    return (
        <div 
            className="px-6"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.bg || '#FFFFFF'
            }}
        >
            <div className="max-w-7xl mx-auto">
                <h2 
                    className="text-4xl md:text-5xl font-bold text-center mb-12"
                    style={{ fontFamily: fonts.heading, color: theme.text }}
                >
                    Our Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services?.map((service, idx) => (
                        <Card 
                            key={idx} 
                            className={`transition-all duration-300 hover:-translate-y-1 ${
                                cardElevated ? 'shadow-md hover:shadow-xl' : 'border-2 hover:border-gray-300'
                            }`}
                            style={{ borderRadius: `${spacing.radius || 12}px` }}
                        >
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-5">{service.icon_emoji}</div>
                                <h3 
                                    className="font-bold text-xl mb-4" 
                                    style={{ color: theme.primary, fontFamily: fonts.heading }}
                                >
                                    {service.title}
                                </h3>
                                <p 
                                    className="text-gray-600 leading-relaxed"
                                    style={{ fontFamily: fonts.body }}
                                >
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}