import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactHomeBlock({ content, styleKit }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
            { threshold: 0.1 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        return () => observer.disconnect();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };
    
    const contactDetails = [
        { icon: MapPin, label: 'Address', value: content?.address, color: theme.primary },
        { icon: Phone, label: 'Phone', value: content?.phone, color: theme.accent },
        { icon: Mail, label: 'Email', value: content?.email, color: theme.primary },
        { icon: Clock, label: 'Hours', value: content?.hours, color: theme.accent }
    ];
    
    return (
        <div 
            ref={sectionRef}
            className="px-6 relative overflow-hidden"
            style={{ 
                paddingTop: `${spacing.sectionY || 72}px`,
                paddingBottom: `${spacing.sectionY || 72}px`,
                backgroundColor: theme.soft || '#F8FAFC'
            }}
        >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${100 + i * 50}px`,
                            height: `${100 + i * 50}px`,
                            left: `${10 + i * 20}%`,
                            top: `${20 + i * 15}%`,
                            backgroundColor: theme.primary,
                            animation: `float ${4 + i}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div 
                        className={`inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4 transition-all duration-700 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                        style={{ 
                            backgroundColor: `${theme.primary}15`,
                            color: theme.primary 
                        }}
                    >
                        Get In Touch
                    </div>
                    
                    <h2 
                        className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                        style={{ fontFamily: fonts.heading, color: theme.text }}
                    >
                        {content?.heading}
                    </h2>
                    
                    <p 
                        className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                        style={{ fontFamily: fonts.body }}
                    >
                        {content?.subheading}
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div 
                        className={`transition-all duration-700 delay-300 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                    >
                        <div 
                            className="rounded-2xl p-8 shadow-xl relative overflow-hidden group"
                            style={{ backgroundColor: 'white' }}
                        >
                            {/* Animated gradient border */}
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ 
                                    background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20)`,
                                    padding: '2px',
                                    borderRadius: '1rem'
                                }}
                            />
                            
                            <div className="relative z-10">
                                {isSubmitted ? (
                                    <div className="text-center py-12 animate-fadeIn">
                                        <CheckCircle 
                                            className="w-20 h-20 mx-auto mb-4 animate-bounce"
                                            style={{ color: theme.primary }}
                                        />
                                        <h3 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
                                            Message Sent!
                                        </h3>
                                        <p className="text-gray-600">We'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <Input
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="h-12 border-2 focus:ring-2 transition-all"
                                                style={{ borderColor: `${theme.primary}30` }}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Your Email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="h-12 border-2 focus:ring-2 transition-all"
                                                style={{ borderColor: `${theme.primary}30` }}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                placeholder="Your Message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                className="min-h-32 border-2 focus:ring-2 transition-all"
                                                style={{ borderColor: `${theme.primary}30` }}
                                                required
                                            />
                                        </div>
                                        <Button 
                                            type="submit"
                                            size="lg"
                                            className={`w-full ${buttonShape} transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
                                            style={{ backgroundColor: theme.primary }}
                                        >
                                            <span 
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                                                style={{ animation: 'shimmer 2s infinite' }}
                                            />
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Send Message
                                                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div 
                        className={`space-y-6 transition-all duration-700 delay-500 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}
                    >
                        {contactDetails.map((detail, idx) => (
                            <div 
                                key={idx}
                                className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div 
                                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                                    style={{ backgroundColor: `${detail.color}15` }}
                                >
                                    <detail.icon 
                                        className="w-7 h-7" 
                                        style={{ color: detail.color }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 
                                        className="font-semibold mb-1 text-gray-500 text-sm"
                                        style={{ fontFamily: fonts.heading }}
                                    >
                                        {detail.label}
                                    </h4>
                                    <p 
                                        className="text-lg font-medium"
                                        style={{ color: theme.text, fontFamily: fonts.body }}
                                    >
                                        {detail.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {/* Image/Map placeholder */}
                        {content?.image_url && (
                            <div className="rounded-2xl overflow-hidden shadow-xl h-64 group">
                                <img 
                                    src={content.image_url} 
                                    alt="Location"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}