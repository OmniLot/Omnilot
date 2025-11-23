
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Book, Mail, Phone, Search, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import HelpWidget from '../components/shared/HelpWidget';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

const supportOptions = [
  {
    id: 'live-chat',
    title: 'Live Chat',
    description: 'Get instant help from our support', // Changed from 'Get instant help from our support team'
    icon: MessageCircle,
    action: 'Start Chat',
    availability: 'Available 24/7',
    gradient: 'from-green-500 to-emerald-500',
    hoverClasses: {
      card: 'group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-green-500/30',
      iconContainer: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.8)]',
      icon: 'group-hover:animate-pulse',
      button: 'group-hover:shadow-lg group-hover:shadow-green-400/50'
    }
  },
  {
    id: 'email-support',
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: Mail,
    action: 'Get Email Address',
    availability: 'Available 24/7',
    gradient: 'from-blue-500 to-cyan-500',
    hoverClasses: {
      card: 'group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20',
      iconContainer: '',
      icon: 'group-hover:-translate-y-1',
      button: 'group-hover:from-blue-400 group-hover:to-cyan-400'
    }
  },
  {
    id: 'phone-support',
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    icon: Phone,
    action: 'Call Now',
    availability: 'Available 24/7', // This was previously '1+(503)-592-6043'
    gradient: 'from-purple-500 to-violet-500',
    hoverClasses: {
      card: 'group-hover:shadow-2xl group-hover:shadow-purple-500/20',
      iconContainer: '',
      icon: 'animate-ring-on-hover',
      button: 'group-hover:shadow-lg group-hover:shadow-purple-400/50'
    }
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'Browse our comprehensive guides',
    icon: Book,
    action: 'Browse Articles',
    availability: 'Available 24/7',
    gradient: 'from-orange-500 to-amber-500',
    hoverClasses: {
      card: 'group-hover:shadow-2xl group-hover:shadow-orange-500/20',
      iconContainer: '',
      icon: 'animate-flip-on-hover',
      button: 'group-hover:scale-105'
    }
  }
];

