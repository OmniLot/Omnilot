import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Zap, ArrowRight } from "lucide-react";

export default function HeroSection() {
    const navigate = useNavigate();
    const [dealershipGoal, setDealershipGoal] = useState('');

    const handleBuildWebsite = () => {
        if (dealershipGoal.trim()) {
            navigate(`${createPageUrl('BuildWebsite')}?goal=${encodeURIComponent(dealershipGoal)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && dealershipGoal.trim()) {
            handleBuildWebsite();
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 flex items-center md:justify-center justify-start overflow-hidden">
            <style>
                {`
                .shooting-star {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 2px;
                    height: 2px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
                    animation: animate-star 3s linear infinite;
                }
                .shooting-star::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 300px;
                    height: 1px;
                    background: linear-gradient(90deg, #fff, transparent);
                }

                @media (max-width: 768px) {
                    .shooting-star::before {
                        width: 150px;
                    }
                }

                @keyframes animate-star {
                    0% {
                        transform: rotate(315deg) translateX(0);
                        opacity: 1;
                    }
                    70% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(315deg) translateX(-1500px);
                        opacity: 0;
                    }
                }
                
                .shooting-star:nth-child(1) { top: 0; right: 600px; left: initial; animation-delay: 1.2s; animation-duration: 3s; }
                .shooting-star:nth-child(2) { top: 20%; right: 300px; left: initial; animation-delay: 2.5s; animation-duration: 2.5s; }
                .shooting-star:nth-child(3) { top: 60%; right: 800px; left: initial; animation-delay: 4s; animation-duration: 3.5s; }

                @media (max-width: 768px) {
                    .shooting-star:nth-child(1) { right: 100px; }
                    .shooting-star:nth-child(2) { right: 50px; }
                    .shooting-star:nth-child(3) { right: 150px; }
                }

                .fade-in-backed-by-ai {
                    opacity: 0;
                    animation: fadeInBackedByAI 1.5s ease-in-out 1s forwards;
                }

                @keyframes fadeInBackedByAI {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .mobile-particle {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    background: #3b82f6;
                    border-radius: 50%;
                    animation: float-mobile 4s infinite ease-in-out;
                }

                @keyframes float-mobile {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
                }
                `}
            </style>
            
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
            </div>

            {/* Glowing Cascade-blue arc along bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-16 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-8 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full blur-lg"></div>
            </div>

            {/* Background tech pattern - Enhanced for mobile */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse hidden sm:block"></div>
                <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400 rounded-full animate-pulse delay-1000 hidden sm:block"></div>
                <div className="absolute bottom-40 left-20 w-16 h-16 border border-blue-400 rounded-full animate-pulse delay-2000 hidden sm:block"></div>
                <div className="absolute bottom-60 right-10 w-20 h-20 border border-blue-400 rounded-full animate-pulse delay-500 hidden sm:block"></div>
                
                {/* Mobile-specific circles - smaller and fewer */}
                <div className="absolute top-24 left-5 w-10 h-10 border border-blue-400 rounded-full animate-pulse sm:hidden"></div>
                <div className="absolute top-64 right-5 w-8 h-8 border border-purple-400 rounded-full animate-pulse delay-1500 sm:hidden"></div>
                <div className="absolute bottom-32 left-3/4 w-12 h-12 border border-cyan-400 rounded-full animate-pulse delay-2500 sm:hidden"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-2 sm:py-16 text-center mt-[5vh] md:mt-0">
                {/* Main headline - BIGGER */}
                <h1 className="text-[2.75rem] sm:text-6xl md:text-8xl font-thin text-white mb-6 sm:mb-8 tracking-tight leading-[1.2] sm:leading-tight">
                    What should your <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent relative cursor-pointer group transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.7)] fade-in-backed-by-ai">
                        dealership
                    </span> build today?
                </h1>

                {/* Sub-headline - BIGGER */}
                <p className="text-lg sm:text-xl md:text-3xl text-gray-300 font-light mb-6 sm:mb-14 leading-relaxed max-w-3xl mx-auto px-2">
                    Create AI-powered websites, marketing, and automations 
                    for your dealership with <span className="text-blue-400 font-medium">Omni.Lot</span>
                </p>

                {/* Input field with Go button - BIGGER */}
                <div className="relative mb-6 sm:mb-10 max-w-2xl sm:max-w-3xl mx-auto px-2">
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            value={dealershipGoal}
                            onChange={(e) => setDealershipGoal(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your dealership goal..."
                            className="flex-1 h-14 sm:h-20 px-5 sm:px-8 text-base sm:text-xl bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        />
                        <Button
                            onClick={handleBuildWebsite}
                            disabled={!dealershipGoal.trim()}
                            className="h-14 sm:h-20 px-7 sm:px-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                        >
                            <span className="hidden sm:inline">Build</span>
                            <ArrowRight className="w-6 h-6 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Action buttons - BIGGER */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center max-w-lg mx-auto px-4">
                    <Link to={createPageUrl('Enterprise')} className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-13 sm:h-14 px-8 sm:px-10 text-base sm:text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 group">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            Our Software
                        </Button>
                    </Link>
                    <Link to={createPageUrl('BookDemo')} className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto h-13 sm:h-14 px-8 sm:px-10 text-base sm:text-lg border border-gray-600 bg-transparent text-gray-300 hover:text-white hover:border-blue-400 hover:bg-transparent rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 group">
                            <Upload className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
                            Book Demo
                        </Button>
                    </Link>
                </div>

                {/* Enhanced Floating elements for desktop only */}
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60 hidden sm:block"></div>
                <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-40 delay-1000 hidden sm:block"></div>
                <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping opacity-50 delay-2000 hidden sm:block"></div>
            </div>
        </div>
    );
}
