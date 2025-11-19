import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';

const navItems = [
    { name: 'Home', href: createPageUrl('Landing') },
    { 
        name: 'Product', 
        href: '#',
        dropdown: [
            { name: 'Pricing', href: createPageUrl('Pricing') },
            { name: 'Enterprise', href: createPageUrl('Enterprise') }
        ]
    },
    { 
        name: 'Resources', 
        href: '#',
        dropdown: [
            { name: 'Documentation', href: createPageUrl('Documentation') },
            { name: 'Support', href: createPageUrl('Support') },
            { name: 'Gallery', href: createPageUrl('Gallery') }
        ]
    },
    { name: 'About', href: createPageUrl('About') },
    { name: 'Careers', href: createPageUrl('Careers') }
];

export default function TopNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={createPageUrl('Landing')} className="flex items-center">
                        <span className="text-2xl font-light text-white tracking-tight">
                            <span className="text-blue-400">Omni</span>.Lot
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div key={index} className="relative group">
                                {item.dropdown ? (
                                    <div
                                        onMouseEnter={() => setActiveDropdown(index)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 py-2">
                                            {item.name}
                                            <ChevronDown className="w-4 h-4 ml-1" />
                                        </button>
                                        {activeDropdown === index && (
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.href}
                                                        className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors duration-200"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to={createPageUrl('Support')}>
                            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                                Contact Sales
                            </Button>
                        </Link>
                        <Link to={createPageUrl('BookDemo')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Book Demo
                            </Button>
                        </Link>
                        <Link to={createPageUrl('Auth')}>
                            <Button variant="outline" className="border-gray-700 text-black hover:text-white hover:border-blue-400 bg-white hover:bg-transparent">
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-white"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item, index) => (
                            <div key={index}>
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                            className="flex items-center justify-between w-full text-gray-300 hover:text-blue-400 py-2"
                                        >
                                            {item.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === index && (
                                            <div className="pl-4 mt-2 space-y-2">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.href}
                                                        className="block text-gray-400 hover:text-blue-400 py-2"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="block text-gray-300 hover:text-blue-400 py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 space-y-2">
                            <Link to={createPageUrl('Support')} onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white">
                                    Contact Sales
                                </Button>
                            </Link>
                            <Link to={createPageUrl('BookDemo')} onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Book Demo
                                </Button>
                            </Link>
                            <Link to={createPageUrl('Auth')} onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full border-gray-700 text-black bg-white hover:text-white hover:bg-transparent">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}