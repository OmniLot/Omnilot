import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users, Zap, Heart } from 'lucide-react';

export default function AboutBlock({ about, styleKit }) {
    const [hoveredTeam, setHoveredTeam] = useState(null);
    const [activeValue, setActiveValue] = useState(0);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};

    const valueIcons = [Award, Target, Users, Zap, Heart];
    
    return (
        <div className="bg-white">
            {/* Hero with Parallax */}
            <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0">
                    {about?.hero_image_url && (
                        <img 
                            src={about.hero_image_url} 
                            alt="About Hero" 
                            className="w-full h-full object-cover opacity-30"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold mb-6 animate-slideDown" style={{ fontFamily: fonts.heading }}>{about?.hero_title}</h1>
                    <p className="text-2xl text-gray-300 animate-slideUp" style={{ fontFamily: fonts.body }}>{about?.hero_subtitle}</p>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-20 px-6 relative overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.primary }} />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            {about?.story?.image_url && (
                                <div className="relative group">
                                    <img 
                                        src={about.story.image_url} 
                                        alt="Story" 
                                        className="w-full rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6" style={{ color: theme.primary, fontFamily: fonts.heading }}>{about?.story?.title}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line" style={{ fontFamily: fonts.body }}>{about?.story?.content}</p>
                            <p className="text-2xl font-semibold flex items-center gap-3" style={{ fontFamily: fonts.body, color: theme.accent }}>
                                <span className="text-4xl">✍️</span>
                                {about?.story?.founder_name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission */}
            <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white relative">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.accent }} />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block p-4 rounded-full mb-6" style={{ backgroundColor: `${theme.primary}15` }}>
                        <Target className="w-12 h-12" style={{ color: theme.primary }} />
                    </div>
                    <h2 className="text-4xl font-bold mb-6" style={{ color: theme.primary, fontFamily: fonts.heading }}>Our Mission</h2>
                    <p className="text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: fonts.body }}>{about?.mission}</p>
                </div>
            </div>

            {/* Values - Interactive */}
            <div className="py-20 px-6 relative overflow-hidden">
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.accent }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-5xl font-bold text-center mb-16" style={{ fontFamily: fonts.heading }}>Our Core Values</h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {about?.values?.map((value, idx) => {
                            const Icon = valueIcons[idx] || Award;
                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setActiveValue(idx)}
                                    className={`transition-all duration-500 ${activeValue === idx ? 'scale-110' : 'scale-100'}`}
                                >
                                    <Card className={`hover:shadow-2xl transition-all h-full ${
                                        activeValue === idx ? 'ring-4' : ''
                                    }`} style={activeValue === idx ? { ringColor: theme.primary } : {}}>
                                        <CardContent className="p-6 text-center relative overflow-hidden">
                                            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                                                activeValue === idx ? 'opacity-10' : ''
                                            }`} style={{ backgroundColor: theme.primary }} />
                                            <div className="relative z-10">
                                                <div className="inline-block p-4 rounded-full mb-4 transition-all" style={{ backgroundColor: `${theme.primary}15` }}>
                                                    <Icon className="w-10 h-10" style={{ color: theme.primary }} />
                                                </div>
                                                <h3 className="font-bold text-xl mb-3" style={{ color: theme.primary, fontFamily: fonts.heading }}>{value.title}</h3>
                                                <p className="text-gray-600 text-sm" style={{ fontFamily: fonts.body }}>{value.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Team - Hover Bios */}
            <div className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16" style={{ fontFamily: fonts.heading }}>Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(Array.isArray(about?.team) ? about.team : []).map((member, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setHoveredTeam(idx)}
                                onMouseLeave={() => setHoveredTeam(null)}
                                className="group"
                            >
                                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                                    <div className="relative h-80 overflow-hidden">
                                        {member.image_url ? (
                                            <>
                                                <img 
                                                    src={member.image_url} 
                                                    alt={member.name} 
                                                    className={`w-full h-full object-cover transition-all duration-700 ${
                                                        hoveredTeam === idx ? 'scale-110 blur-sm' : 'scale-100'
                                                    }`}
                                                />
                                                {/* Bio Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end p-6 transition-all duration-500 ${
                                                    hoveredTeam === idx ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                                }`}>
                                                    <div className="text-white">
                                                        <p className="text-sm mb-2" style={{ fontFamily: fonts.body }}>{member.bio}</p>
                                                        <div className="flex gap-2 mt-3">
                                                            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${theme.primary}90` }}>
                                                                {Math.floor(Math.random() * 10) + 5}+ years exp
                                                            </span>
                                                            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${theme.accent}90` }}>
                                                                Certified
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center bg-gray-200">
                                                <Users className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-xl mb-1 transition-colors" style={{ 
                                            fontFamily: fonts.heading,
                                            color: hoveredTeam === idx ? theme.primary : 'inherit'
                                        }}>
                                            {member.name}
                                        </h3>
                                        <p className="text-sm font-semibold mb-2" style={{ color: theme.primary, fontFamily: fonts.body }}>{member.role}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Journey Timeline */}
            <div className="py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/2 left-0 right-0 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-5xl font-bold text-center mb-16" style={{ fontFamily: fonts.heading }}>Our Journey</h2>
                    <div className="space-y-8">
                        {(Array.isArray(about?.milestones) ? about.milestones : []).map((milestone, idx) => (
                            <div 
                                key={idx} 
                                className={`flex gap-8 items-start ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="flex-shrink-0 w-32 text-right">
                                    <div 
                                        className="inline-block px-6 py-3 rounded-full text-white font-bold text-xl shadow-lg"
                                        style={{ backgroundColor: theme.primary }}
                                    >
                                        {milestone.year}
                                    </div>
                                </div>
                                <div className={`flex-1 p-6 rounded-2xl transition-all hover:shadow-xl hover:scale-105 ${
                                    idx % 2 === 0 ? 'text-left' : 'text-right'
                                }`} style={{ backgroundColor: `${theme.primary}08` }}>
                                    <p className="text-lg text-gray-700 font-semibold" style={{ fontFamily: fonts.body }}>{milestone.achievement}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.8s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out 0.2s both;
                }
            `}</style>
        </div>
    );
}