import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Activity, BadgePercent, Car, BarChart2 } from 'lucide-react';

const topics = [
  {
    icon: Activity,
    title: 'Real-Time Tracking of Leads, Calls, and Sales',
    description: 'Visual pipeline shows current leads, conversations, and closed deals. Managers see who on the sales team is converting best.'
  },
  {
    icon: BadgePercent,
    title: 'Conversion Rates for Campaigns and Follow-ups',
    description: 'Track Facebook ad spend vs sales, compare organic leads vs paid, and view call response success rates.'
  },
  {
    icon: Car,
    title: 'Vehicle Performance Insights (What Sells, What Doesn’t)',
    description: 'Heatmap identifies which vehicles move fastest in your market (e.g., used SUVs under $25k) and which sit too long.'
  },
  {
    icon: BarChart2,
    title: 'Simple Charts and Graphs for Clarity',
    description: 'Interactive charts exportable to PDF/CSV for management meetings.'
  }
];

export default function GuideAnalyticsDashboard() {
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
          <h1 className="text-4xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">See your performance in one glance with actionable insights.</p>
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