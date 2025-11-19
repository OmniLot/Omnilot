
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/context/AuthContext';
import { logout, updateUser, getCurrentUser } from '@/api/auth';
// import { useQuery } from '@tanstack/react-query'; // Temporarily disabled - GeneratedWebsite feature
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Plus, ArrowRight, Clock, Loader2, LogOut, Zap, Globe, Settings, HelpCircle, HeadphonesIcon, Coins, ChevronDown, Building2, CreditCard, User as UserIcon, X, Save, CheckCircle2, TrendingUp, Image, Check, Download, Copy, Mail, Send, Users, Package, Activity, ShoppingCart } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user: authUser, loading: authLoading, logout: logoutUser, updateUser: updateAuthUser } = useAuth();
    const [user, setUser] = useState(null);
    const [dealershipGoal, setDealershipGoal] = useState('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [showSettingsPanel, setShowSettingsPanel] = useState(false);
    const [showTokensPanel, setShowTokensPanel] = useState(false); // New state for tokens panel
    const [activeSettingsSection, setActiveSettingsSection] = useState('workspace');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [currentPlan] = useState('pro');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteAccessLevel, setInviteAccessLevel] = useState('user');
    const [copySuccess, setCopySuccess] = useState(false);

    const [workspaceData, setWorkspaceData] = useState({
        workspace_name: 'Personal Workspace',
        workspace_description: ''
    });
    
    const [accountData, setAccountData] = useState({
        full_name: '',
        email: '',
        phone: '',
        profile_image: null,
        notification_sound: 'on_every_prompt'
    });

    const usageData = {
        plan: 'Elite Plan',
        monthlyMessages: { used: 214, total: 1200, percentage: 18 },
        integrationCredits: { used: 75, total: 50000, percentage: 0.15 },
        dailyUsage: [
            { day: 'Mon', messages: 28 },
            { day: 'Tue', messages: 35 },
            { day: 'Wed', messages: 42 },
            { day: 'Thu', messages: 38 },
            { day: 'Fri', messages: 31 },
            { day: 'Sat', messages: 22 },
            { day: 'Sun', messages: 18 }
        ]
    };

    // Tokens data
    const tokensData = {
        currentBalance: 7200,
        monthlyAllocation: 7200,
        usedThisMonth: 3485,
        expiryDate: 'Dec 4, 2025',
        recentTransactions: [
            { id: 1, date: 'Nov 13, 2025', type: 'Usage', description: 'Website Generation - Luxury Dealership', amount: -150, balance: 7200 },
            { id: 2, date: 'Nov 12, 2025', type: 'Usage', description: 'AI Content Creation', amount: -75, balance: 7350 },
            { id: 3, date: 'Nov 11, 2025', type: 'Usage', description: 'Image Generation (5 images)', amount: -50, balance: 7425 },
            { id: 4, date: 'Nov 10, 2025', type: 'Usage', description: 'Chatbot Interactions', amount: -120, balance: 7475 },
            { id: 5, date: 'Nov 4, 2025', type: 'Credit', description: 'Monthly Plan Renewal', amount: 7200, balance: 7595 }
        ],
        usageBreakdown: [
            { category: 'Website Generation', tokens: 1200, percentage: 34 },
            { category: 'AI Content', tokens: 850, percentage: 24 },
            { category: 'Image Generation', tokens: 600, percentage: 17 },
            { category: 'Chatbot', tokens: 535, percentage: 15 },
            { category: 'Other', tokens: 300, percentage: 10 }
        ]
    };

    const tokenPackages = [
        {
            id: 'small',
            name: 'Starter Pack',
            tokens: 1000,
            price: 50,
            savings: null,
            features: ['1,000 tokens', 'Never expires', 'All features included']
        },
        {
            id: 'medium',
            name: 'Pro Pack',
            tokens: 3000,
            price: 135,
            savings: '10% savings',
            popular: true,
            features: ['3,000 tokens', 'Never expires', 'All features included', 'Priority support']
        },
        {
            id: 'large',
            name: 'Enterprise Pack',
            tokens: 10000,
            price: 400,
            savings: '20% savings',
            features: ['10,000 tokens', 'Never expires', 'All features included', 'Priority support', 'Dedicated account manager']
        }
    ];

    const pricingPlans = [
        {
            id: 'starter',
            name: 'Starter',
            price: 500,
            credits: '1,400 credits',
            features: [
                '1 User',
                '1 AI Bot (Lead Handling)',
                '20 Social Templates',
                '1 Landing Page',
                'Inventory Listing & Brand Kit',
                'Basic Analytics',
                'Standard Support'
            ]
        },
        {
            id: 'growth',
            name: 'Growth',
            price: 900,
            credits: '3,600 credits',
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
            id: 'pro',
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

    const billingHistory = [
        { date: 'Nov 4, 2025', amount: '$1,200.00', status: 'Paid', plan: 'Pro Plan - Monthly' },
        { date: 'Oct 4, 2025', amount: '$1,200.00', status: 'Paid', plan: 'Pro Plan - Monthly' },
        { date: 'Sep 15, 2025', amount: '$900.00', status: 'Paid', plan: 'Growth Plan - Monthly' },
        { date: 'Sep 9, 2025', amount: '$900.00', status: 'Paid', plan: 'Growth Plan - Monthly' },
        { date: 'Sep 4, 2025', amount: '$500.00', status: 'Paid', plan: 'Starter Plan - Monthly' }
    ];

    useEffect(() => {
        const checkAuth = async () => {
            if (authLoading) return;
            
            if (!authUser) {
                navigate(createPageUrl('Auth'));
                return;
            }
            
            try {
                // Get fresh user data
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setAccountData(prev => ({
                    ...prev,
                    full_name: currentUser.full_name || '',
                    email: currentUser.email || '',
                    phone: currentUser.phone || ''
                }));
            } catch (error) {
                console.error('Error fetching user:', error);
                // If error, use auth context user
                if (authUser) {
                    setUser(authUser);
                    setAccountData(prev => ({
                        ...prev,
                        full_name: authUser.full_name || '',
                        email: authUser.email || '',
                        phone: authUser.phone || ''
                    }));
                } else {
                    navigate(createPageUrl('Auth'));
                }
            } finally {
                setIsLoadingUser(false);
            }
        };
        checkAuth();
    }, [authUser, authLoading, navigate]);

    // Temporarily disabled - GeneratedWebsite feature will be rebuilt later
    // const { data: websites, isLoading } = useQuery({
    //     queryKey: ['generatedWebsites', user?.id],
    //     queryFn: async () => {
    //         const allWebsites = await base44.entities.GeneratedWebsite.list('-created_date');
    //         return allWebsites.filter(site => site.created_by === user?.email);
    //     },
    //     enabled: !!user,
    //     initialData: []
    // });
    const websites = []; // Placeholder - will be replaced with MongoDB data later
    const isLoading = false;

    const handleBuildWebsite = () => {
        if (dealershipGoal.trim()) {
            navigate(`${createPageUrl('BuildWebsite')}?goal=${encodeURIComponent(dealershipGoal)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && dealershipGoal.trim()) {
            handleBuildWebsite();
        }
    };

    const handleLogout = () => {
        logout();
        logoutUser();
        navigate(createPageUrl('Landing'));
    };

    const handleSettingsClick = (section) => {
        setActiveSettingsSection(section);
        setShowSettingsPanel(true);
    };

    const handleSaveAccount = async () => {
        setIsSaving(true);
        try {
            const updatedUser = await updateUser(
                accountData.full_name,
                accountData.phone
            );
            updateAuthUser(updatedUser);
            setUser(updatedUser);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving account:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveWorkspace = async () => {
        setIsSaving(true);
        try {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving workspace:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAccountData({...accountData, profile_image: file});
        }
    };

    const handleCopyShareUrl = () => {
        navigator.clipboard.writeText('https://omni.lot/workspace');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleSendInvitation = () => {
        console.log('Sending invitation to:', inviteEmail, 'with access level:', inviteAccessLevel);
        setShowInviteModal(false);
        setInviteEmail('');
        setInviteAccessLevel('user');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    if (isLoadingUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
        );
    }

    const settingsMenuItems = [
        { id: 'workspace', label: 'Workspace', icon: Building2 },
        { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
        { id: 'account', label: 'Account', icon: UserIcon }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to={createPageUrl('Dashboard')} className="flex items-center">
                            <span className="text-2xl font-light text-white tracking-tight">
                                <span className="text-blue-400">Omni</span>.Lot
                            </span>
                        </Link>
                        
                        {/* Navigation Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2">
                                <Globe className="w-4 h-4" />
                                <span className="text-sm">Websites</span>
                            </button>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2">
                                        <Settings className="w-4 h-4" />
                                        <span className="text-sm">Settings</span>
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                                    <DropdownMenuItem 
                                        onClick={() => handleSettingsClick('workspace')}
                                        className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                                    >
                                        <Building2 className="w-4 h-4 mr-3" />
                                        <div>
                                            <div className="font-medium">Workspace</div>
                                            <div className="text-xs text-gray-400">Manage workspace settings</div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => handleSettingsClick('billing')}
                                        className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                                    >
                                        <CreditCard className="w-4 h-4 mr-3" />
                                        <div>
                                            <div className="font-medium">Plan & Billing</div>
                                            <div className="text-xs text-gray-400">Manage subscription</div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => handleSettingsClick('account')}
                                        className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                                    >
                                        <UserIcon className="w-4 h-4 mr-3" />
                                        <div>
                                            <div className="font-medium">Account</div>
                                            <div className="text-xs text-gray-400">Personal settings</div>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <button 
                                onClick={() => navigate(createPageUrl('Support'))}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1e293b] hover:bg-[#2d3b52] text-white transition-colors"
                            >
                                <HelpCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Help</span>
                            </button>
                            
                            <Link to={createPageUrl('Support')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2">
                                <HeadphonesIcon className="w-4 h-4" />
                                <span className="text-sm">Support</span>
                            </Link>
                            <button 
                                onClick={() => setShowTokensPanel(true)} // Updated onClick handler
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2"
                            >
                                <Coins className="w-4 h-4" />
                                <span className="text-sm">Tokens</span>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <span className="text-gray-300 text-sm hidden sm:block">
                                Welcome, {user?.full_name || user?.email}
                            </span>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleLogout}
                                className="border-gray-700 text-gray-300 hover:text-white hover:border-red-500"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Share Your Workspace</h3>
                                    <p className="text-sm text-gray-600 mt-1">Give others access to OmniLot</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Public Access */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Globe className="w-5 h-5 text-gray-600" />
                                    <h4 className="font-semibold text-gray-900">Public Access</h4>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Share URL</span>
                                        <button
                                            onClick={handleCopyShareUrl}
                                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copySuccess ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-md p-3 border border-gray-200">
                                        <code className="text-sm text-gray-600">https://omni.lot/workspace</code>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Anyone with this link can access your workspace
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-sm text-gray-500 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* Send Invitation */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Mail className="w-5 h-5 text-gray-600" />
                                    <h4 className="font-semibold text-gray-900">Send Invitation</h4>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email address
                                        </label>
                                        <Input
                                            type="email"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            placeholder="colleague@company.com"
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Access level
                                        </label>
                                        <Select value={inviteAccessLevel} onValueChange={setInviteAccessLevel}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">
                                                    <div>
                                                        <div className="font-medium">User</div>
                                                        <div className="text-xs text-gray-500">Can use the app</div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="admin">
                                                    <div>
                                                        <div className="font-medium">Admin</div>
                                                        <div className="text-xs text-gray-500">Full access and control</div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <Button
                                variant="outline"
                                onClick={() => setShowInviteModal(false)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSendInvitation}
                                disabled={!inviteEmail}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send Invitation
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tokens Panel Overlay */}
            {showTokensPanel && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                    <div className="absolute inset-0 overflow-auto">
                        <div className="min-h-screen py-20 px-4">
                            <div className="max-w-7xl mx-auto">
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
                                    {/* Tokens Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Tokens Dashboard</h2>
                                            <p className="text-gray-400 text-sm mt-1">Manage and track your token usage</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowTokensPanel(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <X className="w-6 h-6" />
                                        </Button>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Token Balance Cards */}
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                                            <Coins className="w-6 h-6 text-white" />
                                                        </div>
                                                        <span className="text-blue-200 text-sm">Current Balance</span>
                                                    </div>
                                                    <div className="text-4xl font-bold text-white mb-2">
                                                        {tokensData.currentBalance.toLocaleString()}
                                                    </div>
                                                    <p className="text-blue-200 text-sm">tokens available</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-gray-800/50 border-gray-700">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                            <Activity className="w-6 h-6 text-orange-400" />
                                                        </div>
                                                        <span className="text-gray-400 text-sm">This Month</span>
                                                    </div>
                                                    <div className="text-4xl font-bold text-white mb-2">
                                                        {tokensData.usedThisMonth.toLocaleString()}
                                                    </div>
                                                    <p className="text-gray-400 text-sm">tokens used</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-gray-800/50 border-gray-700">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                                            <Package className="w-6 h-6 text-green-400" />
                                                        </div>
                                                        <span className="text-gray-400 text-sm">Plan Allocation</span>
                                                    </div>
                                                    <div className="text-4xl font-bold text-white mb-2">
                                                        {tokensData.monthlyAllocation.toLocaleString()}
                                                    </div>
                                                    <p className="text-gray-400 text-sm">renews {tokensData.expiryDate}</p>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Usage Breakdown */}
                                        <Card className="bg-gray-800/50 border-gray-700">
                                            <CardHeader>
                                                <CardTitle className="text-white text-lg">Token Usage Breakdown</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {tokensData.usageBreakdown.map((item, idx) => (
                                                        <div key={idx}>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-gray-300 font-medium">{item.category}</span>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-gray-400 text-sm">{item.tokens.toLocaleString()} tokens</span>
                                                                    <span className="text-white font-semibold w-12 text-right">{item.percentage}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                                <div 
                                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${item.percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Purchase Tokens Section */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                <ShoppingCart className="w-5 h-5" />
                                                Purchase Additional Tokens
                                            </h3>
                                            <div className="grid md:grid-cols-3 gap-6">
                                                {tokenPackages.map((pkg) => (
                                                    <div
                                                        key={pkg.id}
                                                        className={`relative rounded-2xl border-2 transition-all ${
                                                            pkg.popular
                                                                ? 'border-blue-500 bg-gradient-to-b from-blue-900/30 to-gray-800/50'
                                                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                                        }`}
                                                    >
                                                        {pkg.popular && (
                                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                                    Most Popular
                                                                </span>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="p-6">
                                                            <div className="text-center mb-6">
                                                                <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
                                                                <div className="mb-2">
                                                                    <span className="text-4xl font-bold text-white">${pkg.price}</span>
                                                                </div>
                                                                <p className="text-blue-400 text-lg font-medium mb-1">
                                                                    {pkg.tokens.toLocaleString()} tokens
                                                                </p>
                                                                {pkg.savings && (
                                                                    <p className="text-green-400 text-sm font-medium">{pkg.savings}</p>
                                                                )}
                                                            </div>

                                                            <ul className="space-y-2 mb-6">
                                                                {pkg.features.map((feature, idx) => (
                                                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                                        <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                                                        <span>{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            <Button 
                                                                className={`w-full h-12 ${
                                                                    pkg.popular 
                                                                        ? 'bg-blue-600 hover:bg-blue-700' 
                                                                        : 'bg-gray-700 hover:bg-gray-600'
                                                                } text-white font-medium`}
                                                            >
                                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                                Purchase Now
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recent Transactions - IMPROVED READABILITY */}
                                        <Card className="bg-gray-800/50 border-gray-700">
                                            <CardHeader>
                                                <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    {tokensData.recentTransactions.map((transaction) => (
                                                        <div
                                                            key={transaction.id}
                                                            className="flex items-center justify-between p-5 bg-gray-800/80 rounded-lg border border-gray-700 hover:bg-gray-700/80 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-4 flex-1">
                                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                                    transaction.type === 'Credit' 
                                                                        ? 'bg-green-500/20 border border-green-500/30' 
                                                                        : 'bg-red-500/20 border border-red-500/30'
                                                                }`}>
                                                                    {transaction.type === 'Credit' ? (
                                                                        <Plus className="w-6 h-6 text-green-400" />
                                                                    ) : (
                                                                        <Zap className="w-6 h-6 text-red-400" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="text-white font-semibold text-base mb-1">{transaction.description}</div>
                                                                    <div className="text-gray-400 text-sm">{transaction.date}</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className={`text-xl font-bold mb-1 ${
                                                                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                                                                    }`}>
                                                                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                                                                    </div>
                                                                    <div className="text-gray-500 text-sm">
                                                                        Balance: <span className="text-gray-400 font-medium">{transaction.balance.toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Token Usage Guide - IMPROVED READABILITY */}
                                        <Card className="bg-blue-900/30 border-2 border-blue-500/50 backdrop-blur-sm">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-blue-500/30 border-2 border-blue-400/50 flex items-center justify-center flex-shrink-0">
                                                        <Zap className="w-7 h-7 text-blue-300" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold text-lg mb-3">How Tokens Work</h4>
                                                        <p className="text-gray-200 text-base leading-relaxed mb-4">
                                                            Tokens are used across all AI-powered features including website generation, content creation, 
                                                            image generation, and chatbot interactions. Your monthly plan includes <span className="font-semibold text-white">{tokensData.monthlyAllocation.toLocaleString()} tokens</span> that reset each billing cycle.
                                                        </p>
                                                        <p className="text-gray-200 text-base leading-relaxed">
                                                            Need more tokens? Purchase additional token packages that <span className="font-semibold text-white">never expire</span> and can be used anytime.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Panel Overlay */}
            {showSettingsPanel && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                    <div className="absolute inset-0 overflow-auto">
                        <div className="min-h-screen py-20 px-4">
                            <div className="max-w-7xl mx-auto">
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
                                    {/* Settings Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Settings</h2>
                                            <p className="text-gray-400 text-sm mt-1">Manage your workspace, billing, and account settings</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowSettingsPanel(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <X className="w-6 h-6" />
                                        </Button>
                                    </div>

                                    <div className="grid lg:grid-cols-4 gap-0">
                                        {/* Settings Sidebar */}
                                        <div className="lg:col-span-1 border-r border-gray-700 p-6">
                                            <nav className="space-y-2">
                                                {settingsMenuItems.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => setActiveSettingsSection(item.id)}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                                            activeSettingsSection === item.id
                                                                ? 'bg-blue-600 text-white'
                                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                        }`}
                                                    >
                                                        <item.icon className="w-5 h-5" />
                                                        <span className="font-medium">{item.label}</span>
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* Settings Content */}
                                        <div className="lg:col-span-3 p-6 max-h-[calc(100vh-200px)] overflow-auto">
                                            {/* Workspace Section */}
                                            {activeSettingsSection === 'workspace' && (
                                                <div className="space-y-6">
                                                    <Card className="bg-gray-800/50 border-gray-700">
                                                        <CardHeader>
                                                            <CardTitle className="text-white text-lg">Workspace Info</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">Workspace name</label>
                                                                <Input
                                                                    value={workspaceData.workspace_name}
                                                                    onChange={(e) => setWorkspaceData({...workspaceData, workspace_name: e.target.value})}
                                                                    className="bg-gray-900/50 border-gray-600 text-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-300 mb-2">Workspace Description</label>
                                                                <Textarea
                                                                    value={workspaceData.workspace_description}
                                                                    onChange={(e) => setWorkspaceData({...workspaceData, workspace_description: e.target.value})}
                                                                    placeholder="Add description"
                                                                    rows={4}
                                                                    className="bg-gray-900/50 border-gray-600 text-white resize-none"
                                                                />
                                                            </div>
                                                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                                                <Button
                                                                    onClick={() => setShowInviteModal(true)}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                                >
                                                                    <Users className="w-4 h-4 mr-2" />
                                                                    Invite Users
                                                                </Button>
                                                                <div className="flex items-center gap-4">
                                                                    {saveSuccess && (
                                                                        <div className="flex items-center gap-2 text-green-400">
                                                                            <CheckCircle2 className="w-4 h-4" />
                                                                            <span className="text-sm">Saved successfully</span>
                                                                        </div>
                                                                    )}
                                                                    <Button onClick={handleSaveWorkspace} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                                                                        {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="bg-gray-800/50 border-gray-700">
                                                        <CardHeader>
                                                            <CardTitle className="text-white text-lg">Credits Usages</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center">
                                                                        <Zap className="w-5 h-5 text-blue-400" />
                                                                    </div>
                                                                    <span className="text-white font-medium">You&apos;re currently on the {usageData.plan}</span>
                                                                </div>
                                                                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
                                                                    Upgrade Plan
                                                                </Button>
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-gray-300 font-medium">Monthly Messages</span>
                                                                    <span className="text-white font-semibold">{usageData.monthlyMessages.used}/{usageData.monthlyMessages.total}</span>
                                                                </div>
                                                                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                                                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${usageData.monthlyMessages.percentage}%` }}></div>
                                                                </div>
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-400">{usageData.monthlyMessages.percentage}% used</span>
                                                                    <span className="text-gray-400">{usageData.monthlyMessages.total - usageData.monthlyMessages.used} messages remaining</span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-gray-300 font-medium">Integration Credits</span>
                                                                    <span className="text-white font-semibold">{usageData.integrationCredits.used}/{usageData.integrationCredits.total}</span>
                                                                </div>
                                                                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                                                                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${usageData.integrationCredits.percentage}%` }}></div>
                                                                </div>
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-400">{usageData.integrationCredits.percentage.toFixed(1)}% used</span>
                                                                    <span className="text-gray-400">{usageData.integrationCredits.total - usageData.integrationCredits.used} credits remaining</span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                                                    <span className="text-gray-300 font-medium">Daily Usage (Messages)</span>
                                                                </div>
                                                                <div className="flex items-end justify-between gap-2 h-32">
                                                                    {usageData.dailyUsage.map((day, idx) => {
                                                                        const maxMessages = Math.max(...usageData.dailyUsage.map(d => d.messages));
                                                                        const height = (day.messages / maxMessages) * 100;
                                                                        return (
                                                                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                                                                <div className="w-full flex flex-col items-center">
                                                                                    <span className="text-xs text-gray-400 mb-1">{day.messages}</span>
                                                                                    <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: `${height}%` }}></div>
                                                                                </div>
                                                                                <span className="text-xs text-gray-400">{day.day}</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}

                                            {/* Billing Section */}
                                            {activeSettingsSection === 'billing' && (
                                                <div className="space-y-8">
                                                    {/* Current Plan Banner */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-white mb-6">Plan & Billing</h3>
                                                        
                                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <p className="text-gray-300 text-lg">
                                                                    You&apos;re currently using the <span className="font-semibold text-white">Pro Plan</span>
                                                                </p>
                                                                <div className="flex gap-3">
                                                                    <Button 
                                                                        className="bg-white hover:bg-gray-100 text-gray-900 font-medium"
                                                                    >
                                                                        Manage Plan
                                                                    </Button>
                                                                    <Button 
                                                                        className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
                                                                    >
                                                                        Upgrade Plan
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-400 text-sm">
                                                                Your subscription renews on December 4, 2025
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Available Plans */}
                                                    <div>
                                                        <h4 className="text-xl font-semibold text-white mb-4">Available Plans</h4>
                                                        <div className="grid md:grid-cols-3 gap-6">
                                                            {pricingPlans.map((plan) => (
                                                                <div
                                                                    key={plan.id}
                                                                    className={`relative rounded-2xl border-2 transition-all ${
                                                                        currentPlan === plan.id
                                                                            ? 'border-blue-500 bg-gradient-to-b from-blue-900/30 to-gray-800/50'
                                                                            : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                                                    }`}
                                                                >
                                                                    {plan.popular && (
                                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                                            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                                                Most Popular
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    <div className="p-6">
                                                                        <div className="text-center mb-6">
                                                                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                                                            <div className="mb-2">
                                                                                <span className="text-4xl font-bold text-white">${plan.price}</span>
                                                                                <span className="text-gray-400">/mo</span>
                                                                            </div>
                                                                            <p className="text-blue-400 text-sm font-medium">{plan.credits}</p>
                                                                        </div>

                                                                        <ul className="space-y-3 mb-6">
                                                                            {plan.features.map((feature, idx) => (
                                                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                                                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                                                                        currentPlan === plan.id ? 'text-blue-400' : 'text-gray-500'
                                                                                    }`} />
                                                                                    <span>{feature}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>

                                                                        {currentPlan === plan.id ? (
                                                                            <Button 
                                                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                                                                                disabled
                                                                            >
                                                                                Current Plan
                                                                            </Button>
                                                                        ) : (
                                                                            <Button 
                                                                                className="w-full bg-gray-900 hover:bg-black text-white h-12"
                                                                            >
                                                                                {currentPlan === 'pro' && plan.id !== 'pro' ? 'Downgrade' : 'Upgrade'}
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Billing History */}
                                                    <div>
                                                        <h4 className="text-xl font-semibold text-white mb-4">Billing History</h4>
                                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                                                            <div className="divide-y divide-gray-700">
                                                                {billingHistory.map((invoice, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                                                                    >
                                                                        <div className="flex items-center gap-8 flex-1">
                                                                            <span className="text-gray-300 w-28">{invoice.date}</span>
                                                                            <span className="text-white font-medium w-24">{invoice.amount}</span>
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                                                                {invoice.status}
                                                                            </span>
                                                                            <span className="text-gray-400 flex-1">{invoice.plan}</span>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="text-gray-400 hover:text-white"
                                                                        >
                                                                            <Download className="w-4 h-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Account Section */}
                                            {activeSettingsSection === 'account' && (
                                                <Card className="bg-gray-800/50 border-gray-700">
                                                    <CardHeader>
                                                        <CardTitle className="text-white text-lg">Account</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-6">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                                            <Input value={accountData.email} disabled className="bg-gray-900/50 border-gray-600 text-gray-400 cursor-not-allowed" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                                            <Input value={accountData.full_name} onChange={(e) => setAccountData({...accountData, full_name: e.target.value})} className="bg-gray-900/50 border-gray-600 text-white" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                                            <Input value={accountData.phone} onChange={(e) => setAccountData({...accountData, phone: e.target.value})} placeholder="Enter your phone number" className="bg-gray-900/50 border-gray-600 text-white" />
                                                            <p className="text-xs text-gray-500 mt-2">By entering your phone number, you agree to receive SMS notifications from us.</p>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                                                            <div className="flex items-center gap-4">
                                                                <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" id="profile-image-upload" />
                                                                <label htmlFor="profile-image-upload" className="cursor-pointer bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                                                                    <Image className="w-4 h-4" />Choose File
                                                                </label>
                                                                {accountData.profile_image && <span className="text-sm text-gray-400">{accountData.profile_image.name}</span>}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Notification Sound Preference</label>
                                                            <Select value={accountData.notification_sound} onValueChange={(value) => setAccountData({...accountData, notification_sound: value})}>
                                                                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white"><SelectValue /></SelectTrigger>
                                                                <SelectContent className="bg-gray-800 border-gray-700">
                                                                    <SelectItem value="on_every_prompt" className="text-white hover:bg-gray-700">On every prompt</SelectItem>
                                                                    <SelectItem value="only_errors" className="text-white hover:bg-gray-700">Only errors</SelectItem>
                                                                    <SelectItem value="silent" className="text-white hover:bg-gray-700">Silent</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <p className="text-xs text-gray-500 mt-2">Choose when to play notification sounds.</p>
                                                        </div>
                                                        <div className="flex justify-end pt-4 border-t border-gray-700">
                                                            {saveSuccess && <div className="flex items-center gap-2 text-green-400 mr-4"><CheckCircle2 className="w-4 h-4" /><span className="text-sm">Saved successfully</span></div>}
                                                            <Button onClick={handleSaveAccount} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                                                                {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
                        What should your <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-medium">dealership</span> build today?
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Create AI-powered websites, marketing campaigns, and automations for your dealership
                    </p>

                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="flex gap-3">
                            <Input
                                type="text"
                                value={dealershipGoal}
                                onChange={(e) => setDealershipGoal(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe what you want to build..."
                                className="h-14 px-6 text-lg bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 rounded-xl backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                            />
                            <Button
                                onClick={handleBuildWebsite}
                                disabled={!dealershipGoal.trim()}
                                className="h-14 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Build
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button 
                            variant="outline" 
                            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:border-blue-400 backdrop-blur-sm"
                            onClick={() => setDealershipGoal('Build a modern car dealership website with inventory')}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Website
                        </Button>
                        <Button 
                            variant="outline" 
                            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:border-blue-400 backdrop-blur-sm"
                            onClick={() => setDealershipGoal('Create an RV dealership with financing options')}
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            RV Dealership
                        </Button>
                        <Button 
                            variant="outline" 
                            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:border-blue-400 backdrop-blur-sm"
                            onClick={() => setDealershipGoal('Build a luxury car dealership website')}
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Luxury Cars
                        </Button>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-white">Your Websites</h2>
                        {websites.length > 0 && (
                            <Button 
                                variant="ghost" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => navigate(createPageUrl('BuildWebsite'))}
                            >
                                View All
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                        </div>
                    ) : websites.length === 0 ? (
                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No websites yet</h3>
                                <p className="text-gray-400 mb-6">Start building your first AI-powered dealership website</p>
                                <Button 
                                    onClick={() => navigate(createPageUrl('BuildWebsite'))}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Website
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {websites.map((website) => (
                                <Card 
                                    key={website.id}
                                    className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 cursor-pointer group"
                                    onClick={() => navigate(`${createPageUrl('BuildWebsite')}?id=${website.id}`)}
                                >
                                    <CardContent className="p-6">
                                        <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center border border-gray-700">
                                            <Sparkles className="w-8 h-8 text-blue-400" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {website.website_name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {website.user_prompt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span>{formatDate(website.created_date)}</span>
                                            </div>
                                            <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                                                {website.status || 'draft'}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
