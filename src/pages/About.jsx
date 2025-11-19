import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Lightbulb, Award, MapPin, Mail, Phone } from 'lucide-react';

const companyValues = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to empower dealerships with AI technology that drives real business results.',
    hoverClasses: {
      card: 'group-hover:bg-gray-800/70',
      iconContainer: 'group-hover:animate-ping',
      icon: '',
      text: ''
    }
  },
  {
    icon: Users,
    title: 'Customer-First',
    description: 'Every feature we build starts with understanding our customers\' real-world challenges.',
    hoverClasses: {
      card: '',
      iconContainer: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]',
      icon: 'group-hover:scale-125',
      text: 'group-hover:-translate-y-1'
    }
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push the boundaries of what\'s possible with AI in the automotive industry.',
    hoverClasses: {
      card: 'group-hover:bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-gray-800/50',
      iconContainer: '',
      icon: 'animate-flicker-on-hover',
      text: ''
    }
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from code to customer service.',
    hoverClasses: {
      card: 'group-hover:border-yellow-400/50 group-hover:shadow-2xl group-hover:shadow-yellow-400/10',
      iconContainer: 'shine-effect',
      icon: 'group-hover:rotate-12',
      text: ''
    }
  }
];

const aboutSections = [
  {
    title: 'Who We Are',
    content: 'Omni.Lot was founded with a mission to change how dealerships operate. We saw an industry weighed down by outdated software, scattered tools, and expensive systems that slow growth. From Oregon, we\'re building a new standard — one powered by AI, automation, and intelligence.',
    cta: 'Learn More',
    ctaAction: () => {}
  },
  {
    title: 'What We Do',
    content: 'Our platform unifies everything dealerships need: websites, marketing, analytics, financing, and customer engagement. Instead of juggling multiple systems, Omni.Lot brings it all into one seamless, AI-driven hub that works smarter, faster, and more affordably.',
    cta: 'Explore Features',
    ctaAction: () => {}
  },
  {
    title: 'Our Vision',
    content: 'We believe the future of dealerships is fully connected, automated, and intelligent. Our goal is to help every dealership — large or small — unlock efficiency, reduce costs, and focus on what matters most: selling more and creating lasting customer relationships.',
    cta: 'See Our Vision',
    ctaAction: () => {}
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white relative overflow-hidden">
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; color: #60a5fa; }
          50% { opacity: 0.7; color: #facc15; }
        }
        .group:hover .animate-flicker-on-hover {
          animation: flicker 0.5s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%) skewX(-20deg);
        }
        .group:hover .shine-effect::before {
          animation: shine 1s ease-in-out;
        }

        @keyframes underlineSlide {
          0% { width: 0; left: 50%; }
          100% { width: 100%; left: 0; }
        }
        .heading-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          transition: all 0.3s ease;
        }
        .heading-underline:hover::after {
          animation: underlineSlide 0.3s ease forwards;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3); }
        }
        .heading-underline:hover {
          animation: glow-pulse 0.6s ease;
        }

        .fade-in-backed-by-ai-about {
            opacity: 0;
            display: inline-block;
            animation: fadeInBackedByAIAbout 1.5s ease-in-out 0.5s forwards;
        }

        @keyframes fadeInBackedByAIAbout {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Digital particle effects */
        .digital-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .digital-particles::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, #60a5fa 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.03;
          animation: float 20s linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-100px) translateX(100px); }
        }

        /* Circuit line effects */
        .circuit-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, transparent 98%, rgba(59, 130, 246, 0.1) 99%, transparent 100%),
            linear-gradient(0deg, transparent 98%, rgba(59, 130, 246, 0.1) 99%, transparent 100%);
          background-size: 100px 100px;
          opacity: 0.5;
        }
      `}</style>
      
      {/* Digital background effects */}
      <div className="digital-particles"></div>
      <div className="circuit-lines"></div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="relative text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for Dealers, <span className="text-blue-400 fade-in-backed-by-ai-about">Backed by AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We&apos;re building a new standard for dealership technology — one that&apos;s smarter, faster, and more affordable.
          </p>
        </div>

        {/* About Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {aboutSections.map((section, index) => (
            <Card key={index} className="relative overflow-hidden bg-gray-800/30 border border-blue-400/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-400/20 hover:border-blue-400/40 group rounded-xl">
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
              
              <CardHeader className="text-center relative z-10 pb-4">
                <CardTitle className="text-2xl font-bold text-blue-400 mb-4 relative heading-underline group-hover:text-blue-300 transition-colors duration-300">
                  {section.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 px-6 pb-6">
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  {section.content}
                </p>
                
                <div className="text-center">
                  <Button 
                    onClick={section.ctaAction}
                    className="bg-blue-600/80 hover:bg-blue-500 text-white border border-blue-400/30 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-105 px-6 py-2"
                  >
                    {section.cta}
                  </Button>
                </div>
              </CardContent>

              {/* Hover glow border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Company Values - Desktop only */}
        <div className="mb-20 hidden md:block">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 group ${value.hoverClasses.card}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-all duration-300 ${value.hoverClasses.iconContainer}`}>
                    <value.icon className={`w-8 h-8 text-blue-400 transition-all duration-300 ${value.hoverClasses.icon}`} />
                  </div>
                  <div className={`transition-transform duration-300 ${value.hoverClasses.text}`}>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="relative overflow-hidden bg-gray-800/50 border border-gray-700 shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg opacity-50"></div>
          <CardContent className="relative z-10 p-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-blue-500/30 group-hover:bg-blue-600/40 group-hover:border-blue-500/60 transition-all duration-300">
                  <MapPin className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Headquarters</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Portland, Oregon<br />United States</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-blue-500/30 group-hover:bg-blue-600/40 group-hover:border-blue-500/60 transition-all duration-300">
                  <Mail className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Email</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">omni.lotservices@gmail.com</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-blue-500/30 group-hover:bg-blue-600/40 group-hover:border-blue-500/60 transition-all duration-300">
                  <Phone className="w-8 h-8 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Phone</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">1+(503)-592-6043<br />Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60 hidden md:block"></div>
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-40 delay-1000 hidden md:block"></div>
        <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-30 delay-2000 hidden md:block"></div>
      </div>
    </div>
  );
}
