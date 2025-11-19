import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LayoutTemplate, Palette, TrendingUp, Smartphone, ClipboardList } from 'lucide-react';

const topics = [
  {
    icon: LayoutTemplate,
    title: 'AI-Powered Website Templates',
    description: 'Includes conversion-optimized designs for RV, auto, and marine dealerships. Templates auto-populate with dealer inventory, staff bios, and service options.'
  },
  {
    icon: Palette,
    title: 'Custom Branding Setup',
    description: 'Upload logos, select fonts, and generate a brand color palette. The AI suggests matching button/CTA styles for consistency.'
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description: 'SEO engine automatically generates title tags, schema markup, and meta descriptions for every vehicle. Sites are Google Analytics and Search Console ready.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsiveness',
    description: 'Pages are designed with mobile-first layouts, tested across iOS/Android, ensuring load times under 2 seconds.'
  },
  {
    icon: ClipboardList,
    title: 'Lead Form Configuration',
    description: 'Custom lead forms with pre-qualification (credit, trade-in, financing). Data feeds directly into CRM/DMS, reducing double entry.'
  }
];

export default function GuideWebsiteBuilder() {
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
          <h1 className="text-4xl font-bold mb-4">Website Builder</h1>
          <p className="text-lg text-gray-600">Build and customize your dealership website with intelligent tools.</p>
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