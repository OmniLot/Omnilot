import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function FooterBlock({ content, styleKit, onNavigate }) {
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    
    const socialIcons = {
        'Facebook': Facebook,
        'facebook': Facebook,
        'Instagram': Instagram,
        'instagram': Instagram,
        'Twitter': Twitter,
        'twitter': Twitter,
        'LinkedIn': Linkedin,
        'linkedin': Linkedin,
        'Linkedin': Linkedin
    };

    const handleLinkClick = (linkText) => {
        if (onNavigate) {
            // Map link text to page names
            const pageMap = {
                'Home': 'home',
                'Inventory': 'inventory',
                'Financing': 'financing',
                'About': 'about',
                'Contact': 'contact',
                'About Us': 'about',
                'Contact Us': 'contact'
            };
            const pageName = pageMap[linkText];
            if (pageName) {
                onNavigate(pageName);
            }
        }
    };
    
    return (
        <footer 
            className="relative overflow-hidden"
            style={{ 
                backgroundColor: theme.text || '#1F2937',
                paddingTop: `${spacing?.sectionY || 72}px`,
                paddingBottom: `${spacing?.inner || 32}px`
            }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.accent }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.primary }} />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Tagline */}
                    <div className="md:col-span-1">
                        <div 
                            className="text-2xl font-bold mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ fontFamily: fonts.heading, color: 'white' }}
                            onClick={() => handleLinkClick('Home')}
                        >
                            {content?.logo_text}
                        </div>
                        <p className="text-gray-400 mb-6" style={{ fontFamily: fonts.body }}>
                            {content?.tagline}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {content?.social_links?.map((social, idx) => {
                                const IconComponent = socialIcons[social.platform];
                                return IconComponent ? (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                                        style={{ backgroundColor: `${theme.primary}30` }}
                                    >
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </a>
                                ) : null;
                            })}
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-white font-bold mb-4" style={{ fontFamily: fonts.heading }}>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {content?.quick_links?.map((link, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => handleLinkClick(link.text)}
                                        className="text-gray-400 hover:text-white transition-colors text-left"
                                        style={{ fontFamily: fonts.body }}
                                    >
                                        {link.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="md:col-span-1">
                        <h3 className="text-white font-bold mb-4" style={{ fontFamily: fonts.heading }}>
                            Contact
                        </h3>
                        <ul className="space-y-3 text-gray-400" style={{ fontFamily: fonts.body }}>
                            <li className="hover:text-white transition-colors">
                                📍 {content?.address}
                            </li>
                            <li>
                                <a href={`tel:${content?.phone}`} className="hover:text-white transition-colors">
                                    📞 {content?.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${content?.email}`} className="hover:text-white transition-colors">
                                    ✉️ {content?.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Hours */}
                    <div className="md:col-span-1">
                        <h3 className="text-white font-bold mb-4" style={{ fontFamily: fonts.heading }}>
                            Hours
                        </h3>
                        <p className="text-gray-400 whitespace-pre-line" style={{ fontFamily: fonts.body }}>
                            {content?.hours}
                        </p>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm" style={{ fontFamily: fonts.body }}>
                            {content?.copyright}
                        </p>
                        <div className="flex gap-6 text-sm">
                            <button className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </button>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}