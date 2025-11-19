import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mailbox, Star, Workflow, Zap, PieChart } from 'lucide-react';

const topics = [
  {
    icon: Mailbox,
    title: 'Automated Follow-ups via Calls, Texts, and Email',
    description: 'Twilio + SendGrid integration enables automated follow-ups: Day 1: “Thanks for checking out the F-150, want to schedule a test drive?” Day 3: Financing options sent by email. Day 7: SMS with trade-in estimator.'
  },
  {
    icon: Star,
    title: 'Lead Scoring (Hot, Warm, Cold)',
    description: 'AI ranks leads: Hot = submitted financing form, Warm = multiple vehicle views, Cold = email opened but no click.'
  },
  {
    icon: Workflow,
    title: 'Email Automation Flows',
    description: 'Pre-built flows: abandoned lead recovery, service appointment reminders, post-purchase upsells.'
  },
  {
    icon: Zap,
    title: 'Custom Triggers & Actions',
    description: 'Dealers can set: “If a customer visits the same vehicle page 3+ times → send personalized financing offer.”'
  },
  {
    icon: PieChart,
    title: 'Performance Analytics',
    description: 'Dashboard shows open rates, click-throughs, and cost per lead. Dealers can compare email vs SMS vs calls effectiveness.'
  }
];

export default function GuideAIAutomations() {
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
          <h1 className="text-4xl font-bold mb-4">AI Automations</h1>
          <p className="text-lg text-gray-600">Let AI handle the busy work so your team can focus on selling.</p>
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