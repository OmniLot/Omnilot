import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactBlock({ contact, styleKit }) {
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};
    
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="py-20 px-6 bg-gray-900 text-white text-center">
                <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>{contact?.page_title}</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: fonts.body }}>{contact?.page_subtitle}</p>
            </div>

            <div className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8" style={{ color: theme.primary, fontFamily: fonts.heading }}>Get In Touch</h2>
                        
                        <div className="space-y-6 mb-8" style={{ fontFamily: fonts.body }}>
                            <div className="flex gap-4">
                                <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: theme.primary }} />
                                <div>
                                    <p className="font-semibold mb-1">Address</p>
                                    <p className="text-gray-600">{contact?.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Phone className="w-6 h-6 flex-shrink-0" style={{ color: theme.primary }} />
                                <div>
                                    <p className="font-semibold mb-1">Phone</p>
                                    <p className="text-gray-600">{contact?.phone}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Mail className="w-6 h-6 flex-shrink-0" style={{ color: theme.primary }} />
                                <div>
                                    <p className="font-semibold mb-1">Email</p>
                                    <p className="text-gray-600">{contact?.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Clock className="w-6 h-6 flex-shrink-0" style={{ color: theme.primary }} />
                                <div>
                                    <p className="font-semibold mb-1">Hours</p>
                                    <p className="text-gray-600">{contact?.hours}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>Departments</h3>
                            {contact?.departments?.map((dept, idx) => (
                                <Card key={idx}>
                                    <CardContent className="p-4">
                                        <p className="font-semibold mb-2" style={{ fontFamily: fonts.heading }}>{dept.name}</p>
                                        <p className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>📞 {dept.phone}</p>
                                        <p className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>✉️ {dept.email}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primary, fontFamily: fonts.heading }}>Send Us a Message</h3>
                                <form className="space-y-4">
                                    <Input placeholder="Full Name" />
                                    <Input type="email" placeholder="Email Address" />
                                    <Input type="tel" placeholder="Phone Number" />
                                    <Input placeholder="Subject" />
                                    <Textarea placeholder="Your Message" rows={6} />
                                    <Button className="w-full" size="lg" style={{ backgroundColor: theme.primary }}>
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}