import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, User, Briefcase, Car, CheckCircle2, Shield } from 'lucide-react';

export default function FinancingApplicationModal({ isOpen, onClose, vehicle, styleKit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        
        // Employment Info
        employerName: '',
        jobTitle: '',
        employerPhone: '',
        monthlyIncome: '',
        yearsAtJob: '',
        monthsAtJob: '',
        
        // Vehicle Info
        vehicleKeyword: vehicle?.title || '',
        stockNumber: '',
        year: vehicle?.year || '',
        make: vehicle?.make || '',
        model: vehicle?.model || '',
        vehiclePrice: vehicle?.price || '',
        downPayment: '',
        exteriorColor: '',
        interiorColor: '',
        hasTrade: false,
        tradeYear: '',
        tradeMake: '',
        tradeModel: '',
        tradeMileage: '',
        tradeValue: ''
    });
    
    const theme = styleKit?.theme || {};
    const fonts = styleKit?.fonts || {};

    if (!isOpen) return null;

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would handle the form submission
        alert('Application submitted! We will contact you shortly.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>Financing Application</h2>
                                <p className="text-sm text-gray-300">Secure & Confidential</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center gap-2 transition-all ${s === step ? 'scale-110' : 'scale-100'}`}>
                                    <div 
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                                            s === step ? 'ring-4 ring-white/30' : ''
                                        }`}
                                        style={{ backgroundColor: s <= step ? theme.primary : '#4B5563' }}
                                    >
                                        {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                                    </div>
                                    <span className="text-sm font-semibold hidden sm:block">
                                        {s === 1 ? 'Personal' : s === 2 ? 'Employment' : 'Vehicle'}
                                    </span>
                                </div>
                                {s < 3 && <div className="flex-1 h-1 rounded-full bg-white/20" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8">
                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slideIn">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-6 h-6" style={{ color: theme.primary }} />
                                <h3 className="text-2xl font-bold" style={{ fontFamily: fonts.heading, color: theme.primary }}>
                                    Personal Information
                                </h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.lastName}
                                        onChange={(e) => updateField('lastName', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField('phone', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => updateField('dateOfBirth', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        SSN (Last 4) <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="text"
                                        maxLength="4"
                                        value={formData.ssn}
                                        onChange={(e) => updateField('ssn', e.target.value)}
                                        required
                                        className="h-12"
                                        placeholder="1234"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                    value={formData.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.city}
                                        onChange={(e) => updateField('city', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.state}
                                        onChange={(e) => updateField('state', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        ZIP Code <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.zipCode}
                                        onChange={(e) => updateField('zipCode', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Employment Information */}
                    {step === 2 && (
                        <div className="space-y-6 animate-slideIn">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="w-6 h-6" style={{ color: theme.primary }} />
                                <h3 className="text-2xl font-bold" style={{ fontFamily: fonts.heading, color: theme.primary }}>
                                    Employment Information
                                </h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Employer Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.employerName}
                                        onChange={(e) => updateField('employerName', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Title/Position <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        value={formData.jobTitle}
                                        onChange={(e) => updateField('jobTitle', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Employer Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="tel"
                                        value={formData.employerPhone}
                                        onChange={(e) => updateField('employerPhone', e.target.value)}
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Monthly Gross Income <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        type="number"
                                        value={formData.monthlyIncome}
                                        onChange={(e) => updateField('monthlyIncome', e.target.value)}
                                        required
                                        className="h-12"
                                        placeholder="$5,000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                    Years at Job <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select 
                                        value={formData.yearsAtJob}
                                        onChange={(e) => updateField('yearsAtJob', e.target.value)}
                                        required
                                        className="h-12 px-4 rounded-md border border-gray-300"
                                    >
                                        <option value="">Years</option>
                                        {[0,1,2,3,4,5,6,7,8,9,10].map(y => (
                                            <option key={y} value={y}>{y} years</option>
                                        ))}
                                    </select>
                                    <select 
                                        value={formData.monthsAtJob}
                                        onChange={(e) => updateField('monthsAtJob', e.target.value)}
                                        required
                                        className="h-12 px-4 rounded-md border border-gray-300"
                                    >
                                        <option value="">Months</option>
                                        {[0,1,2,3,4,5,6,7,8,9,10,11].map(m => (
                                            <option key={m} value={m}>{m} months</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Vehicle Information */}
                    {step === 3 && (
                        <div className="space-y-6 animate-slideIn">
                            <div className="flex items-center gap-3 mb-6">
                                <Car className="w-6 h-6" style={{ color: theme.primary }} />
                                <h3 className="text-2xl font-bold" style={{ fontFamily: fonts.heading, color: theme.primary }}>
                                    Interested Vehicle
                                </h3>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                    Vehicle Keyword
                                </label>
                                <Input 
                                    value={formData.vehicleKeyword}
                                    onChange={(e) => updateField('vehicleKeyword', e.target.value)}
                                    className="h-12"
                                    placeholder="Search by make, model, or keyword"
                                />
                            </div>

                            <div className="grid md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Stock Number
                                    </label>
                                    <Input 
                                        value={formData.stockNumber}
                                        onChange={(e) => updateField('stockNumber', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Year
                                    </label>
                                    <Input 
                                        value={formData.year}
                                        onChange={(e) => updateField('year', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Make
                                    </label>
                                    <Input 
                                        value={formData.make}
                                        onChange={(e) => updateField('make', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Model
                                    </label>
                                    <Input 
                                        value={formData.model}
                                        onChange={(e) => updateField('model', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Vehicle Price
                                    </label>
                                    <Input 
                                        type="number"
                                        value={formData.vehiclePrice}
                                        onChange={(e) => updateField('vehiclePrice', e.target.value)}
                                        className="h-12"
                                        placeholder="$35,000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Down Payment
                                    </label>
                                    <Input 
                                        type="number"
                                        value={formData.downPayment}
                                        onChange={(e) => updateField('downPayment', e.target.value)}
                                        className="h-12"
                                        placeholder="$7,000"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Exterior Color
                                    </label>
                                    <Input 
                                        value={formData.exteriorColor}
                                        onChange={(e) => updateField('exteriorColor', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                        Interior Color
                                    </label>
                                    <Input 
                                        value={formData.interiorColor}
                                        onChange={(e) => updateField('interiorColor', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            {/* Trade-in Section */}
                            <div className="border-t pt-6">
                                <label className="flex items-center gap-3 cursor-pointer mb-4">
                                    <input 
                                        type="checkbox"
                                        checked={formData.hasTrade}
                                        onChange={(e) => updateField('hasTrade', e.target.checked)}
                                        className="w-5 h-5"
                                    />
                                    <span className="font-semibold" style={{ fontFamily: fonts.body }}>
                                        Add Trade-in?
                                    </span>
                                </label>

                                {formData.hasTrade && (
                                    <div className="space-y-4 animate-slideIn">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                                    Trade Year
                                                </label>
                                                <Input 
                                                    value={formData.tradeYear}
                                                    onChange={(e) => updateField('tradeYear', e.target.value)}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                                    Trade Make
                                                </label>
                                                <Input 
                                                    value={formData.tradeMake}
                                                    onChange={(e) => updateField('tradeMake', e.target.value)}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                                    Trade Model
                                                </label>
                                                <Input 
                                                    value={formData.tradeModel}
                                                    onChange={(e) => updateField('tradeModel', e.target.value)}
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                                    Trade Mileage
                                                </label>
                                                <Input 
                                                    type="number"
                                                    value={formData.tradeMileage}
                                                    onChange={(e) => updateField('tradeMileage', e.target.value)}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ fontFamily: fonts.body }}>
                                                    Estimated Value
                                                </label>
                                                <Input 
                                                    type="number"
                                                    value={formData.tradeValue}
                                                    onChange={(e) => updateField('tradeValue', e.target.value)}
                                                    className="h-12"
                                                    placeholder="$15,000"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                        {step > 1 && (
                            <Button 
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                className="px-8"
                            >
                                Back
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button 
                                type="button"
                                onClick={nextStep}
                                className="px-8 ml-auto"
                                style={{ backgroundColor: theme.primary }}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button 
                                type="submit"
                                className="px-8 ml-auto"
                                style={{ backgroundColor: theme.primary }}
                            >
                                Submit Application
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.4s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}