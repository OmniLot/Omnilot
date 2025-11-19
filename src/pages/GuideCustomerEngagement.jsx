import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bot, MessageSquare, FileText, Bell } from 'lucide-react';

const topics = [
  {
    icon: Bot,
    title: 'Automated AI Responses Across Text, Email, and Chat',
    description: 'AI chatbot handles FAQs like: “Do you offer financing?” or “What’s the warranty?” and books test drives automatically.'
  },
  {
    icon: MessageSquare,
    title: 'Social Inbox for Facebook & Instagram Messages',
    description: 'Unified inbox merges DMs, comments, and Messenger leads. Sales reps can reply in one dashboard or let AI send auto-responses.'
  },
  {
    icon: FileText,
    title: 'Personalized Follow-up Scripts for Every Lead',
    description: 'Scripts adapt to the customer’s stage: First-time buyer → “Here’s what to expect when financing your first vehicle.” Returning lead → “That Tacoma you liked now has $500 off.”'
  },
  {
    icon: Bell,
    title: 'Instant Alerts When Customers Re-engage',
    description: 'Sales reps get mobile alerts if a past lead reopens an email, clicks a vehicle link, or comes back to the site.'
  }
];

export default function GuideCustomerEngagement() {
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
          <h1 className="text-4xl font-bold mb-4">Customer Engagement</h1>
          <p className="text-lg text-gray-600">Turn shoppers into buyers with smarter engagement tools.</p>
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