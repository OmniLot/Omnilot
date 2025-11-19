
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from 'lucide-react';
// import { InvokeLLM } from '@/api/integrations'; // Temporarily disabled - will be replaced with MongoDB API

const faqCategories = [
  {
    title: 'Getting Started',
    questions: [
      { question: 'How do I set up my first AI website?', answer: 'Setting up your AI website is simple! After signing up, use our guided setup wizard to connect your inventory, choose a template, and customize your branding. Most dealerships are live within 30 minutes.' },
      { question: 'What inventory systems do you support?', answer: 'We support all major DMS systems including CDK, Reynolds & Reynolds, DealerTrack, and more. We also accept XML/JSON feeds from AutoTrader, Cars.com, and custom sources.' },
      { question: 'How long does implementation take?', answer: 'Most dealerships are up and running within 1-2 business days. Enterprise customers with custom integrations typically take 1-2 weeks for full deployment.' }
    ]
  },
  {
    title: 'AI Features',
    questions: [
      { question: 'How does the AI chatbot work?', answer: 'Our AI chatbot is trained on automotive industry knowledge and your specific inventory. It can answer questions about vehicles, schedule test drives, provide financing information, and qualify leads 24/7.' },
      { question: 'Can I customize the AI responses?', answer: 'Yes! You can train the AI with your dealership-specific information, pricing, policies, and frequently asked questions to provide personalized responses to your customers.' },
      { question: 'What languages does the AI support?', answer: 'Currently we support English and Spanish, with plans to add French and other languages based on customer demand.' }
    ]
  },
  {
    title: 'Billing & Pricing',
    questions: [
      { question: 'What\'s included in the free trial?', answer: 'Our 14-day free trial includes full access to all features: AI website builder, chatbot, inventory integration, and basic analytics. No credit card required.' },
      { question: 'Can I change plans anytime?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.' },
      { question: 'Do you offer custom enterprise pricing?', answer: 'Yes, we offer custom pricing for dealership groups with 5+ locations. Contact our sales team for a personalized quote.' }
    ]
  }
];

const omniLotCompanyInfo = `
OMNI.LOT COMPANY INFORMATION:

Company Basics:
- Name: Omni.Lot
- Founded: 2024-2025 (startup phase)
- Headquarters: Oregon, USA
- Industry: Dealership automation software (automotive & RV focus)
- Mission: Transform how dealerships connect with customers, manage inventory, and grow through the power of AI
- Vision: Build the most complete AI-powered dealership ecosystem, combining websites, marketing, analytics, and automation into one seamless hub

About Us:
Who We Are: Omni.Lot was founded with a mission to change how dealerships operate. We saw an industry weighed down by outdated software, scattered tools, and expensive systems that slow growth. From Oregon, we're building a new standard — one powered by AI, automation, and intelligence.

What We Do: Our platform unifies everything dealerships need: websites, marketing, analytics, financing, and customer engagement. Instead of juggling multiple systems, Omni.Lot brings it all into one seamless, AI-driven hub that works smarter, faster, and more affordably.

Our Vision: We believe the future of dealerships is fully connected, automated, and intelligent. Our goal is to help every dealership — large or small — unlock efficiency, reduce costs, and focus on what matters most: selling more and creating lasting customer relationships.

CORE FEATURES:

🔹 AI-Powered Website Builder
- Build dealership websites in minutes with AI
- Drag-and-drop customization, mobile-first design
- Built-in SEO, inventory integration, and fast load times

🔹 Lead Management & CRM Lite
- Smart lead capture from web, calls, and social
- AI auto-classifies leads (Hot / Warm / Cold)
- Centralized dashboard with follow-up tracking

🔹 AutoCaller AI
- Automated outbound calls & follow-ups
- Customizable voice scripting and tone
- Appointment booking synced to calendars
- Real-time lead status updates (Interested, Later, Not Interested)

🔹 Messaging Suite (SMS + Email)
- Bulk and automated SMS/email campaigns
- AI-generated templates + scheduling
- Sandbox preview for testing messages
- Engagement analytics (open, click, reply rates)

🔹 Content & Social Media Bot
- AI-generated posts, captions, and ad creatives
- Multi-platform scheduling (Facebook, Instagram, TikTok, YouTube, LinkedIn)
- Direct integration with Facebook Marketplace for vehicle listings
- Social inbox with smart reply prompts
- AI analytics on engagement and growth

🔹 Financing & Lending Hub
- Integrate with existing lender portals
- Simple UI overlay for approvals & applications
- Surface-level analytics: approval rates, average terms, conversion tracking

🔹 Analytics & Insights
- Unified dashboard with surface-level KPIs
- Visual charts: leads, calls, appointments, sales
- AI insights: which leads convert, which ads drive sales
- Dealer-defined success metrics

🔹 Hosting, Security, & Compliance
- Cloud-based, scalable infrastructure
- Role-based access controls + secure data storage
- Built for compliance with dealership data standards

Pricing:
- Starter: $500/month (baseline tools, smaller dealerships)
- Growth: $900/month (core suite, mid-size dealerships)  
- Pro: $1,200/month (full suite, enterprise dealerships, advanced analytics & bots)
- Founding 50 Program (Oregon launch): Lifetime discounted pricing, early feature access, priority onboarding

Development Roadmap:
- Phase 1 (0-4 Months): Infrastructure, baseline website builder, core SMS/email integrations
- Phase 2 (4-8 Months): ContentBot, FollowUpBot, early analytics dashboards
- Phase 3 (8-12 Months): FinanceBot, SocialBot 2.0, advanced DataBot analytics
- Phase 4 (12-18 Months): Dealer Marketplace, Omni.Lot mobile app, VR/AR showroom pilots

Goals:
- Capture 50 Oregon dealerships through Founding 50 program
- Scale to 75-100 dealerships nationwide in year one
- Expand to multi-state rollout by year two
- Position as leading AI-driven dealership ecosystem

Differentiators:
- All-in-One Platform: Replaces multiple expensive, fragmented tools
- AI-First Approach: Websites, bots, analytics all powered by AI prompts
- Cost Advantage: Maximum value at competitive pricing
- Scalable Content Engine: 10-12K AI-generated photos and 5-10K videos per month, per dealer
- Dealer Influence: Early adopters shape the roadmap via Founding 50

Contact Information:
- Email: omni.lotservices@gmail.com
- Phone: 1+(503)-592-6043 (Available 24/7)
- Location: Portland, Oregon, United States
`;

