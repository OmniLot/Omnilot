import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, TrendingUp, DollarSign, Percent, Clock } from 'lucide-react';

export default function FinancingBlock({ financing, styleKit, onApplyNow }) {
    const [loanAmount, setLoanAmount] = useState(35000);
    const [downPayment, setDownPayment] = useState(7000);
    const [loanTerm, setLoanTerm] = useState(60);
    const [apr, setApr] = useState(4.9);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [hoveredPlan, setHoveredPlan] = useState(null);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};

    useEffect(() => {
        const principal = loanAmount - downPayment;
        const monthlyRate = apr / 100 / 12;
        const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                       (Math.pow(1 + monthlyRate, loanTerm) - 1);
        setMonthlyPayment(payment);
    }, [loanAmount, downPayment, loanTerm, apr]);

    const trustBadges = [
        { icon: Shield, text: "Secure Application" },
        { icon: Award, text: "A+ BBB Rating" },
        { icon: TrendingUp, text: "Fast Approval" },
        { icon: DollarSign, text: "Best Rates" }
    ];
    
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.primary }} />
                    <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.accent, animationDelay: '1s' }} />
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>{financing?.page_title}</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: fonts.body }}>{financing?.page_subtitle}</p>
                </div>
            </div>

            {/* Live Payment Calculator */}
            <div className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: theme.primary, fontFamily: fonts.heading }}>
                            Live Payment Calculator
                        </h2>
                        <p className="text-gray-600" style={{ fontFamily: fonts.body }}>
                            Adjust the sliders to see your estimated monthly payment
                        </p>
                    </div>

                    <Card className="shadow-2xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Calculator Inputs */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: fonts.body }}>
                                            <DollarSign className="w-4 h-4" style={{ color: theme.primary }} />
                                            Vehicle Price: ${loanAmount.toLocaleString()}
                                        </label>
                                        <input 
                                            type="range" 
                                            min="10000" 
                                            max="150000" 
                                            step="1000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                                            style={{ 
                                                background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${(loanAmount / 150000) * 100}%, #e5e7eb ${(loanAmount / 150000) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: fonts.body }}>
                                            <DollarSign className="w-4 h-4" style={{ color: theme.accent }} />
                                            Down Payment: ${downPayment.toLocaleString()}
                                        </label>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max={loanAmount * 0.5} 
                                            step="500"
                                            value={downPayment}
                                            onChange={(e) => setDownPayment(parseInt(e.target.value))}
                                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                                            style={{ 
                                                background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${(downPayment / (loanAmount * 0.5)) * 100}%, #e5e7eb ${(downPayment / (loanAmount * 0.5)) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: fonts.body }}>
                                            <Clock className="w-4 h-4" style={{ color: theme.primary }} />
                                            Loan Term: {loanTerm} months
                                        </label>
                                        <input 
                                            type="range" 
                                            min="24" 
                                            max="84" 
                                            step="12"
                                            value={loanTerm}
                                            onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                                            style={{ 
                                                background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${((loanTerm - 24) / 60) * 100}%, #e5e7eb ${((loanTerm - 24) / 60) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>2 years</span>
                                            <span>7 years</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: fonts.body }}>
                                            <Percent className="w-4 h-4" style={{ color: theme.accent }} />
                                            APR: {apr.toFixed(1)}%
                                        </label>
                                        <input 
                                            type="range" 
                                            min="2.9" 
                                            max="9.9" 
                                            step="0.1"
                                            value={apr}
                                            onChange={(e) => setApr(parseFloat(e.target.value))}
                                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                                            style={{ 
                                                background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${((apr - 2.9) / 7) * 100}%, #e5e7eb ${((apr - 2.9) / 7) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Payment Display */}
                                <div className="flex items-center justify-center">
                                    <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: `${theme.primary}10` }}>
                                        <p className="text-sm font-semibold mb-2 text-gray-600" style={{ fontFamily: fonts.body }}>
                                            Estimated Monthly Payment
                                        </p>
                                        <div className="relative">
                                            <p className="text-6xl font-bold mb-4 transition-all duration-300" style={{ 
                                                color: theme.primary, 
                                                fontFamily: fonts.heading 
                                            }}>
                                                ${monthlyPayment.toFixed(0)}
                                            </p>
                                            <div className="absolute inset-0 blur-2xl opacity-20" style={{ backgroundColor: theme.primary }} />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
                                            <p>Loan Amount: ${(loanAmount - downPayment).toLocaleString()}</p>
                                            <p>Total Interest: ${(monthlyPayment * loanTerm - (loanAmount - downPayment)).toFixed(0)}</p>
                                            <p>Total Cost: ${(monthlyPayment * loanTerm).toFixed(0)}</p>
                                        </div>
                                        <Button 
                                            size="lg" 
                                            onClick={onApplyNow}
                                            className="mt-6 w-full transition-all hover:scale-105 hover:shadow-xl"
                                            style={{ backgroundColor: theme.primary }}
                                        >
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        {trustBadges.map((badge, idx) => {
                            const Icon = badge.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    style={{ 
                                        animationDelay: `${idx * 0.1}s`,
                                        animation: 'fadeIn 0.5s ease-out forwards'
                                    }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: theme.primary }} />
                                    <span className="font-semibold" style={{ fontFamily: fonts.body }}>{badge.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Financing Plans */}
            <div className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ fontFamily: fonts.heading }}>Choose Your Plan</h2>
                    <p className="text-center text-gray-600 mb-12" style={{ fontFamily: fonts.body }}>Select the financing option that works best for you</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {financing?.plans?.map((plan, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setHoveredPlan(idx)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                className="relative"
                            >
                                <Card className={`h-full transition-all duration-500 ${
                                    hoveredPlan === idx ? 'shadow-2xl scale-105 -translate-y-2' : 'shadow-lg hover:shadow-xl'
                                }`}>
                                    {idx === 1 && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg animate-bounce" style={{ backgroundColor: theme.accent }}>
                                            MOST POPULAR
                                        </div>
                                    )}
                                    <CardContent className="p-6 relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ${
                                            hoveredPlan === idx ? 'opacity-20' : ''
                                        }`} style={{ backgroundColor: theme.primary }} />
                                        
                                        <div className="relative z-10">
                                            <div className="text-4xl mb-4">
                                                {['💰', '🚀', '⭐', '🎯'][idx]}
                                            </div>
                                            <h3 className="font-bold text-2xl mb-2" style={{ color: theme.primary, fontFamily: fonts.heading }}>{plan.name}</h3>
                                            <p className="text-gray-600 mb-4" style={{ fontFamily: fonts.body }}>{plan.tagline}</p>
                                            <p className="text-3xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>{plan.apr_range}</p>
                                            <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: fonts.body }}>Down: {plan.down_payment}</p>
                                            <div className="border-t border-b py-4 mb-4">
                                                <p className="text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>Best For:</p>
                                                <p className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>{plan.best_for}</p>
                                            </div>
                                            <ul className="space-y-2 mb-6">
                                                {plan.features?.map((feature, i) => (
                                                    <li key={i} className="text-sm flex items-start" style={{ fontFamily: fonts.body }}>
                                                        <span className="mr-2 text-green-600 flex-shrink-0">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button 
                                                onClick={onApplyNow}
                                                className="w-full transition-all hover:scale-105 relative overflow-hidden group" 
                                                style={{ backgroundColor: theme.primary }}
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                                                <span className="relative z-10">Apply Now</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: fonts.heading }}>Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {financing?.faqs?.map((faq, idx) => (
                            <Card key={idx} className="hover:shadow-lg transition-all hover:scale-102">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: theme.primary, fontFamily: fonts.heading }}>
                                        <span className="text-2xl">{['❓', '🔄', '⏱️', '📄', '💳', '🚫', '🤝', '💰'][idx % 8]}</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 ml-8" style={{ fontFamily: fonts.body }}>{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}