import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { signup, login, isAuthenticated } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Mail, Lock, User, Phone, Sparkles, Shield, CheckCircle } from 'lucide-react';

export default function Auth() {
    const navigate = useNavigate();
    const { login: setAuthUser } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        phone: ''
    });

    // Check if user is already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            // User is already logged in, redirect to dashboard
            navigate(createPageUrl('Dashboard'));
        } else {
            setIsCheckingAuth(false);
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent submission if already loading
        if (isLoading) return;
        
        setIsLoading(true);
        setError('');

        try {
            if (mode === 'login') {
                const result = await login(formData.email, formData.password);
                setAuthUser(result.user);
                navigate(createPageUrl('Dashboard'));
            } else {
                // Signup
                if (!formData.full_name) {
                    setError('Full name is required for signup');
                    setIsLoading(false);
                    return;
                }
                const result = await signup(
                    formData.email,
                    formData.password,
                    formData.full_name,
                    formData.phone
                );
                setAuthUser(result.user);
                navigate(createPageUrl('Dashboard'));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'An error occurred. Please try again.';
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const features = [
        { icon: Sparkles, text: "AI-Powered Website Builder" },
        { icon: Shield, text: "Secure Authentication" },
        { icon: CheckCircle, text: "Instant Setup" }
    ];

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Back button */}
            <button 
                onClick={() => navigate(createPageUrl('Landing'))} 
                className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-blue-300 transition-colors z-10"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
            </button>

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left side - Features */}
                <div className="text-white space-y-8 hidden lg:block">
                    <div>
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Welcome to Omni.Lot
                        </h1>
                        <p className="text-xl text-gray-300">
                            Create stunning dealership websites with AI in minutes
                        </p>
                    </div>

                    <div className="space-y-4">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <feature.icon className="w-6 h-6 text-blue-300" />
                                </div>
                                <span className="text-lg">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20">
                        <p className="text-sm text-gray-300 mb-2">Trusted by 500+ dealerships</p>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-gray-900" />
                                ))}
                            </div>
                            <span className="text-yellow-400 font-semibold">★★★★★ 4.9/5</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Auth form */}
                <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0">
                    <CardContent className="p-8">
                        {/* Mode toggle */}
                        <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg">
                            <button
                                onClick={() => setMode('login')}
                                className={`flex-1 py-3 rounded-md font-semibold transition-all ${
                                    mode === 'login' 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex-1 py-3 rounded-md font-semibold transition-all ${
                                    mode === 'signup' 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <form 
                            onSubmit={handleSubmit} 
                            className="space-y-5"
                            noValidate
                        >
                            {mode === 'signup' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="pl-11 h-12"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="(555) 123-4567"
                                                className="pl-11 h-12"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        className="pl-11 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="pl-11 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                                    <p className="text-sm text-red-600 font-medium">{error}</p>
                                </div>
                            )}

                            {mode === 'login' && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // TODO: Implement forgot password functionality
                                            alert('Forgot password feature coming soon!');
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                                        <Sparkles className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-2 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-2 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                    </svg>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-2 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                </Button>
                            </div>
                        </form>

                        {mode === 'signup' && (
                            <p className="mt-6 text-sm text-gray-500 text-center">
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-blue-600 hover:underline font-semibold">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}