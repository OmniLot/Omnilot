import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, FileEdit, CopyCheck, ShieldCheck } from 'lucide-react';

const topics = [
  {
    icon: RefreshCw,
    title: 'Sync Vehicles Automatically in Real-Time',
    description: 'Instant vehicle sync from DMS or VIN scanner. If a car is sold in-store, it disappears online in under 60 seconds.'
  },
  {
    icon: FileEdit,
    title: 'Update Prices, Photos, and Details with One Click',
    description: 'Upload unlimited high-res images and videos, then push updates to your site, Facebook, Autotrader, Cars.com, and Craigslist in one shot.'
  },
  {
    icon: CopyCheck,
    title: 'Keep Listings Consistent Across Channels',
    description: 'AI audits ensure price and description consistency across all platforms. Example: If MSRP changes in your system, Omni.Lot updates every listing automatically.'
  },
  {
    icon: ShieldCheck,
    title: 'Quick Tools to Fix Common Inventory Issues',
    description: 'Built-in health check: flags missing VINs, duplicate stock numbers, blurry images, or vehicles priced out of market range.'
  }
];

export default function GuideInventoryIntegration() {
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
          <h1 className="text-4xl font-bold mb-4">Inventory Integration</h1>
          <p className="text-lg text-gray-600">Easily connect and manage your inventory with powerful, automated tools.</p>
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