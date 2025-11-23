import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function GalleryBlock({ content, styleKit }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleImages, setVisibleImages] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const imageRefs = useRef([]);
    const sectionRef = useRef(null);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    const spacing = styleKit?.spacing || {};
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = imageRefs.current.indexOf(entry.target);
                        setVisibleImages(prev => [...prev, index]);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        imageRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        
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
    }, [content?.images]);

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        const currentIndex = content?.images?.findIndex(img => img.image_url === selectedImage.image_url);
        const newIndex = direction === 'next' 
            ? (currentIndex + 1) % content.images.length 
            : (currentIndex - 1 + content.images.length) % content.images.length;
        setSelectedImage(content.images[newIndex]);
    };
    
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
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div 
                    className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000" 
                    style={{ 
                        backgroundColor: theme.primary,
                        transform: `translateX(${scrollProgress * 100}px) scale(${0.8 + scrollProgress * 0.4})`
                    }} 
                />
                <div 
                    className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000" 
                    style={{ 
                        backgroundColor: theme.accent,
                        transform: `translateX(-${scrollProgress * 100}px) scale(${0.8 + scrollProgress * 0.4})`
                    }} 
                />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with cinematic effect */}
                <div className="text-center mb-12 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Play className="w-32 h-32 animate-pulse" style={{ color: theme.primary }} />
                    </div>
                    <h2 
                        className="text-5xl md:text-6xl font-bold mb-4 inline-block relative"
                        style={{ fontFamily: fonts.heading, color: theme.text }}
                    >
                        {content?.heading}
                        <div 
                            className="absolute -bottom-3 left-1/2 h-1 rounded-full transition-all duration-1000"
                            style={{ 
                                width: `${scrollProgress * 120}px`,
                                backgroundColor: theme.accent,
                                transform: 'translateX(-50%)'
                            }}
                        />
                    </h2>
                    <p 
                        className="text-xl text-gray-700 mt-6 max-w-3xl mx-auto"
                        style={{ fontFamily: fonts.body }}
                    >
                        {content?.subheading}
                    </p>
                </div>
                
                {/* Cinematic Gallery Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {(Array.isArray(content?.images) ? content.images : []).map((item, idx) => (
                        <div 
                            key={idx}
                            ref={el => imageRefs.current[idx] = el}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-700 ${
                                visibleImages.includes(idx) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                            } ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                            style={{ 
                                height: idx === 0 ? '600px' : '288px',
                                transitionDelay: `${idx * 100}ms`
                            }}
                            onClick={() => setSelectedImage(item)}
                        >
                            {item.image_url ? (
                                <>
                                    {/* Image with parallax effect */}
                                    <img 
                                        src={item.image_url} 
                                        alt={item.caption}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        style={{
                                            transform: `scale(${1 + scrollProgress * 0.05})`
                                        }}
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                        style={{ 
                                            background: `linear-gradient(to top, ${theme.primary}dd 0%, ${theme.primary}88 50%, transparent 100%)` 
                                        }}
                                    />
                                    
                                    {/* Hover Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <ZoomIn 
                                            className="w-12 h-12 text-white mb-3 animate-pulse" 
                                            style={{ animationDuration: '2s' }}
                                        />
                                        <p 
                                            className="text-white text-xl md:text-2xl font-semibold text-center"
                                            style={{ fontFamily: fonts.heading }}
                                        >
                                            {item.caption}
                                        </p>
                                    </div>
                                    
                                    {/* Corner Badge */}
                                    <div 
                                        className="absolute top-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${theme.accent}, transparent)`,
                                            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                                        }}
                                    />
                                    
                                    {/* Glow Ring */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                        style={{ 
                                            boxShadow: `inset 0 0 100px ${theme.accent}80`
                                        }}
                                    />

                                    {/* Number Badge */}
                                    <div 
                                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl backdrop-blur-md transition-all group-hover:scale-125"
                                        style={{ backgroundColor: `${theme.primary}90` }}
                                    >
                                        {idx + 1}
                                    </div>
                                </>
                            ) : (
                                <div 
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ backgroundColor: theme.soft }}
                                >
                                    <p className="text-gray-500 text-center px-4">{item.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div 
                        className="inline-block px-8 py-4 rounded-full text-white font-semibold text-lg cursor-pointer transition-all hover:scale-110 hover:shadow-2xl relative overflow-hidden group"
                        style={{ backgroundColor: theme.primary }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20" style={{ animation: 'shimmer 2s infinite' }} />
                        <span className="relative z-10 flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            View Full Experience
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Lightbox Modal with Navigation */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-7 h-7 text-white" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 z-50"
                        onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                    >
                        <ChevronLeft className="w-7 h-7 text-white" />
                    </button>

                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 z-50"
                        onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                    >
                        <ChevronRight className="w-7 h-7 text-white" />
                    </button>
                    
                    {/* Image */}
                    <div className="max-w-6xl w-full animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={selectedImage.image_url} 
                            alt={selectedImage.caption}
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                        <div className="mt-6 text-center">
                            <p 
                                className="text-white text-2xl font-semibold"
                                style={{ fontFamily: fonts.heading }}
                            >
                                {selectedImage.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}