import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { invokeLLM } from '@/api/integrations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Sparkles, Save, Send, Laptop, Smartphone, PanelLeftClose, PanelLeft, Wand2, FileText, Maximize2, CheckCircle2, RefreshCw } from 'lucide-react';
import HeaderBlock from '@/components/website-blocks/HeaderBlock';
import HeroBlock from '@/components/website-blocks/HeroBlock';
import AboutHomeBlock from '@/components/website-blocks/AboutHomeBlock';
import FeaturedVehiclesBlock from '@/components/website-blocks/FeaturedVehiclesBlock';
import FinancingHomeBlock from '@/components/website-blocks/FinancingHomeBlock';
import TestimonialsBlock from '@/components/website-blocks/TestimonialsBlock';
import GalleryBlock from '@/components/website-blocks/GalleryBlock';
import ContactHomeBlock from '@/components/website-blocks/ContactHomeBlock';
import FooterBlock from '@/components/website-blocks/FooterBlock';
import InventoryBlock from '@/components/website-blocks/InventoryBlock';
import AboutBlock from '@/components/website-blocks/AboutBlock';
import FinancingBlock from '@/components/website-blocks/FinancingBlock';
import ContactBlock from '@/components/website-blocks/ContactBlock';
import FinancingApplicationModal from '@/components/financing/FinancingApplicationModal';
import AdvancedSearchBar from '@/components/search/AdvancedSearchBar';

