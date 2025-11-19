import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

export default function HeaderBlock({ content, styleKit, onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const variants = styleKit?.variants || {};
    
    const isGlass = variants.navStyle === 'transparent-glass';
    const buttonShape = variants.buttonShape === 'rounded-full' ? 'rounded-full' : 'rounded-md';
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleMenuClick = (menuItem) => {
        if (onNavigate) {
            // Map menu items to page names
            const pageMap = {
                'Home': 'home',
                'Inventory': 'inventory',
                'Financing': 'financing',
                'About': 'about',
                'Contact': 'contact'
            };
            const pageName = pageMap[menuItem] || 'home';
            onNavigate(pageName);
        }
        setMobileMenuOpen(false);
    };
    
    return (
        <>
            <header 
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled 
                        ? 'shadow-lg backdrop-blur-xl' 
                        : 'shadow-none'
                } ${
                    isGlass 
                        ? 'bg-white/80 backdrop-blur-md border-b' 
                        : 'bg-white border-b'
                }`}
                style={{ 
                    borderColor: scrolled ? theme.soft : 'transparent',
                    transform: scrolled ? 'translateY(0)' : 'translateY(0)'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo with animation */}
                    <div 
                        className="text-2xl font-bold relative group cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: fonts.heading, color: theme.primary }}
                        onClick={() => handleMenuClick('Home')}
                    >
                        {content?.logo_text}
                        
                        {/* Animated underline */}
                        <div 
                            className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                            style={{ backgroundColor: theme.accent }}
                        />
                        
                        {/* Glow effect */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                            style={{ backgroundColor: theme.primary }}
                        />
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {content?.menu?.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleMenuClick(item)}
                                className="relative font-medium transition-all duration-300 hover:scale-110 group"
                                style={{ 
                                    color: theme.text, 
                                    fontFamily: fonts.body,
                                    animationDelay: `${idx * 50}ms`
                                }}
                            >
                                {item}
                                
                                {/* Animated underline */}
                                <span 
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                                    style={{ backgroundColor: theme.accent }}
                                />
                                
                                {/* Dot indicator */}
                                <span 
                                    className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: theme.accent }}
                                />
                            </button>
                        ))}
                    </nav>
                    
                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button 
                            className={`${buttonShape} transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group`}
                            style={{ backgroundColor: theme.primary }}
                            onClick={() => handleMenuClick('Contact')}
                        >
                            <span 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                                style={{ animation: 'shimmer 2s infinite' }}
                            />
                            <span className="relative z-10">{content?.cta_button}</span>
                        </Button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 rounded-lg transition-all hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" style={{ color: theme.primary }} />
                        ) : (
                            <Menu className="w-6 h-6" style={{ color: theme.primary }} />
                        )}
                    </button>
                </div>
                
                {/* Progress bar */}
                <div 
                    className="h-0.5 transition-all duration-300 origin-left"
                    style={{ 
                        backgroundColor: theme.accent,
                        transform: `scaleX(${scrolled ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0})`
                    }}
                />
            </header>
            
            {/* Mobile Menu */}
            <div 
                className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
                    mobileMenuOpen 
                        ? 'opacity-100 pointer-events-auto' 
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu Panel */}
                <div 
                    className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="p-6 space-y-6">
                        <div className="text-right">
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-all"
                            >
                                <X className="w-6 h-6" style={{ color: theme.primary }} />
                            </button>
                        </div>
                        
                        <nav className="space-y-4">
                            {content?.menu?.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleMenuClick(item)}
                                    className="block w-full text-left p-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                                    style={{ 
                                        backgroundColor: `${theme.primary}10`,
                                        color: theme.text,
                                        fontFamily: fonts.body,
                                        fontWeight: 600
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                        
                        <Button 
                            className={`w-full ${buttonShape} py-6`}
                            style={{ backgroundColor: theme.primary }}
                            onClick={() => handleMenuClick('Contact')}
                        >
                            {content?.cta_button}
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
        </>
    );
}