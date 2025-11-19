import { useEffect } from "react";
import Layout from "./Layout.jsx";

import Landing from "./Landing";

import Enterprise from "./Enterprise";

import Pricing from "./Pricing";

import Careers from "./Careers";

import Documentation from "./Documentation";

import Gallery from "./Gallery";

import Support from "./Support";

import ProjectStatus from "./ProjectStatus";

import About from "./About";

import BookDemo from "./BookDemo";

import GuideGettingStarted from "./GuideGettingStarted";

import GuideInventoryIntegration from "./GuideInventoryIntegration";

import GuideWebsiteBuilder from "./GuideWebsiteBuilder";

import GuideAIAutomations from "./GuideAIAutomations";

import GuideAnalyticsDashboard from "./GuideAnalyticsDashboard";

import GuideCustomerEngagement from "./GuideCustomerEngagement";

import Welcome from "./Welcome";

import EmailSupport from "./EmailSupport";

import PhoneSupport from "./PhoneSupport";

import BuildWebsite from "./BuildWebsite";

import Auth from "./Auth";

import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Landing: Landing,
    
    Enterprise: Enterprise,
    
    Pricing: Pricing,
    
    Careers: Careers,
    
    Documentation: Documentation,
    
    Gallery: Gallery,
    
    Support: Support,
    
    ProjectStatus: ProjectStatus,
    
    About: About,
    
    BookDemo: BookDemo,
    
    GuideGettingStarted: GuideGettingStarted,
    
    GuideInventoryIntegration: GuideInventoryIntegration,
    
    GuideWebsiteBuilder: GuideWebsiteBuilder,
    
    GuideAIAutomations: GuideAIAutomations,
    
    GuideAnalyticsDashboard: GuideAnalyticsDashboard,
    
    GuideCustomerEngagement: GuideCustomerEngagement,
    
    Welcome: Welcome,
    
    EmailSupport: EmailSupport,
    
    PhoneSupport: PhoneSupport,
    
    BuildWebsite: BuildWebsite,
    
    Auth: Auth,
    
    Dashboard: Dashboard,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Landing />} />
                
                
                <Route path="/Landing" element={<Landing />} />
                
                <Route path="/Enterprise" element={<Enterprise />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/Careers" element={<Careers />} />
                
                <Route path="/Documentation" element={<Documentation />} />
                
                <Route path="/Gallery" element={<Gallery />} />
                
                <Route path="/Support" element={<Support />} />
                
                <Route path="/ProjectStatus" element={<ProjectStatus />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/BookDemo" element={<BookDemo />} />
                
                <Route path="/GuideGettingStarted" element={<GuideGettingStarted />} />
                
                <Route path="/GuideInventoryIntegration" element={<GuideInventoryIntegration />} />
                
                <Route path="/GuideWebsiteBuilder" element={<GuideWebsiteBuilder />} />
                
                <Route path="/GuideAIAutomations" element={<GuideAIAutomations />} />
                
                <Route path="/GuideAnalyticsDashboard" element={<GuideAnalyticsDashboard />} />
                
                <Route path="/GuideCustomerEngagement" element={<GuideCustomerEngagement />} />
                
                <Route path="/Welcome" element={<Welcome />} />
                
                <Route path="/EmailSupport" element={<EmailSupport />} />
                
                <Route path="/PhoneSupport" element={<PhoneSupport />} />
                
                <Route path="/BuildWebsite" element={<BuildWebsite />} />
                
                <Route path="/Auth" element={<Auth />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
            </Routes>
        </Layout>
    );
}

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    }, [location.pathname]);

    return null;
}

export default function Pages() {
    return (
        <Router>
            <ScrollToTop />
            <PagesContent />
        </Router>
    );
}