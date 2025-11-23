
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Shield, BarChart, Headphones, Globe, PenSquare, PhoneCall, MessagesSquare, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const enterpriseFeatures = [
  {
    icon: Globe,
    title: 'AI-Prompted Website Building',
    description: 'Instantly generates professional dealership websites with AI guidance. Includes smart templates designed for RVs, autos, and multi-lot groups.',
    benefits: ['No more waiting weeks for a developer', 'Updates (inventory, specials) can be done in minutes', 'Prevents outdated or broken pages'],
    animation: 'group-hover:rotate-[15deg]'
  },
  {
    icon: PenSquare,
    title: 'AI-Prompted Content Creation',
    description: 'Generates compelling copy, inventory descriptions, and marketing posts. Bots create campaign-ready captions, ads, and videos.',
    benefits: ['Eliminate the burden of writing vehicle descriptions', 'Maintain a consistent voice across channels', 'Spend less on agencies and keep content fresh'],
    animation: 'group-hover:-rotate-[12deg]'
  },
  {
    icon: PhoneCall,
    title: 'AI Sales Calls & Follow-Up Automation',
    description: 'AI bots initiate automated, conversational sales calls to new leads and handle follow-ups instantly—via call, email, text, or chat.',
    benefits: ['Ensures every lead is contacted within seconds, 24/7', 'Frees up your sales team to focus on warm, qualified prospects', 'Sales teams waste fewer leads due to slow responses'],
    animation: 'group-hover:scale-110'
  },
  {
    icon: BarChart,
    title: 'Real-Time Reporting & Analytics',
    description: 'Dashboards show conversions, campaign ROI, and lead source performance. AI bots flag unusual drops in traffic or leads automatically.',
    benefits: ['Get clarity on which channels actually generate revenue', 'Identify wasted ad spend quickly', 'See website → lead → sale in one connected view'],
    animation: 'group-hover:-translate-y-1'
  },
  {
    icon: MessagesSquare,
    title: 'Direct Social Comment Integration',
    description: 'Bots monitor Facebook, Instagram, TikTok, and YouTube comments. AI responds, tags, and pushes leads into the CRM instantly.',
    benefits: ['No customer comment goes unanswered', 'Capture leads hidden in social chatter', 'Build reputation for responsiveness without extra staff'],
    animation: 'group-hover:translate-x-1'
  },
  {
    icon: Calculator,
    title: 'AI-Powered Financing Tools',
    description: 'Smart calculators for monthly payments, trade-in values, and approvals. Bots guide customers through pre-qualification right on the site.',
    benefits: ['Keeps customers engaged longer (financing is a make-or-break)', 'Shortens sales cycle—customers arrive pre-qualified', 'Boosts F&I opportunities with personalized recommendations'],
    animation: 'group-hover:scale-105 group-hover:rotate-6'
  }
];

export default function Enterprise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Enterprise <span className="text-blue-400">Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Scale your dealership group with AI-powered technology designed for enterprise 
            operations, multi-location management, and advanced integrations.
          </p>
          <Link to={createPageUrl('BookDemo')}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-xl">
              Schedule Enterprise Demo
            </Button>
          </Link>
        </div>

        {/* Enterprise Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {enterpriseFeatures.map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-white/20 hover:border-white/30">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-all duration-300">
                    <feature.icon className={`w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-all duration-300 ${feature.animation}`} />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">{feature.title}</CardTitle>
                </div>
                <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:bg-blue-300 transition-all duration-300"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Benefits */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Enterprise?
            </h2>
            <p className="text-xl text-gray-300">
              Built for scale, security, and performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Scalable Architecture</h3>
              <p className="text-gray-300">Handle thousands of locations with enterprise-grade infrastructure</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-gray-300">SOC 2 compliant with advanced security and compliance features</p>
            </div>
            <div className="text-center">
              <Headphones className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Dedicated Support</h3>
              <p className="text-gray-300">24/7 support with dedicated account management and onboarding</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Scale Your Dealership Group?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s discuss your enterprise needs and create a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('BookDemo')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-xl">
                Request Enterprise Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
