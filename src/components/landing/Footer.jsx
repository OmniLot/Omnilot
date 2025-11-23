import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const footerSections = [
    {
        title: 'Product',
        links: [
            { name: 'Features', href: createPageUrl('Landing') },
            { name: 'Pricing', href: createPageUrl('Pricing') },
            { name: 'Enterprise', href: createPageUrl('Enterprise') },
            { name: 'Gallery', href: createPageUrl('Gallery') }
        ]
    },
    {
        title: 'Resources',
        links: [
            { name: 'Documentation', href: createPageUrl('Documentation') },
            { name: 'Support', href: createPageUrl('Support') },
            { name: 'Book Demo', href: createPageUrl('BookDemo') },
            { name: 'Project Status', href: createPageUrl('ProjectStatus') }
        ]
    },
    {
        title: 'Company',
        links: [
            { name: 'About Us', href: createPageUrl('About') },
            { name: 'Careers', href: createPageUrl('Careers') },
            { name: 'Contact', href: createPageUrl('Support') }
        ]
    }
];

const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company info */}
                    <div className="lg:col-span-2">
                        <Link to={createPageUrl('Landing')} className="inline-block mb-4">
                            <span className="text-3xl font-light text-white tracking-tight">
                                <span className="text-blue-400">Omni</span>.Lot
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed hidden md:block">
                            AI-powered dealership solutions that transform how you sell vehicles, engage customers, and grow your business.
                        </p>
                        <div className="space-y-3">
                            <a href="mailto:omni.lotservices@gmail.com" className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                                <Mail className="w-4 h-4 mr-2" />
                                support@omni.lot
                            </a>
                            <a href="tel:+15035926043" className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                                <Phone className="w-4 h-4 mr-2" />
                                +1 (503) 592-6043
                            </a>
                            <div className="flex items-center text-gray-400">
                                <MapPin className="w-4 h-4 mr-2" />
                                Portland, OR
                            </div>
                        </div>
                    </div>

                    {/* Footer sections */}
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Omni.Lot. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}