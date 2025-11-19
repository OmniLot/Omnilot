import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Phone, Car, DollarSign, Star, MapPin } from 'lucide-react';

export default function AdvancedSearchBar({ inventory, styleKit, onSearch }) {
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        bodyType: '',
        year: '',
        priceMin: 0,
        priceMax: 60000
    });

    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};

    // Extract unique values from inventory
    const makes = [...new Set(inventory?.vehicles?.map(v => v.make).filter(Boolean))];
    const categories = inventory?.categories || [];
    const years = [...new Set(inventory?.vehicles?.map(v => v.year).filter(Boolean))].sort((a, b) => b - a);

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(filters);
        }
    };

    const handleReset = () => {
        const resetFilters = {
            make: '',
            model: '',
            bodyType: '',
            year: '',
            priceMin: 0,
            priceMax: 60000
        };
        setFilters(resetFilters);
        if (onSearch) {
            onSearch(resetFilters);
        }
    };

    const quickActions = [
        { icon: Phone, label: 'Call Us', color: theme.primary },
        { icon: Car, label: 'Test Drive', color: theme.accent },
        { icon: DollarSign, label: 'Finance', color: theme.primary },
        { icon: Star, label: 'Featured', color: '#F59E0B' },
        { icon: MapPin, label: 'Location', color: theme.accent }
    ];

    return (
        <div className="relative">
            {/* Main Search Bar */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 backdrop-blur-xl border border-white/10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Make */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-white" style={{ fontFamily: fonts.body }}>
                            MAKE
                        </label>
                        <select 
                            value={filters.make}
                            onChange={(e) => handleFilterChange('make', e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 font-medium transition-all hover:ring-2 focus:ring-2"
                            style={{ 
                                outline: 'none',
                                fontFamily: fonts.body
                            }}
                        >
                            <option value="">Select an option</option>
                            {makes.map((make, idx) => (
                                <option key={idx} value={make}>{make}</option>
                            ))}
                        </select>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-white" style={{ fontFamily: fonts.body }}>
                            MODEL
                        </label>
                        <select 
                            value={filters.model}
                            onChange={(e) => handleFilterChange('model', e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 font-medium transition-all hover:ring-2 focus:ring-2"
                            style={{ fontFamily: fonts.body }}
                        >
                            <option value="">Select an option</option>
                            {inventory?.vehicles
                                ?.filter(v => !filters.make || v.make === filters.make)
                                .map(v => v.model)
                                .filter((v, i, a) => a.indexOf(v) === i)
                                .map((model, idx) => (
                                    <option key={idx} value={model}>{model}</option>
                                ))}
                        </select>
                    </div>

                    {/* Body Type */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-white" style={{ fontFamily: fonts.body }}>
                            BODY TYPE
                        </label>
                        <select 
                            value={filters.bodyType}
                            onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 font-medium transition-all hover:ring-2 focus:ring-2"
                            style={{ fontFamily: fonts.body }}
                        >
                            <option value="">Select an option</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-white" style={{ fontFamily: fonts.body }}>
                            YEAR
                        </label>
                        <select 
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 font-medium transition-all hover:ring-2 focus:ring-2"
                            style={{ fontFamily: fonts.body }}
                        >
                            <option value="">Select an option</option>
                            {years.map((year, idx) => (
                                <option key={idx} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-white" style={{ fontFamily: fonts.body }}>
                            PRICE
                        </label>
                        <span className="text-white font-bold text-lg" style={{ fontFamily: fonts.heading }}>
                            ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
                        </span>
                    </div>
                    <div className="relative">
                        <input 
                            type="range" 
                            min="0" 
                            max="100000" 
                            step="5000"
                            value={filters.priceMax}
                            onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                            style={{ 
                                background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.accent} ${(filters.priceMax / 100000) * 100}%, #4B5563 ${(filters.priceMax / 100000) * 100}%, #4B5563 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>$0</span>
                            <span>$50,000</span>
                            <span>$100,000+</span>
                        </div>
                    </div>
                </div>

                {/* Search Buttons */}
                <div className="flex gap-3">
                    <Button 
                        onClick={handleSearch}
                        className="flex-1 h-14 text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
                        style={{ backgroundColor: theme.primary }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20" style={{ animation: 'shimmer 2s infinite' }} />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            SEARCH
                        </span>
                    </Button>
                    <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="h-14 px-6 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Quick Action Icons */}
            <div className="flex justify-center gap-6 mt-8">
                {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={idx}
                            className="flex flex-col items-center gap-2 group transition-all hover:scale-110"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div 
                                className="w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg group-hover:shadow-2xl"
                                style={{ backgroundColor: action.color }}
                            >
                                <Icon className="w-8 h-8 text-white transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900" style={{ fontFamily: fonts.body }}>
                                {action.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}