import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPlus, DatabaseZap, Rocket, StepForward } from 'lucide-react';

const topics = [
  {
    icon: UserPlus,
    title: 'Account Setup & Onboarding',
    description: 'Step-by-step guided onboarding. Dealers simply enter their business info, upload their logo, set store hours, and invite their team. The system automatically configures default lead forms, connects to CRM/DMS if available, and provides a guided tour of the dashboard. Average setup time: 15 minutes.'
  },
  {
    icon: DatabaseZap,
    title: 'Connect Your Inventory Feed',
    description: 'Supports real-time VIN decoding, CSV upload, and direct integrations with Dealertrack, CDK, and Reynolds. Dealers can also connect to auction feeds or sync existing listings from Facebook Marketplace.'
  },
  {
    icon: Rocket,
    title: 'Launch Your First AI Website',
    description: 'Dealers choose from 10+ AI-optimized templates. The AI fills in vehicle details, generates SEO-friendly descriptions, and recommends homepage layouts. With one click, the site goes live under the dealer’s custom domain.'
  },
  {
    icon: StepForward,
    title: 'Basic Configuration Walkthrough',
    description: 'Interactive setup wizard that covers store policies, warranty/financing options, and sales tax settings. Configs auto-sync across inventory, lead forms, and contracts.'
  }
];

export default function GuideGettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <Link to={createPageUrl('Documentation')}>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-lg text-gray-600">Quick setup guides for new dealerships to get you up and running in minutes.</p>
        </div>

        <div className="space-y-8">
          {topics.map((topic, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 bg-gray-100/50 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <topic.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mt-1">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-lg text-gray-700">
                {topic.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}