import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";

export default function Welcome() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
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

                .fade-in-welcome {
                    opacity: 0;
                    animation: fadeInWelcome 1.5s ease-in-out 0.5s forwards;
                }

                @keyframes fadeInWelcome {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .glow-text {
                    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }
                `}
            </style>
            
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="shooting-star"></div>
            </div>

            {/* Glowing arc along bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-16 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-8 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full blur-lg"></div>
            </div>

            {/* Background tech patterns */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-16 h-16 border border-blue-400 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-60 right-10 w-20 h-20 border border-blue-400 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Main welcome message */}
                <h1 className="text-5xl md:text-7xl font-thin text-white mb-8 tracking-tight leading-tight">
                    Welcome to <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-light glow-text fade-in-welcome">
                        Omni.Lot
                    </span>
                </h1>

                {/* Description */}
                <div className="max-w-3xl mx-auto mb-8 space-y-6">
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        We are proud to be shaping the next era of dealership intelligence. Omni.Lot is more than software—it is a complete ecosystem, designed to unify inventory, engagement, and automation through advanced AI.
                    </p>
                    
                    <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        Our platform is currently in development, but the vision is clear: to deliver a seamless, data-driven experience that empowers dealerships to operate with unmatched efficiency and insight.
                    </p>
                    
                    <p className="text-lg md:text-xl text-blue-300 font-medium leading-relaxed">
                        Stay ahead of the curve—sign up today to receive exclusive updates, progress announcements, and early access opportunities directly from our team.
                    </p>
                </div>

                {/* Email signup */}
                <div className="relative mb-8 max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
                    <div className="relative flex gap-3">
                        <div className="flex-1">
                            <Input
                                type="email"
                                placeholder="Enter your email for exclusive updates..."
                                className="w-full h-16 px-6 text-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 rounded-2xl backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            />
                        </div>
                        <Button className="h-16 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 group">
                            <Mail className="w-5 h-5 mr-2" />
                            Notify Me
                        </Button>
                    </div>
                </div>

                {/* Continue to main site */}
                <Link to={createPageUrl('Landing')}>
                    <Button variant="outline" className="h-12 px-8 border border-gray-600 bg-transparent text-gray-300 hover:text-white hover:border-blue-400 hover:bg-transparent rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 group">
                        Explore Our Vision
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </Link>

                {/* Floating particles */}
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60 hidden md:block"></div>
                <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-40 delay-1000 hidden md:block"></div>
                <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping opacity-50 delay-2000 hidden md:block"></div>
            </div>
        </div>
    );
}