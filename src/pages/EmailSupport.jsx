
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mail, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function EmailSupport() {
  const [copied, setCopied] = useState(false);
  const email = 'omni.lotservices@gmail.com';

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
      } else {
        // Fallback for older browsers and mobile
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        setCopied(true);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      // If all else fails, try to select the text for manual copy
      const emailElement = document.getElementById('email-text');
      if (emailElement) {
        const range = document.createRange();
        range.selectNodeContents(emailElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes subtle-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2); }
        }
        .card-glow {
          animation: subtle-glow 5s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-500/8 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -top-12 left-0 w-full">
            <Link to={createPageUrl('Support')}>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
                </Button>
            </Link>
        </div>
        
        <Card className="bg-gray-800/60 border-gray-700 backdrop-blur-md relative overflow-hidden text-center p-8 md:p-10 rounded-2xl card-glow">
          <CardContent className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-white">Email Support</h1>
            <p className="text-gray-300 mb-8">Copy our support email address below or click to open your mail client.</p>

            <a href={`mailto:${email}`} className="group inline-flex items-center justify-center w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 mb-6 text-sm sm:text-lg text-blue-300 hover:bg-gray-700 hover:border-blue-500/50 transition-all duration-300 break-all">
              <Mail className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              <span id="email-text" className="break-all text-center">{email}</span>
            </a>

            <Button onClick={handleCopy} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40">
              {copied ? <Check className="w-5 h-5 mr-2 animate-pulse" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? 'Copied!' : 'Copy Email'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
