import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Helper function to create page URLs
const createPageUrl = (pageName) => {
  switch (pageName) {
    case 'ContactSales':
      return '/support';
    default:
      return '/';
  }
};

const pricingPlans = [
  {
    name: 'Starter',
    price: 500,
    credits: '1,400 credits',
    popular: false,
    features: [
      '1 User',
      '1 AI Bot (Lead Handling)',
      '20 Social Templates', // Updated from '20 Social Posts/Month'
      '1 Landing Page',
      'Inventory Listing & Brand Kit',
      'Basic Analytics',
      'Standard Support' // Added Standard Support to Starter plan
    ]
  },
  {
    name: 'Growth',
    price: 900,
    credits: '3,600 credits',
    popular: false,
    features: [
      '3 Users',
      'Access to 2 AI Bots',
      'AutoCaller AI (Limited)',
      '60 Social Templates',
      'Up to 5 Pages',
      'Vehicle Promotion Tools',
      'AI Lead Qualification',
      'Appointment Calendar',
      'Standard Support'
    ]
  },
  {
    name: 'Pro',
    price: 1200,
    credits: '7,200 credits',
    popular: true,
    features: [
      '10 Users',
      'Unlimited Access to All Bots & Tools (incl. AutoCaller AI)',
      '120 Social Templates',
      'Up to 10 Pages',
      'Full Lending Hub Access',
      'Inventory Integrations',
      'AI Lead Qualification',
      'Smart Appointment Booking',
      'Advanced Analytics',
      'Priority Support'
    ]
  }
];

const comparisonFeatures = [
    { feature: 'Users', starter: '1', growth: '3', pro: '10' },
    { feature: 'AI Bots (Lead Handling)', starter: false, growth: true, pro: true },
    { feature: 'Access to All AI Bot Types', starter: '1 Type', growth: '2 Types', pro: 'Unlimited' },
    { feature: 'AutoCaller AI', starter: false, growth: 'Limited', pro: true },
    { feature: 'Social Templates', starter: '20', growth: '60 Templates', pro: '120 Templates' }, // Updated from 'Social Posts/Month'
    { feature: 'Website Pages', starter: '1 Landing Page', growth: 'Up to 5', pro: 'Up to 10' },
    { feature: 'Inventory Listing & Brand Kit', starter: true, growth: true, pro: true },
    { feature: 'Vehicle Promotion Tools', starter: false, growth: true, pro: true },
    { feature: 'AI Lead Qualification', starter: false, growth: true, pro: true },
    { feature: 'Appointment Calendar', starter: false, growth: true, pro: 'Smart Booking' },
    { feature: 'Full Lending Hub Access', starter: false, growth: false, pro: true },
    { feature: 'Inventory Integrations', starter: false, growth: false, pro: true },
    { feature: 'Basic Analytics', starter: true, growth: true, pro: false },
    { feature: 'Advanced Analytics', starter: false, growth: false, pro: true },
    { feature: 'Standard Support', starter: true, growth: true, pro: true }, // Updated Starter to true
    { feature: 'Priority Support', starter: false, growth: false, pro: true },
];

const renderFeatureValue = (value) => {
    if (value === true) {
        return <Check className="w-5 h-5 text-green-400 mx-auto" />;
    }
    if (value === false) {
        return <span className="text-gray-500">-</span>;
    }
    return <span className="text-gray-300">{value}</span>;
};

export default function Pricing() {
  const stripeLinks = {
    'Starter': 'https://buy.stripe.com/bJe4gzc1Q8QGeNv4lh0Ny00',
    'Growth': 'https://buy.stripe.com/5kQ14naXM8QG5cV5pl0Ny01',
    'Pro': 'https://buy.stripe.com/14A28raXMaYOfRz7xt0Ny02'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background tech patterns and bubbles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-blue-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 right-10 w-20 h-20 border border-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 border border-purple-400 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-green-400 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-green-500/8 rounded-full blur-3xl animate-pulse delay-3000"></div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60 hidden md:block"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-40 delay-1000 hidden md:block"></div>
      <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping opacity-50 delay-2000 hidden md:block"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30 delay-1500 hidden md:block"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40 delay-2500 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-blue-400">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your dealership. All plans include core AI features 
            and can be customized to your specific needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col overflow-hidden transition-all duration-300 rounded-2xl bg-gray-800/50 border-gray-700 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:border-white/30 ${
              plan.popular 
                ? 'border-2 border-blue-500 shadow-lg' 
                : 'hover:border-white/40'
            }`}>

              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-center py-1 px-4 text-sm font-medium rounded-b-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`relative z-10 ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="text-center">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-1">/mo</span>
                  </div>
                  <p className="text-blue-400 font-semibold">{plan.credits}</p>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-grow relative z-10">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                        plan.popular 
                          ? 'bg-blue-500' 
                          : 'bg-gray-700'
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${
                          plan.popular ? 'text-white' : 'text-blue-400'
                        }`} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                    <a href={stripeLinks[plan.name]} target="_blank" rel="noopener noreferrer">
                      <Button className={`w-full rounded-lg text-base py-3 transition-all duration-300 hover:scale-105 ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-500' 
                          : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-500'
                      }`}>
                        Choose Plan
                      </Button>
                    </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="my-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Compare All Features
          </h2>
          <div className="max-w-5xl mx-auto bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl overflow-x-auto">
            <div className="min-w-[600px]">
                <div className="grid grid-cols-4 text-center font-bold p-5 bg-gray-700/40">
                  <div className="text-left text-lg text-white">Features</div>
                  <div className="text-lg text-white">Starter</div>
                  <div className="text-lg text-white">Growth</div>
                  <div className="text-lg text-blue-400">Pro</div>
                </div>
                <div className="divide-y divide-gray-700/50">
                  {comparisonFeatures.map((feat, index) => (
                    <div key={index} className="grid grid-cols-4 items-center p-4 text-sm hover:bg-gray-700/50 transition-colors duration-200">
                      <div className="font-medium text-gray-300 text-left">{feat.feature}</div>
                      <div className="text-center">{renderFeatureValue(feat.starter)}</div>
                      <div className="text-center">{renderFeatureValue(feat.growth)}</div>
                      <div className="text-center">{renderFeatureValue(feat.pro)}</div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">
            Questions? We're here to help.
          </h2>
          <Link to={createPageUrl('ContactSales')}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
