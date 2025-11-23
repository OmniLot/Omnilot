
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Book, Zap, Settings, Globe, BarChart, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const docSections = [
  {
    title: 'Getting Started',
    icon: Book,
    description: 'Quick setup guides for new dealerships.',
    href: createPageUrl('GuideGettingStarted')
  },
  {
    title: 'Inventory Integration',
    icon: Settings,
    description: 'Easily connect and manage your inventory.',
    href: createPageUrl('GuideInventoryIntegration')
  },
  {
    title: 'Website Builder',
    icon: Globe,
    description: 'Build and customize your dealership website.',
    href: createPageUrl('GuideWebsiteBuilder')
  },
  {
    title: 'AI Automations',
    icon: Zap,
    description: 'Let AI handle the busy work.',
    href: createPageUrl('GuideAIAutomations')
  },
  {
    title: 'Analytics Dashboard',
    icon: BarChart,
    description: 'See your performance in one glance.',
    href: createPageUrl('GuideAnalyticsDashboard')
  },
  {
    title: 'Customer Engagement',
    icon: MessageSquare,
    description: 'Turn shoppers into buyers with smarter engagement.',
    href: createPageUrl('GuideCustomerEngagement')
  }
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <style>{`
        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .group:hover .pulse-on-hover {
          animation: pulse-icon 0.3s ease-in-out;
        }

        .fade-in-documentation {
            opacity: 0;
            animation: fadeInDocumentation 1.5s ease-in-out 0.5s forwards;
        }

        @keyframes fadeInDocumentation {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
      `}</style>
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-green-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 border border-pink-400 rounded-full animate-pulse delay-1500"></div>
      </div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-blue-400 fade-in-documentation">Documentation</span> & Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Everything you need to get started with Omni.Lot. From basic setup 
            to advanced integrations, we&apos;ve got you covered.
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
             <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-gray-700/60 border-gray-500 text-white placeholder-gray-300 rounded-xl backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
             </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {docSections.map((section) => (
            <Link to={section.href} key={section.title}>
              <Card className="h-full bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-400/80 transition-all duration-300 group cursor-pointer hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <section.icon className="w-6 h-6 text-blue-400 transition-transform duration-300 pulse-on-hover" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                      {section.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-300">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                      <div className="text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Guide <ArrowRight className="w-4 h-4" />
                      </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our team is here to help you set up your dealership with AI technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-xl">
              Schedule Onboarding Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