export default function BuildWebsite() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [savedId, setSavedId] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [viewMode, setViewMode] = useState('desktop');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);
    
    const [showFinancingModal, setShowFinancingModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [searchFilters, setSearchFilters] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const goalParam = urlParams.get('goal');
        
        if (goalParam) {
            setPrompt(goalParam);
            setChatMessages([{ role: 'user', content: goalParam }]);
            generateWebsite(goalParam);
        } else {
            navigate(createPageUrl('Landing'));
        }
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const generateWebsite = async (userPrompt) => {
        setIsGenerating(true);
        try {
            const response = await invokeLLM({
                prompt: `🚗 ULTIMATE AUTO DEALERSHIP WEBSITE GENERATOR 
Generate a complete, production-ready dealership website for: "${userPrompt}"

🎨 VISUAL TEMPLATE SYSTEM - Mix and match these elements:

**COLOR SCHEMES** (Choose 1 that matches prompt):
1. Adventure Green: Primary #1B4332, Accent #F97316, Soft #F0FDF4
2. Luxury Navy: Primary #0F172A, Accent #D4AF37, Soft #F8FAFC
3. Electric Blue: Primary #2563EB, Accent #4ADE80, Soft #EEF2FF
4. Performance Red: Primary #DC2626, Accent #1F2937, Soft #FEF2F2
5. Family Sky: Primary #38BDF8, Accent #F59E0B, Soft #FEF3C7
6. Premium Charcoal: Primary #1E293B, Accent #FACC15, Soft #F8FAFC

**FONT COMBINATIONS** (Choose 1 that matches vibe):
1. Modern Bold: Heading "Poppins", Body "Inter"
2. Luxury Elegant: Heading "Cormorant Garamond", Body "Montserrat"
3. Adventure Friendly: Heading "Nunito", Body "Open Sans"
4. Tech Forward: Heading "Space Grotesk", Body "Inter"
5. Classic Trust: Heading "Playfair Display", Body "Work Sans"

**BUTTON STYLES** (Choose 1):
- Shape: "rounded-md" or "rounded-full"
- Style: "solid" with hover effects or "gradient" with shimmer

**CARD STYLES** (Choose 1):
- "elevated" (shadow-lg with hover lift)
- "bordered" (border-2 with accent on hover)
- "glassmorphism" (backdrop-blur with transparency)

🚀 AUTO SALES WOW FACTORS - Include 4-6 of these:

**Interactive Features:**
- ✨ Live Payment Calculator (monthly payment with sliders)
- 🔄 Vehicle Comparison Tool (compare 2-3 vehicles side-by-side)
- 💰 Trade-In Value Estimator
- 📊 Finance vs Lease Calculator
- ⭐ Credit Score Simulator
- 🎯 Vehicle Finder Quiz (answer questions, get recommendations)
- 📱 Text-to-Apply (text keyword for instant pre-approval)
- 🚗 Virtual Test Drive Scheduler with calendar

**Visual Effects:**
- 🎬 Video hero backgrounds with overlay text
- ✨ Parallax scrolling sections
- 🌟 3D vehicle card hover effects (tilt, rotate, zoom)
- 💫 Animated stats counter (sales, customers served, satisfaction %)
- 🎨 Gradient overlays with opacity changes
- 🔥 Featured vehicle spotlight with rotating carousel
- 📸 Before/After trade-in galleries
- 🌊 Smooth scroll animations (fade-in, slide-up)

**Trust Builders:**
- 🏆 Awards and certifications badges
- ⭐ Real-time review feed from Google/Facebook
- 📈 Satisfaction ratings with animated bars
- 🛡️ Security badges (SSL, BBB, etc.)
- 👥 Team member bios with photos
- 📊 Transparent pricing breakdown
- ✅ No-haggle pricing badges
- 🎁 Special offers ticker

**Urgency & Social Proof:**
- ⏰ Limited time offer countdown timers
- 🔥 "Just Sold" notifications (animated toast)
- 👀 "X people viewing this vehicle" live counter
- 💨 "Going Fast" badges on hot inventory
- 🎊 "Deal of the Week" spotlight
- 📢 Customer success stories with photos

📋 COMPLETE CONTENT REQUIREMENTS:

**HOME PAGE - 9 SECTIONS:**

1. HEADER:
   - logo_text: Business name
   - menu: ["Home", "Inventory", "Financing", "About", "Contact"]
   - cta_button: "Get Pre-Approved" or "Shop Now"

2. HERO (with wow factor):
   - headline: Compelling, benefit-focused (e.g., "Drive Your Dream Car Today")
   - subheadline: Clear value prop (e.g., "Flexible financing • 500+ vehicles • Same-day approval")
   - cta_primary: "Browse Inventory"
   - cta_secondary: "Calculate Payment" or "Check Trade-In Value"
   - background_image_url: High-res vehicle photo
   - background_overlay: "rgba(0,0,0,0.4)"

3. ABOUT SECTION:
   - heading: "Why Choose [Business Name]"
   - paragraph: 2-3 compelling sentences about expertise, selection, service
   - button_text: "Our Story"
   - image_url: Team or showroom photo
   - stats: [
       { label: "Vehicles Sold", value: "5,000+" },
       { label: "Happy Customers", value: "4,800+" },
       { label: "Satisfaction Rate", value: "98%" }
     ]

4. FEATURED INVENTORY (4-6 vehicles):
   Each with:
   - title: "2024 Toyota Camry SE"
   - tagline: "Sporty sedan with advanced safety"
   - price: "$28,995"
   - image_url: Vehicle photo
   - key_features: ["Leather Interior", "Backup Camera", "Apple CarPlay", "30 MPG Highway"]
   - badges: ["New Arrival", "Low Miles", "Certified", "Popular"]

5. FINANCING SECTION (3 plans + calculator):
   - heading: "Flexible Financing Options"
   - paragraph: "Get approved in minutes with rates as low as 2.9% APR"
   - plans: [
       {
         name: "Standard Financing",
         description: "Great rates for most buyers",
         down_payment: "10% down",
         apr: "4.9% APR",
         terms: "24-72 months",
         cta: "Get Pre-Approved",
         features: ["Same-day approval", "No prepayment penalty", "Gap insurance available"]
       },
       {
         name: "Premium Financing",
         description: "Best rates for excellent credit",
         down_payment: "15% down",
         apr: "2.9% APR",
         terms: "36-60 months",
         cta: "Apply Now",
         features: ["Lowest rates", "Extended warranty included", "Priority service"]
       },
       {
         name: "Zero Down",
         description: "Drive today with no money down",
         down_payment: "0% down",
         apr: "5.9% APR",
         terms: "48-84 months",
         cta: "Check Eligibility",
         features: ["No down payment", "Trade-in accepted", "Flexible terms"]
       }
     ]
   - main_cta: "Apply for Financing"

6. TESTIMONIALS (4 reviews):
   [
     {
       quote: "Best car buying experience! The team was honest, transparent, and got me the perfect SUV for my family. The financing process was seamless.",
       customer_name: "Jennifer Martinez",
       location: "Seattle, WA",
       rating: 5,
       vehicle_purchased: "2023 Honda CR-V"
     },
     (3 more similar detailed reviews)
   ]

7. GALLERY (7-9 images):
   {
     heading: "Experience Our Dealership",
     subheading: "See our showroom, service center, and happy customers",
     images: [
       { image_url: "...", caption: "State-of-the-art showroom" },
       { image_url: "...", caption: "Expert service center" },
       { image_url: "...", caption: "Family-friendly waiting area" },
       (4-6 more with captions)
     ]
   }

8. CONTACT SECTION:
   - heading: "Visit Us Today"
   - subheading: "Stop by for a test drive or chat with our team"
   - address: "1234 Auto Plaza Drive, [City], [State] 12345"
   - phone: "(555) 123-4567"
   - email: "sales@[businessname].com"
   - hours: "Mon-Fri: 9AM-8PM | Sat: 9AM-6PM | Sun: 11AM-5PM"
   - cta_button: "Schedule Test Drive"
   - image_url: Showroom exterior

9. FOOTER:
   - logo_text: Same as header
   - tagline: "Your trusted automotive partner"
   - quick_links: [
       { text: "Inventory", url: "#" },
       { text: "Financing", url: "#" },
       { text: "About Us", url: "#" },
       { text: "Contact", url: "#" }
     ]
   - social_links: [
       { platform: "Facebook", url: "#" },
       { platform: "Instagram", url: "#" },
       { platform: "Twitter", url: "#" }
     ]
   - address, phone, email, hours: Same as contact
   - copyright: "© 2025 [Business Name]. All rights reserved."

**ABOUT PAGE - Complete with:**
- hero_title: "[Business Name] - Your Automotive Partner Since [Year]"
- hero_subtitle: "Serving [location] with integrity and expertise"
- hero_image_url: Team photo
- story: {
    title: "Our Journey",
    content: "Founded in [year], we've grown from a small family business to [location]'s most trusted dealership. Our mission has always been simple: provide quality vehicles, transparent pricing, and exceptional service. Today, we're proud to have helped over 5,000 families find their perfect vehicle.",
    founder_name: "John Smith",
    image_url: Founder photo
  }
- mission: "To make car buying transparent, enjoyable, and accessible to everyone in our community."
- values: [5 values with titles, descriptions, emojis]
- team: [6 team members with names, roles, bios, photos]
- milestones: [8 historical milestones with years and achievements]

**INVENTORY PAGE - 12-15 vehicles:**
- page_title: "Browse Our Premium Inventory"
- page_subtitle: "Over 500 quality vehicles in stock"
- categories: ["Sedans", "SUVs", "Trucks", "Sports Cars"] (adjust to prompt)
- vehicles: [12-15 complete vehicle listings with:
    - Full specs (engine, transmission, mileage, fuel_type, condition)
    - 6-8 features each
    - Realistic make/model/year
    - Category assignment
    - Unique image URLs
  ]

**FINANCING PAGE - 4 plans + 8 FAQs:**
- page_title: "Flexible Financing Solutions"
- page_subtitle: "We work with all credit types"
- plans: [4 detailed financing plans]
- calculator_section: { title, description }
- faqs: [8 common questions with detailed answers:
    "What credit score do I need?",
    "Can I trade in my vehicle?",
    "How long does approval take?",
    "What documents do I need?",
    "Do you offer warranties?",
    "Can I refinance later?",
    "What's the minimum down payment?",
    "Do you have special programs?"
  ]

**CONTACT PAGE:**
- page_title: "Get In Touch"
- page_subtitle: "We're here to help you find your perfect vehicle"
- departments: [
    { name: "Sales", phone: "(555) 123-4567", email: "sales@..." },
    { name: "Finance", phone: "(555) 123-4568", email: "finance@..." },
    { name: "Service", phone: "(555) 123-4569", email: "service@..." }
  ]

📸 STOCK PHOTO LIBRARY (USE THESE REAL URLS):

**Luxury/Premium:**
Hero: https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600
Vehicles: 
- https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800
- https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800
- https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800
- https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800

**SUVs/Trucks:**
Hero: https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600
Vehicles:
- https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800
- https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800
- https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800
- https://images.unsplash.com/photo-1587018191116-ebc1bb63c357?w=800

**RVs/Adventure:**
Hero: https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1600
Vehicles:
- https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800
- https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800
- https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800
- https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800

**Electric Vehicles:**
Hero: https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600
Vehicles:
- https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800
- https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800
- https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800

**Sports/Performance:**
Hero: https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600
Vehicles:
- https://images.unsplash.com/photo-1580414057011-c19b7d589f94?w=800
- https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800
- https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800

**Lifestyle/Gallery:**
- https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800 (Road trip)
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800 (Mountain)
- https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800 (Team)
- https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800 (Showroom)
- https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800 (Dealership)
- https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800 (Office)
- https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800 (Handshake)

🎯 CRITICAL REQUIREMENTS:
✅ Choose color scheme that matches prompt keywords
✅ Select font pair that matches brand vibe
✅ Include 4-6 wow factors relevant to auto sales
✅ ALL sections must have COMPLETE data (no empty arrays)
✅ All vehicles must have unique images
✅ Testimonials must be realistic and detailed
✅ Gallery must have 7-9 images with captions
✅ Financing plans must have all fields filled
✅ FAQs must have 8 complete questions with answers
✅ Use provided image URLs (no made-up URLs)

Generate a COMPLETE, PRODUCTION-READY dealership website now!`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        website_name: { type: "string" },
                        business_type: { type: "string" },
                        location: { type: "string" },
                        tagline: { type: "string" },
                        template_style: { type: "string" },
                        wow_factors: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of wow factors included in this website"
                        },
                        meta: {
                            type: "object",
                            properties: {
                                theme: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        primary: { type: "string" },
                                        accent: { type: "string" },
                                        bg: { type: "string" },
                                        soft: { type: "string" },
                                        text: { type: "string" }
                                    },
                                    required: ["name", "primary", "accent", "bg", "soft", "text"]
                                },
                                fonts: {
                                    type: "object",
                                    properties: {
                                        heading: { type: "string" },
                                        body: { type: "string" }
                                    },
                                    required: ["heading", "body"]
                                },
                                variants: {
                                    type: "object",
                                    properties: {
                                        buttonShape: { type: "string" },
                                        buttonStyle: { type: "string" },
                                        cardStyle: { type: "string" },
                                        heroLayout: { type: "string" },
                                        navStyle: { type: "string" }
                                    }
                                }
                            },
                            required: ["theme", "fonts", "variants"]
                        },
                        style: {
                            type: "object",
                            properties: {
                                typography: {
                                    type: "object",
                                    properties: {
                                        h1: { type: "string" },
                                        h2: { type: "string" },
                                        body: { type: "string" }
                                    }
                                },
                                spacing: {
                                    type: "object",
                                    properties: {
                                        sectionY: { type: "number" },
                                        inner: { type: "number" },
                                        radius: { type: "number" }
                                    }
                                }
                            }
                        },
                        pages: {
                            type: "object",
                            properties: {
                                home: {
                                    type: "object",
                                    properties: {
                                        header: {
                                            type: "object",
                                            properties: {
                                                logo_text: { type: "string" },
                                                menu: { type: "array", items: { type: "string" }, minItems: 5 },
                                                cta_button: { type: "string" }
                                            },
                                            required: ["logo_text", "menu", "cta_button"]
                                        },
                                        hero: {
                                            type: "object",
                                            properties: {
                                                headline: { type: "string" },
                                                subheadline: { type: "string" },
                                                cta_primary: { type: "string" },
                                                cta_secondary: { type: "string" },
                                                background_type: { type: "string" },
                                                background_image_url: { type: "string" },
                                                background_overlay: { type: "string" }
                                            },
                                            required: ["headline", "subheadline", "cta_primary", "cta_secondary", "background_image_url"]
                                        },
                                        about_section: {
                                            type: "object",
                                            properties: {
                                                heading: { type: "string" },
                                                paragraph: { type: "string" },
                                                button_text: { type: "string" },
                                                image_url: { type: "string" }
                                            },
                                            required: ["heading", "paragraph", "button_text", "image_url"]
                                        },
                                        featured_inventory: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    title: { type: "string" },
                                                    tagline: { type: "string" },
                                                    price: { type: "string" },
                                                    image_url: { type: "string" },
                                                    key_features: { type: "array", items: { type: "string" }, minItems: 4 }
                                                },
                                                required: ["title", "tagline", "price", "image_url", "key_features"]
                                            },
                                            minItems: 4
                                        },
                                        financing_section: {
                                            type: "object",
                                            properties: {
                                                heading: { type: "string" },
                                                paragraph: { type: "string" },
                                                plans: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string" },
                                                            description: { type: "string" },
                                                            down_payment: { type: "string" },
                                                            apr: { type: "string" },
                                                            terms: { type: "string" },
                                                            cta: { type: "string" }
                                                        },
                                                        required: ["name", "description", "down_payment", "apr", "terms", "cta"]
                                                    },
                                                    minItems: 3
                                                },
                                                main_cta: { type: "string" }
                                            },
                                            required: ["heading", "paragraph", "plans", "main_cta"]
                                        },
                                        testimonials: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    quote: { type: "string" },
                                                    customer_name: { type: "string" },
                                                    location: { type: "string" },
                                                    rating: { type: "number" },
                                                    vehicle_purchased: { type: "string" }
                                                },
                                                required: ["quote", "customer_name", "location", "rating", "vehicle_purchased"]
                                            },
                                            minItems: 4
                                        },
                                        gallery: {
                                            type: "object",
                                            properties: {
                                                heading: { type: "string" },
                                                subheading: { type: "string" },
                                                images: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            image_url: { type: "string" },
                                                            caption: { type: "string" }
                                                        },
                                                        required: ["image_url", "caption"]
                                                    },
                                                    minItems: 7
                                                }
                                            },
                                            required: ["heading", "subheading", "images"]
                                        },
                                        contact_section: {
                                            type: "object",
                                            properties: {
                                                heading: { type: "string" },
                                                subheading: { type: "string" },
                                                address: { type: "string" },
                                                phone: { type: "string" },
                                                email: { type: "string" },
                                                hours: { type: "string" },
                                                cta_button: { type: "string" },
                                                image_url: { type: "string" }
                                            },
                                            required: ["heading", "subheading", "address", "phone", "email", "hours", "cta_button"]
                                        },
                                        footer: {
                                            type: "object",
                                            properties: {
                                                logo_text: { type: "string" },
                                                tagline: { type: "string" },
                                                quick_links: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            text: { type: "string" },
                                                            url: { type: "string" }
                                                        }
                                                    },
                                                    minItems: 4
                                                },
                                                social_links: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            platform: { type: "string" },
                                                            url: { type: "string" }
                                                        }
                                                    },
                                                    minItems: 3
                                                },
                                                address: { type: "string" },
                                                phone: { type: "string" },
                                                email: { type: "string" },
                                                hours: { type: "string" },
                                                copyright: { type: "string" }
                                            },
                                            required: ["logo_text", "tagline", "copyright"]
                                        }
                                    },
                                    required: ["header", "hero", "about_section", "featured_inventory", "financing_section", "testimonials", "gallery", "contact_section", "footer"]
                                },
                                about: {
                                    type: "object",
                                    properties: {
                                        hero_title: { type: "string" },
                                        hero_subtitle: { type: "string" },
                                        hero_image_url: { type: "string" },
                                        story: {
                                            type: "object",
                                            properties: {
                                                title: { type: "string" },
                                                content: { type: "string" },
                                                founder_name: { type: "string" },
                                                image_url: { type: "string" }
                                            },
                                            required: ["title", "content", "founder_name"]
                                        },
                                        mission: { type: "string" },
                                        values: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    title: { type: "string" },
                                                    description: { type: "string" },
                                                    icon_emoji: { type: "string" }
                                                },
                                                required: ["title", "description", "icon_emoji"]
                                            },
                                            minItems: 5
                                        },
                                        team: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: { type: "string" },
                                                    role: { type: "string" },
                                                    bio: { type: "string" },
                                                    image_url: { type: "string" }
                                                },
                                                required: ["name", "role", "bio"]
                                            },
                                            minItems: 6
                                        },
                                        milestones: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    year: { type: "string" },
                                                    achievement: { type: "string" }
                                                },
                                                required: ["year", "achievement"]
                                            },
                                            minItems: 8
                                        }
                                    },
                                    required: ["hero_title", "story", "mission", "values", "team", "milestones"]
                                },
                                inventory: {
                                    type: "object",
                                    properties: {
                                        page_title: { type: "string" },
                                        page_subtitle: { type: "string" },
                                        categories: { type: "array", items: { type: "string" }, minItems: 3 },
                                        vehicles: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    title: { type: "string" },
                                                    year: { type: "string" },
                                                    make: { type: "string" },
                                                    model: { type: "string" },
                                                    category: { type: "string" },
                                                    price: { type: "string" },
                                                    description: { type: "string" },
                                                    image_url: { type: "string" },
                                                    specs: {
                                                        type: "object",
                                                        properties: {
                                                            engine: { type: "string" },
                                                            transmission: { type: "string" },
                                                            mileage: { type: "string" },
                                                            fuel_type: { type: "string" },
                                                            condition: { type: "string" }
                                                        },
                                                        required: ["engine", "transmission", "mileage", "condition"]
                                                    },
                                                    features: { type: "array", items: { type: "string" }, minItems: 6 }
                                                },
                                                required: ["title", "year", "make", "model", "price", "description", "image_url", "specs", "features"]
                                            },
                                            minItems: 12
                                        }
                                    },
                                    required: ["page_title", "categories", "vehicles"]
                                },
                                financing: {
                                    type: "object",
                                    properties: {
                                        page_title: { type: "string" },
                                        page_subtitle: { type: "string" },
                                        hero_image_url: { type: "string" },
                                        plans: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: { type: "string" },
                                                    tagline: { type: "string" },
                                                    apr_range: { type: "string" },
                                                    term_options: { type: "array", items: { type: "string" }, minItems: 3 },
                                                    down_payment: { type: "string" },
                                                    best_for: { type: "string" },
                                                    features: { type: "array", items: { type: "string" }, minItems: 4 }
                                                },
                                                required: ["name", "tagline", "apr_range", "term_options", "down_payment", "best_for", "features"]
                                            },
                                            minItems: 4
                                        },
                                        calculator_section: {
                                            type: "object",
                                            properties: {
                                                title: { type: "string" },
                                                description: { type: "string" }
                                            },
                                            required: ["title", "description"]
                                        },
                                        faqs: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    question: { type: "string" },
                                                    answer: { type: "string" }
                                                },
                                                required: ["question", "answer"]
                                            },
                                            minItems: 8
                                        }
                                    },
                                    required: ["page_title", "plans", "faqs"]
                                },
                                contact: {
                                    type: "object",
                                    properties: {
                                        page_title: { type: "string" },
                                        page_subtitle: { type: "string" },
                                        address: { type: "string" },
                                        phone: { type: "string" },
                                        email: { type: "string" },
                                        hours: { type: "string" },
                                        departments: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: { type: "string" },
                                                    phone: { type: "string" },
                                                    email: { type: "string" }
                                                },
                                                required: ["name", "phone", "email"]
                                            },
                                            minItems: 3
                                        },
                                        form_fields: { type: "array", items: { type: "string" }, minItems: 4 }
                                    },
                                    required: ["page_title", "address", "phone", "email", "hours", "departments"]
                                }
                            },
                            required: ["home", "about", "inventory", "financing", "contact"]
                        }
                    },
                    required: ["website_name", "business_type", "tagline", "meta", "pages"]
                }
            });

            setGeneratedContent(response);
            
            const vehicleCount = response?.pages?.inventory?.vehicles?.length || 0;
            const themeName = response?.meta?.theme?.name || 'Professional';
            const templateStyle = response?.template_style || 'Modern';
            const fontPair = `${response?.meta?.fonts?.heading} + ${response?.meta?.fonts?.body}`;
            const wowFactors = response?.wow_factors?.join(', ') || 'N/A';
            
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `✨ Created complete ${templateStyle} ${response.business_type} website!\n\n🎨 Template: ${templateStyle}\n🎯 Theme: ${themeName}\n📝 Fonts: ${fontPair}\n🚀 Wow Factors: ${wowFactors}\n\n📦 Generated Pages:\n✅ Home (9 sections with images)\n✅ About (Story + 6 team + 8 milestones)\n✅ Inventory (${vehicleCount} vehicles with specs)\n✅ Financing (4 plans + 8 FAQs)\n✅ Contact (Full info + departments)\n\nSwitch pages to explore everything!` 
            }]);
        } catch (error) {
            console.error('Error generating website:', error);
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `❌ Error: ${error.message || 'Failed to generate website'}` 
            }]);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleQuickAction = async (action) => {
        setIsChatLoading(true);
        
        let actionPrompt = '';
        switch(action) {
            case 'formal':
                actionPrompt = 'Rewrite the hero headline and subheadline in a more formal, professional tone';
                break;
            case 'casual':
                actionPrompt = 'Rewrite the hero headline and subheadline in a more casual, friendly tone';
                break;
            case 'persuasive':
                actionPrompt = 'Rewrite the hero headline and subheadline to be more persuasive and compelling';
                break;
            case 'summarize':
                actionPrompt = 'Summarize the about section content to be more concise';
                break;
            case 'expand':
                actionPrompt = 'Expand the about section with more details and storytelling';
                break;
            case 'grammar':
                actionPrompt = 'Check all content for grammar and spelling errors and suggest fixes';
                break;
            default:
                actionPrompt = '';
                break;
        }
        
        setChatMessages(prev => [...prev, { role: 'user', content: actionPrompt }]);
        
        try {
            // TODO: Replace with MongoDB API call
            // Temporarily disabled
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '✨ Great idea! I can help you refine that content. What specific section would you like me to work on?' 
            }]);
            setIsChatLoading(false);
            return;
            
            /* Commented out - will be replaced with custom API
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `For the ${generatedContent.business_type} website, ${actionPrompt}. Provide specific suggestions.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        response: { type: "string" }
                    }
                }
            });

            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: response.response 
            }]);
            */
        } catch (error) {
            console.error('Error in quick action:', error);
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '✨ Great idea! I can help you refine that content. What specific section would you like me to work on?' 
            }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || !generatedContent) return;

        const userMessage = chatInput;
        setChatInput('');
        setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsChatLoading(true);

        try {
            // TODO: Replace with MongoDB API call
            // Temporarily disabled
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'I understand! Let me know what changes you need.' 
            }]);
            setIsChatLoading(false);
            return;
            
            /* Commented out - will be replaced with custom API
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `User request about ${generatedContent.business_type}: ${userMessage}. Provide helpful response.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        response: { type: "string" }
                    }
                }
            });

            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: response.response 
            }]);
            */
        } catch (error) {
            console.error('Error in chat submit:', error);
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'I understand! Let me know what changes you need.' 
            }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleSaveWebsite = async () => {
        if (!generatedContent) return;
        
        setIsSaving(true);
        // TODO: Replace with MongoDB API call
        // Temporarily disabled
        alert('Save feature is temporarily disabled. This will be rebuilt with MongoDB backend.');
        setIsSaving(false);
        
        /* Commented out - will be replaced with custom API
        try {
            await base44.entities.GeneratedWebsite.create({
                user_prompt: prompt,
                website_name: generatedContent.website_name,
                website_data: generatedContent,
                html_code: 'Multi-page website',
                css_code: 'Generated CSS',
                status: 'draft'
            });
            
            setSavedId(true);
            setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '✅ Website saved successfully!' 
            }]);
        } catch (error) {
            console.error('Error saving website:', error);
        } finally {
            setIsSaving(false);
        }
        */
    };

    const renderPageContent = () => {
        if (!generatedContent) return null;

        const styleKit = {
            theme: generatedContent.meta?.theme,
            fonts: generatedContent.meta?.fonts,
            variants: generatedContent.meta?.variants,
            typography: generatedContent.style?.typography,
            spacing: generatedContent.style?.spacing
        };

        const homeData = generatedContent.pages?.home;

        // Navigation handler to switch pages
        const handleNavigate = (pageName) => {
            setCurrentPage(pageName);
            // Scroll to top when navigating
            const previewContainer = document.querySelector('.flex-1.overflow-auto.bg-gray-100');
            if (previewContainer) {
                previewContainer.scrollTop = 0;
            }
        };

        // Open financing application
        const openFinancingModal = (vehicle = null) => {
            setSelectedVehicle(vehicle);
            setShowFinancingModal(true);
        };

        // Handle search
        const handleSearch = (filters) => {
            setSearchFilters(filters);
        };

        switch(currentPage) {
            case 'home':
                return (
                    <>
                        <HeaderBlock content={homeData?.header} styleKit={styleKit} onNavigate={handleNavigate} />
                        <HeroBlock content={homeData?.hero} styleKit={styleKit} onApplyNow={() => openFinancingModal()} />
                        <div className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
                            <div className="max-w-7xl mx-auto">
                                <AdvancedSearchBar 
                                    inventory={generatedContent.pages?.inventory} 
                                    styleKit={styleKit}
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                        <AboutHomeBlock content={homeData?.about_section} styleKit={styleKit} />
                        <FeaturedVehiclesBlock vehicles={homeData?.featured_inventory} styleKit={styleKit} onApplyNow={openFinancingModal} />
                        <FinancingHomeBlock content={homeData?.financing_section} styleKit={styleKit} onApplyNow={() => openFinancingModal()} />
                        <TestimonialsBlock testimonials={homeData?.testimonials} styleKit={styleKit} />
                        <GalleryBlock content={homeData?.gallery} styleKit={styleKit} />
                        <ContactHomeBlock content={homeData?.contact_section} styleKit={styleKit} />
                        <FooterBlock content={homeData?.footer} styleKit={styleKit} onNavigate={handleNavigate} />
                        <FinancingApplicationModal 
                            isOpen={showFinancingModal} 
                            onClose={() => setShowFinancingModal(false)}
                            vehicle={selectedVehicle}
                            styleKit={styleKit}
                        />
                    </>
                );
            case 'about':
                return (
                    <>
                        <HeaderBlock content={homeData?.header} styleKit={styleKit} onNavigate={handleNavigate} />
                        <AboutBlock about={generatedContent.pages?.about} styleKit={styleKit} />
                        <FooterBlock content={homeData?.footer} styleKit={styleKit} onNavigate={handleNavigate} />
                    </>
                );
            case 'inventory':
                return (
                    <>
                        <HeaderBlock content={homeData?.header} styleKit={styleKit} onNavigate={handleNavigate} />
                        <div className="py-8 px-6 bg-gray-50">
                            <div className="max-w-7xl mx-auto">
                                <AdvancedSearchBar 
                                    inventory={generatedContent.pages?.inventory} 
                                    styleKit={styleKit}
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                        <InventoryBlock 
                            inventory={generatedContent.pages?.inventory} 
                            styleKit={styleKit} 
                            onApplyNow={openFinancingModal}
                            initialFilters={searchFilters}
                        />
                        <FooterBlock content={homeData?.footer} styleKit={styleKit} onNavigate={handleNavigate} />
                        <FinancingApplicationModal 
                            isOpen={showFinancingModal} 
                            onClose={() => setShowFinancingModal(false)}
                            vehicle={selectedVehicle}
                            styleKit={styleKit}
                        />
                    </>
                );
            case 'financing':
                return (
                    <>
                        <HeaderBlock content={homeData?.header} styleKit={styleKit} onNavigate={handleNavigate} />
                        <FinancingBlock financing={generatedContent.pages?.financing} styleKit={styleKit} onApplyNow={() => openFinancingModal()} />
                        <FooterBlock content={homeData?.footer} styleKit={styleKit} onNavigate={handleNavigate} />
                        <FinancingApplicationModal 
                            isOpen={showFinancingModal} 
                            onClose={() => setShowFinancingModal(false)}
                            vehicle={selectedVehicle}
                            styleKit={styleKit}
                        />
                    </>
                );
            case 'contact':
                return (
                    <>
                        <HeaderBlock content={homeData?.header} styleKit={styleKit} onNavigate={handleNavigate} />
                        <ContactBlock contact={generatedContent.pages?.contact} styleKit={styleKit} />
                        <FooterBlock content={homeData?.footer} styleKit={styleKit} onNavigate={handleNavigate} />
                    </>
                );
            default:
                return null;
        }
    };

    if (isGenerating) {
        return (
            <div className="flex h-screen bg-gray-50 items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">Generating Website...</h2>
                    <p className="text-gray-500 mt-2">Creating your complete dealership site with AI...</p>
                </div>
            </div>
        );
    }

    if (!generatedContent) {
        return null;
    }

    const globalFontStyle = generatedContent.meta?.fonts ? {
        fontFamily: generatedContent.meta.fonts.body
    } : {};

    const quickActions = [
        { icon: Wand2, label: 'Formal Tone', action: 'formal', color: 'text-purple-600' },
        { icon: Sparkles, label: 'Casual Tone', action: 'casual', color: 'text-blue-600' },
        { icon: RefreshCw, label: 'Persuasive', action: 'persuasive', color: 'text-orange-600' },
        { icon: FileText, label: 'Summarize', action: 'summarize', color: 'text-green-600' },
        { icon: Maximize2, label: 'Expand', action: 'expand', color: 'text-indigo-600' },
        { icon: CheckCircle2, label: 'Grammar', action: 'grammar', color: 'text-teal-600' }
    ];

    return (
        <div className="flex h-screen bg-gray-50" style={globalFontStyle}>
            {/* Left Sidebar */}
            <div 
                className={`bg-white border-r flex flex-col transition-all duration-300 ${
                    sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
                }`}
            >
                <div className="p-4 border-b">
                    <button onClick={() => navigate(createPageUrl('Landing'))} className="flex items-center gap-2 text-sm hover:text-blue-600">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-sm mb-4 text-gray-600">PAGES</h3>
                    <div className="space-y-2">
                        {['home', 'about', 'inventory', 'financing', 'contact'].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                    currentPage === page 
                                        ? 'bg-blue-600 text-white font-semibold' 
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <span className="capitalize">{page}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {generatedContent.meta && (
                    <div className="p-4 border-t mt-auto">
                        <h3 className="font-semibold text-xs mb-3 text-gray-600">STYLE KIT</h3>
                        <div className="space-y-2 text-xs">
                            {generatedContent.template_style && (
                                <div>
                                    <p className="text-gray-500 mb-1">Template</p>
                                    <p className="font-medium">{generatedContent.template_style}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-gray-500 mb-1">Theme</p>
                                <p className="font-medium">{generatedContent.meta.theme?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Fonts</p>
                                <p className="font-medium">{generatedContent.meta.fonts?.heading}</p>
                                <p className="text-gray-600">{generatedContent.meta.fonts?.body}</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <div className="w-8 h-8 rounded" style={{ backgroundColor: generatedContent.meta.theme?.primary }}></div>
                                <div className="w-8 h-8 rounded" style={{ backgroundColor: generatedContent.meta.theme?.accent }}></div>
                                <div className="w-8 h-8 rounded border" style={{ backgroundColor: generatedContent.meta.theme?.soft }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Center Preview */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="flex-shrink-0"
                            >
                                {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
                            </Button>
                            <div>
                                <h3 className="font-semibold text-lg">{generatedContent.website_name}</h3>
                                <p className="text-sm text-gray-500">{generatedContent.tagline}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                                <button 
                                    onClick={() => setViewMode('desktop')} 
                                    className={`p-2 rounded transition-all ${viewMode === 'desktop' ? 'bg-white shadow' : ''}`}
                                >
                                    <Laptop className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setViewMode('mobile')} 
                                    className={`p-2 rounded transition-all ${viewMode === 'mobile' ? 'bg-white shadow' : ''}`}
                                >
                                    <Smartphone className="w-4 h-4" />
                                </button>
                            </div>
                            <Button size="sm" variant="outline" onClick={handleSaveWebsite} disabled={isSaving || savedId}>
                                <Save className="w-4 h-4 mr-2" />
                                {savedId ? 'Saved' : 'Save'}
                            </Button>
                            <Button size="sm" onClick={() => navigate(createPageUrl('BookDemo'))}>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Deploy
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto bg-gray-100">
                    <div 
                        className="bg-white mx-auto shadow-2xl"
                        style={{ 
                            width: viewMode === 'mobile' ? '375px' : '100%',
                            maxWidth: '100%',
                            minHeight: '100%'
                        }}
                    >
                        {renderPageContent()}
                    </div>
                </div>
            </div>

            {/* Right Sidebar - AI Chat */}
            <div className="w-96 bg-white border-l flex flex-col">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">AI Assistant</h3>
                            <p className="text-xs text-gray-500">Content editing & suggestions</p>
                        </div>
                    </div>
                </div>

                {generatedContent && (
                    <div className="p-4 border-b bg-gray-50">
                        <p className="text-xs font-semibold text-gray-600 mb-3">QUICK ACTIONS</p>
                        <div className="grid grid-cols-3 gap-2">
                            {quickActions.map((qa) => (
                                <button
                                    key={qa.action}
                                    onClick={() => handleQuickAction(qa.action)}
                                    disabled={isChatLoading}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white transition-all disabled:opacity-50 group"
                                >
                                    <qa.icon className={`w-5 h-5 ${qa.color} group-hover:scale-110 transition-transform`} />
                                    <span className="text-xs text-gray-600">{qa.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                                message.role === 'user' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-900'
                            }`}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isChatLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                <form onSubmit={handleChatSubmit} className="p-4 border-t">
                    <div className="flex gap-2">
                        <Input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1"
                            disabled={isChatLoading}
                        />
                        <Button type="submit" size="icon" disabled={!chatInput.trim() || isChatLoading}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}