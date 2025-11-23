import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, TrendingDown, Zap, Star, Eye } from 'lucide-react';

export default function InventoryBlock({ inventory, styleKit, onApplyNow, initialFilters }) {
    const [selectedCategory, setSelectedCategory] = useState(initialFilters?.bodyType || 'all');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([initialFilters?.priceMin || 0, initialFilters?.priceMax || 500000]);
    const [showFilters, setShowFilters] = useState(false);
    const [hoveredVehicle, setHoveredVehicle] = useState(null);
    const [compareMode, setCompareMode] = useState(false);
    const [selectedForCompare, setSelectedForCompare] = useState([]);
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    
    const filteredVehicles = (Array.isArray(inventory?.vehicles) ? inventory.vehicles : []).filter(v => {
        const categoryMatch = selectedCategory === 'all' || v.category === selectedCategory;
        const searchMatch = searchQuery === '' || 
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.model?.toLowerCase().includes(searchQuery.toLowerCase());
        const priceNum = parseInt(v.price.replace(/[^0-9]/g, ''));
        const priceMatch = priceNum >= priceRange[0] && priceNum <= priceRange[1];
        
        // Apply advanced search filters if provided
        const makeMatch = !initialFilters?.make || v.make === initialFilters.make;
        const modelMatch = !initialFilters?.model || v.model === initialFilters.model;
        const yearMatch = !initialFilters?.year || v.year === initialFilters.year;
        
        return categoryMatch && searchMatch && priceMatch && makeMatch && modelMatch && yearMatch;
    });

    const getBadge = (index) => {
        if (index === 0) return { text: "JUST IN", color: "bg-blue-500", icon: Zap };
        if (index === 1) return { text: "NEW", color: "bg-green-500", icon: Star };
        if (index % 3 === 0) return { text: "PRICE DROP", color: "bg-orange-500", icon: TrendingDown };
        return null;
    };

    const toggleCompare = (vehicle) => {
        if (selectedForCompare.find(v => v.title === vehicle.title)) {
            setSelectedForCompare(selectedForCompare.filter(v => v.title !== vehicle.title));
        } else if (selectedForCompare.length < 3) {
            setSelectedForCompare([...selectedForCompare, vehicle]);
        }
    };

    return (
        <div className="py-16 px-6 bg-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.primary }} />
                <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.accent, animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-5xl font-bold text-center mb-4" style={{ fontFamily: fonts.heading }}>{inventory?.page_title}</h1>
                <p className="text-xl text-gray-600 text-center mb-8" style={{ fontFamily: fonts.body }}>{inventory?.page_subtitle}</p>
                
                {/* Search & Filter Bar */}
                <div className="mb-8 space-y-4">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input 
                                placeholder="Search by make, model, or keyword..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-lg transition-all focus:shadow-xl"
                            />
                            {searchQuery && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    {filteredVehicles?.length} results
                                </div>
                            )}
                        </div>
                        <Button 
                            size="lg"
                            variant={showFilters ? "default" : "outline"}
                            onClick={() => setShowFilters(!showFilters)}
                            className="h-14 transition-all"
                            style={showFilters ? { backgroundColor: theme.primary } : {}}
                        >
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters
                        </Button>
                        <Button
                            size="lg"
                            variant={compareMode ? "default" : "outline"}
                            onClick={() => setCompareMode(!compareMode)}
                            className="h-14 transition-all"
                            style={compareMode ? { backgroundColor: theme.accent } : {}}
                        >
                            <Eye className="w-5 h-5 mr-2" />
                            Compare {selectedForCompare.length > 0 && `(${selectedForCompare.length})`}
                        </Button>
                    </div>

                    {/* Filter Panel */}
                    <div 
                        className={`transition-all duration-500 overflow-hidden ${
                            showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 backdrop-blur-xl border-2" style={{ borderColor: `${theme.primary}20` }}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-3" style={{ fontFamily: fonts.body }}>Price Range</label>
                                    <div className="flex gap-4 items-center">
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="500000" 
                                            step="10000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                                            style={{ background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.accent} 100%)` }}
                                        />
                                        <span className="text-xl font-bold min-w-32" style={{ color: theme.primary, fontFamily: fonts.heading }}>
                                            ${priceRange[1].toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button 
                                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                        onClick={() => setSelectedCategory('all')}
                                        style={selectedCategory === 'all' ? { backgroundColor: theme.primary } : {}}
                                        className="transition-all hover:scale-105"
                                    >
                                        All Vehicles
                                    </Button>
                                    {inventory?.categories?.map((category, idx) => (
                                        <Button 
                                            key={idx}
                                            variant={selectedCategory === category ? 'default' : 'outline'}
                                            onClick={() => setSelectedCategory(category)}
                                            style={selectedCategory === category ? { backgroundColor: theme.primary } : {}}
                                            className="transition-all hover:scale-105"
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(Array.isArray(filteredVehicles) ? filteredVehicles : []).map((vehicle, idx) => {
                        const badge = getBadge(idx);
                        const BadgeIcon = badge?.icon;
                        const isSelected = selectedForCompare.find(v => v.title === vehicle.title);
                        
                        return (
                            <div 
                                key={idx}
                                className="relative"
                                onMouseEnter={() => setHoveredVehicle(idx)}
                                onMouseLeave={() => setHoveredVehicle(null)}
                            >
                                <Card className={`overflow-hidden transition-all duration-500 ${
                                    hoveredVehicle === idx ? 'shadow-2xl scale-105 -translate-y-2' : 'shadow-lg'
                                } ${isSelected ? 'ring-4' : ''}`}
                                style={isSelected ? { ringColor: theme.accent } : {}}
                                >
                                    {/* Badges */}
                                    {badge && (
                                        <div 
                                            className={`absolute top-4 right-4 z-20 ${badge.color} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse shadow-lg`}
                                        >
                                            {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                                            {badge.text}
                                        </div>
                                    )}

                                    {/* Compare Checkbox */}
                                    {compareMode && (
                                        <button
                                            onClick={() => toggleCompare(vehicle)}
                                            className={`absolute top-4 left-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                isSelected ? 'bg-white scale-110' : 'bg-white/80 hover:bg-white'
                                            } shadow-lg`}
                                        >
                                            {isSelected && <span className="text-2xl" style={{ color: theme.accent }}>✓</span>}
                                        </button>
                                    )}

                                    {/* Image with Hover Effect */}
                                    <div className="relative h-56 bg-gray-200 overflow-hidden group">
                                        {vehicle.image_url ? (
                                            <>
                                                <img 
                                                    src={vehicle.image_url} 
                                                    alt={vehicle.title} 
                                                    className={`w-full h-full object-cover transition-all duration-700 ${
                                                        hoveredVehicle === idx ? 'scale-110 rotate-2' : 'scale-100'
                                                    }`}
                                                />
                                                {/* Overlay on hover */}
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${
                                                    hoveredVehicle === idx ? 'opacity-100' : 'opacity-0'
                                                }`}>
                                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                                        <p className="text-sm font-semibold">Quick View</p>
                                                        <p className="text-xs">Click for 360° View</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className="text-gray-400">Vehicle Photo</p>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-2xl mb-2 transition-colors" style={{ 
                                            fontFamily: fonts.heading,
                                            color: hoveredVehicle === idx ? theme.primary : 'inherit'
                                        }}>
                                            {vehicle.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2" style={{ fontFamily: fonts.body }}>
                                            {vehicle.description}
                                        </p>
                                        
                                        {/* Price with animation */}
                                        <div className={`relative inline-block mb-4 ${badge?.text === "PRICE DROP" ? 'animate-pulse' : ''}`}>
                                            <p className="text-3xl font-bold" style={{ 
                                                color: badge?.text === "PRICE DROP" ? '#f59e0b' : theme.primary, 
                                                fontFamily: fonts.heading 
                                            }}>
                                                {vehicle.price}
                                            </p>
                                            {badge?.text === "PRICE DROP" && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-400 animate-ping" />
                                            )}
                                        </div>
                                        
                                        <div className="space-y-2 mb-4 text-sm" style={{ fontFamily: fonts.body }}>
                                            <div className="grid grid-cols-2 gap-2">
                                                <p className="flex items-center"><span className="font-semibold mr-1">🔧</span> {vehicle.specs?.engine}</p>
                                                <p className="flex items-center"><span className="font-semibold mr-1">⚙️</span> {vehicle.specs?.transmission}</p>
                                                <p className="flex items-center"><span className="font-semibold mr-1">📏</span> {vehicle.specs?.mileage}</p>
                                                <p className="flex items-center"><span className="font-semibold mr-1">✨</span> {vehicle.specs?.condition}</p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4 mb-4">
                                            <p className="font-semibold mb-2 text-sm" style={{ fontFamily: fonts.body }}>Key Features:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {vehicle.features?.slice(0, 4).map((feature, i) => (
                                                    <span 
                                                        key={i}
                                                        className="text-xs px-3 py-1 rounded-full"
                                                        style={{ 
                                                            backgroundColor: `${theme.primary}15`,
                                                            color: theme.primary 
                                                        }}
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button 
                                                variant="outline"
                                                className="transition-all duration-300 hover:scale-105"
                                            >
                                                Test Drive
                                            </Button>
                                            <Button 
                                                onClick={() => onApplyNow && onApplyNow(vehicle)}
                                                className="transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group" 
                                                style={{ backgroundColor: theme.primary }}
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                                                <span className="relative z-10">Apply Now</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison Panel */}
                {compareMode && selectedForCompare.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 shadow-2xl z-50 p-6 animate-slideUp" style={{ borderColor: theme.accent }}>
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold" style={{ fontFamily: fonts.heading, color: theme.primary }}>
                                    Compare Vehicles ({selectedForCompare.length})
                                </h3>
                                <Button variant="outline" onClick={() => setSelectedForCompare([])}>
                                    Clear All
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {selectedForCompare.map((vehicle, idx) => (
                                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <h4 className="font-bold mb-2" style={{ fontFamily: fonts.heading }}>{vehicle.title}</h4>
                                            <p className="text-2xl font-bold mb-2" style={{ color: theme.primary }}>{vehicle.price}</p>
                                            <div className="text-sm space-y-1" style={{ fontFamily: fonts.body }}>
                                                <p>Engine: {vehicle.specs?.engine}</p>
                                                <p>MPG: {vehicle.specs?.mileage}</p>
                                                <p>Condition: {vehicle.specs?.condition}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}