const faqCategories = [
  {
    title: 'Getting Started',
    questions: [
      {
        question: 'How do I set up my first AI website?',
        answer: 'You can build your first site in minutes. Just enter your dealership name, upload your logo, and choose your preferred style. Our AI instantly generates a live dealership website with inventory, financing tools, and lead capture built in. Or use templates — start from one of our pre-built layouts for RV, automotive, or marine dealerships, and then customize it with drag-and-drop tools.'
      },
      {
        question: 'What inventory systems do you support?',
        answer: 'Omni.Lot is its own intelligent inventory system — built directly into the platform. Dealerships can easily add vehicles by entering a VIN, and the system will auto-fill detailed specifications, photos, and features. For bulk management, you can import or export data seamlessly through CSV, making it simple to move inventory in or out of the platform without the hassle of third-party integrations.'
      },
      {
        question: 'How long does implementation take?',
        answer: 'Implementation is fast — most dealerships are up and running in just a few hours. Core setup (site + SMS/email + inventory sync) is nearly instant, with bots and analytics layered in during onboarding.'
      }
    ]
  },
  {
    title: 'AI Features',
    questions: [
      {
        question: 'How does the AI chatbot work?',
        answer: 'Our chatbot engages visitors 24/7, answering questions, scheduling appointments, and capturing leads in real time. It uses natural language processing trained for dealership conversations — so customers get instant, accurate responses, and your team gets more qualified leads.'
      },
      {
        question: 'Can I customize the AI responses?',
        answer: 'Yes. You control the tone, language, and content of responses. You can set custom prompts, FAQs, and workflows so the chatbot sounds like your brand while still running on advanced AI.'
      },
      {
        question: 'What languages does the AI support?',
        answer: 'Omni.Lot supports multiple languages, including English and Spanish at launch. More languages will roll out as part of our future development roadmap.'
      }
    ]
  },
  {
    title: 'Billing & Pricing',
    questions: [
      {
        question: 'How does billing work?',
        answer: 'We bill monthly based on your selected plan. You can upgrade or downgrade at any time, with changes taking effect immediately. All payments are processed securely, and you\'ll receive detailed invoices for your records.'
      },
      {
        question: 'Can I change plans anytime?',
        answer: 'Absolutely. You can upgrade or downgrade based on your dealership\'s needs. Plans are month-to-month, so you\'re never locked in.'
      },
      {
        question: 'Do you offer custom enterprise pricing?',
        answer: 'Yes. Larger dealerships and groups can access enterprise plans with volume discounts, advanced features, and dedicated support. Contact us for a tailored proposal.'
      }
    ]
  }
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState({});
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % supportOptions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + supportOptions.length) % supportOptions.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedFAQ(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSupportOptionClick = (optionId) => {
    if (optionId === 'live-chat') {
      setIsChatOpen(true);
    }
    // Logic for other options is handled by their respective Link/a components
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .group:hover .animate-ring-on-hover {
          animation: ring 0.4s ease-in-out;
        }

        @keyframes flip {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(180deg); }
        }
        .group:hover .animate-flip-on-hover {
          animation: flip 0.6s ease-in-out;
        }

        .fade-in-help {
            opacity: 0;
            display: inline-block;
            animation: fadeInHelpAnimation 1.5s ease-in-out 0.5s forwards;
        }

        @keyframes fadeInHelpAnimation {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
      `}</style>
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-green-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 right-10 w-20 h-20 border border-cyan-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 border border-pink-400 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-amber-400 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-green-500/8 rounded-full blur-3xl animate-pulse delay-3000"></div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60 hidden md:block"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-40 delay-1000 hidden md:block"></div>
      <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-50 delay-2000 hidden md:block"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-30 delay-1500 hidden md:block"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-40 delay-2500 hidden md:block"></div>

      {/* Tech Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Can We <span className="text-blue-400 fade-in-help">Help</span>?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get the support you need to make the most of your Omni.Lot platform. 
            Our expert team is here to help you succeed.
          </p>

          {/* Futuristic Search */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 rounded-xl backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Support Options - Mobile Carousel */}
        <div className="md:hidden mb-12">
          <div className="relative h-[380px] flex items-center">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slides */}
            <div className="w-full px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {(() => {
                    const option = supportOptions[currentIndex];
                    const cardElement = (
                      <Card className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 group cursor-pointer relative overflow-hidden ${option.hoverClasses.card} min-h-[320px] flex flex-col justify-center`}>
                        <CardHeader className="text-center relative z-10 py-2 px-3">
                          <div className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg ${option.hoverClasses.iconContainer}`}>
                            <option.icon className={`w-8 h-8 text-white transition-transform duration-300 ${option.hoverClasses.icon}`} />
                          </div>
                          <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300 mb-1.5">
                            {option.title}
                          </CardTitle>
                          <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-snug">{option.description}</p>
                        </CardHeader>
                        <CardContent className="text-center relative z-10 py-2 px-3">
                          <div 
                            aria-hidden="true"
                            className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r ${option.gradient} hover:shadow-lg hover:shadow-blue-500/25 mb-1.5 transition-all duration-300 text-white font-medium ${option.hoverClasses.button} h-9 px-4 py-2`}
                          >
                            {option.action}
                          </div>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{option.availability}</p>
                        </CardContent>

                        {/* Floating particles on hover */}
                        <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-300 delay-200"></div>
                      </Card>
                    );

                    if (option.id === 'live-chat') {
                      return (
                        <div onClick={() => handleSupportOptionClick(option.id)} className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                          {cardElement}
                        </div>
                      );
                    } else if (option.id === 'phone-support') {
                      const cleanedPhoneNumber = '15035926043';
                      const telHref = `tel:+${cleanedPhoneNumber}`; 
                      return (
                        <a href={telHref} className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                          {cardElement}
                        </a>
                      );
                    } else {
                      const pageName = option.id === 'email-support' ? 'EmailSupport' : 'Documentation';
                      return (
                        <Link to={createPageUrl(pageName)} className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                          {cardElement}
                        </Link>
                      );
                    }
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {supportOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-blue-500' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Support Options - Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {supportOptions.map((option) => {
            const cardElement = (
              <Card className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 group cursor-pointer relative overflow-hidden ${option.hoverClasses.card}`}>
                
                <CardHeader className="text-center relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg ${option.hoverClasses.iconContainer}`}>
                    <option.icon className={`w-8 h-8 text-white transition-transform duration-300 ${option.hoverClasses.icon}`} />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                    {option.title}
                  </CardTitle>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{option.description}</p>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div 
                    aria-hidden="true"
                    className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r ${option.gradient} hover:shadow-lg hover:shadow-blue-500/25 mb-3 transition-all duration-300 text-white font-medium ${option.hoverClasses.button} h-10 px-4 py-2`}
                  >
                    {option.action}
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{option.availability}</p>
                </CardContent>

                {/* Floating particles on hover */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-300 delay-200"></div>
              </Card>
            );

            if (option.id === 'live-chat') {
              return (
                <div key={option.id} onClick={() => handleSupportOptionClick(option.id)} className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                    {cardElement}
                </div>
              );
            } else if (option.id === 'phone-support') {
              
              const cleanedPhoneNumber = '15035926043'; // Assuming a static number for the link, as "Available 24/7" isn't a phone number
              const telHref = `tel:+${cleanedPhoneNumber}`; 
              return (
                <a href={telHref} key={option.id} className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                  {cardElement}
                </a>
              );
            } else { // 'email-support' or 'knowledge-base'
              const pageName = option.id === 'email-support' ? 'EmailSupport' : 'Documentation';
              return (
                <Link to={createPageUrl(pageName)} key={option.id} className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
                  {cardElement}
                </Link>
              );
            }
          })}
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{category.title}</h3>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`;
                      const isExpanded = expandedFAQ[key];
                      
                      return (
                        <Card key={questionIndex} className="overflow-hidden bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-300">
                          <CardHeader 
                            className="cursor-pointer hover:bg-gray-700/30 transition-colors duration-300 relative"
                            onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          >
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                                {faq.question}
                              </CardTitle>
                              <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-blue-400" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-500" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          
                          {isExpanded && (
                            <CardContent className="border-t border-gray-700/50 bg-gray-700/20">
                              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="lg:sticky lg:top-24 bg-gray-800/50 border-gray-700 backdrop-blur-sm relative overflow-hidden">
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-white">Contact Support</CardTitle>
                <p className="text-gray-400">Can&apos;t find what you&apos;re looking for? Send us a message.</p>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Your name"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="your.email@dealership.com"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <Input
                    value={contactForm.subject}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    placeholder="How can we help?"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    placeholder="Please describe your question or issue..."
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  Send Message
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsChatOpen(false)}></div>
          <div className="absolute bottom-6 left-6">
            <HelpWidget 
              forceOpen={true} 
              onClose={() => setIsChatOpen(false)} 
              initialMessage="Help Me Today"
            />
          </div>
        </div>
      )}
    </div>
  );
}