const faqContext = faqCategories.map(cat => 
    `Category: ${cat.title}\n` + 
    cat.questions.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n')
).join('\n\n');

// Separate ChatInput component to prevent re-renders
const ChatInput = React.memo(({ onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleSend = useCallback(() => {
        if (!inputValue.trim() || isLoading) return;
        onSendMessage(inputValue);
        setInputValue('');
    }, [inputValue, isLoading, onSendMessage]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !isLoading && inputValue.trim()) {
            handleSend();
        }
    }, [inputValue, isLoading, handleSend]);

    useEffect(() => {
        if (!isLoading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLoading]);

    return (
        <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
                <Input 
                    ref={inputRef}
                    placeholder="Ask a question..." 
                    className="bg-gray-700 border-gray-600 focus:border-blue-500" 
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <Button 
                    size="icon" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 flex-shrink-0"
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
});

// Separate ChatInterface component
const ChatInterface = React.memo(({ messages, isLoading, onSendMessage, forceOpen, onClose }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesEndRef]); // Added messagesEndRef to dependencies

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    return (
        <div className="w-80 md:w-96 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-2xl">
            <div className="flex flex-col h-[28rem]">
                <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-lg">AI Assistant</h4>
                        <p className="text-sm text-gray-400">Powered by Omni.Lot AI</p>
                    </div>
                    {forceOpen && (
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            ✕
                        </button>
                    )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'bot' && <Bot className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />}
                            <div className={`max-w-xs md:max-w-sm rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                {msg.text}
                            </div>
                            {msg.sender === 'user' && <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 items-start">
                            <Bot className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                            <div className="bg-gray-700 rounded-lg px-3 py-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
});

export default function HelpWidget({ forceOpen = false, onClose = null, initialMessage = null }) {
    const [isOpen, setIsOpen] = useState(forceOpen);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Have a question about Omni.Lot? I can help with features, pricing, and more. Ask me anything!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasProcessedInitialMessage, setHasProcessedInitialMessage] = useState(false);

    useEffect(() => {
        if (forceOpen) setIsOpen(true);
    }, [forceOpen]);

    const handleSendMessage = useCallback(async (messageText) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const llmPrompt = `You are a helpful and knowledgeable AI assistant for Omni.Lot, a company providing AI-powered automation and website solutions for car dealerships and RV dealers. Your goal is to answer user questions helpfully and accurately using the comprehensive company information provided below.

Always be enthusiastic about Omni.Lot's capabilities and focus on how our AI-driven platform can transform dealership operations. If someone asks about features, pricing, or company information, use the detailed information provided. Keep answers concise, friendly, and professional.

${omniLotCompanyInfo}

--- FAQ CONTEXT ---
${faqContext}

--- USER QUESTION ---
${messageText}

--- ANSWER ---
Provide a helpful, accurate response based on the Omni.Lot information above:`;
            
            // TODO: Replace with MongoDB API call
            // Temporarily disabled - will be replaced with custom LLM API
            // const response = await InvokeLLM({ 
            //     prompt: llmPrompt,
            //     add_context_from_internet: false
            // });
            const response = "I'm currently unavailable. Please contact our support team at omni.lotservices@gmail.com for assistance.";
            const botMessage = { sender: 'bot', text: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("LLM Error:", error);
            const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later or contact our support team at omni.lotservices@gmail.com" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]); // InvokeLLM, omniLotCompanyInfo, faqContext are stable or external

    useEffect(() => {
        if (initialMessage && !hasProcessedInitialMessage && isOpen) {
            setHasProcessedInitialMessage(true);
            setTimeout(() => {
                handleSendMessage(initialMessage);
            }, 500);
        }
    }, [initialMessage, hasProcessedInitialMessage, isOpen, handleSendMessage]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setHasProcessedInitialMessage(false);
        if (onClose) onClose();
    }, [onClose]);

    const chatProps = useMemo(() => ({
        messages,
        isLoading,
        onSendMessage: handleSendMessage,
        forceOpen,
        onClose: handleClose
    }), [messages, isLoading, handleSendMessage, forceOpen, handleClose]);

    if (forceOpen) {
        return <ChatInterface {...chatProps} />;
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                    aria-label="Open AI Assistant"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-30"></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-50"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Bot className="w-8 h-8 animate-bounce" style={{ animationDuration: '2s' }} />
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent 
                className="ml-2 mb-2 p-0" 
                side="top" 
                align="start"
            >
                <ChatInterface {...chatProps} />
            </PopoverContent>
        </Popover>
    );
}
