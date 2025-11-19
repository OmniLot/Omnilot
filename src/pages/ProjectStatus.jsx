import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, FileText, ChevronDown } from 'lucide-react';

const projectPhases = [
  { name: 'Project Kick-off', status: 'completed', step: 1 },
  { name: 'Design & Wireframing', status: 'completed', step: 2 },
  { name: 'Development & Community Building', status: 'current', step: 3 },
  { name: 'Testing & QA', status: 'upcoming', step: 4 },
  { name: 'Deployment & Launch', status: 'upcoming', step: 5 },
];

export default function ProjectStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4); }
        }

        @keyframes progress-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .progress-line {
          background: linear-gradient(90deg, #22c55e, #22c55e 48%, #3b82f6 48%, #3b82f6 48.5%, #374151 48.5%);
          background-size: 100% 100%;
          position: relative;
          overflow: hidden;
        }

        .progress-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
          animation: progress-flow 3s ease-in-out infinite;
        }

        .phase-node {
          transition: all 0.3s ease;
        }

        .phase-node:hover {
          transform: scale(1.1);
        }

        .completed-node {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          animation: float-up 3s ease-in-out infinite;
        }

        .current-node {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          animation: pulse-glow 2s ease-in-out infinite, float-up 3s ease-in-out infinite 0.5s;
        }

        .upcoming-node {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          box-shadow: 0 0 10px rgba(107, 114, 128, 0.2);
        }

        .status-card {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          position: relative;
          overflow: hidden;
        }

        .status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: scan-line 3s ease-in-out infinite;
        }

        .status-card:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          opacity: 0.6;
          animation: float-up 4s ease-in-out infinite, circuit-pulse 2s ease-in-out infinite;
        }

        .tech-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(0deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        .holographic-text {
          background: linear-gradient(45deg, #60a5fa, #3b82f6, #1d4ed8, #60a5fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: progress-flow 3s ease-in-out infinite;
        }

        .progress-percentage {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 50%;
          width: 8px;
          height: 8px;
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Tech grid background */}
      <div className="tech-grid"></div>

      {/* Floating particles */}
      <div className="floating-particle top-20 left-10" style={{ animationDelay: '0s' }}></div>
      <div className="floating-particle top-32 right-20" style={{ animationDelay: '1s' }}></div>
      <div className="floating-particle bottom-40 left-20" style={{ animationDelay: '2s' }}></div>
      <div className="floating-particle top-2/3 right-1/3" style={{ animationDelay: '1.5s' }}></div>
      <div className="floating-particle bottom-1/3 left-1/3" style={{ animationDelay: '2.5s' }}></div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/2 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="relative text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="holographic-text">Project Status</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Track the live progress of your <span className="text-blue-400 font-semibold">Omni.Lot</span> implementation from kick-off to launch.
          </p>
        </div>

        {/* Enhanced Progress Timeline - Desktop */}
        <div className="relative mb-20 hidden md:block">
          {/* Enhanced Progress Bar */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-gray-700/50 -translate-y-1/2 rounded-full overflow-hidden">
            <div className="progress-line absolute top-0 left-0 h-2 rounded-full shadow-lg" 
                 style={{ width: '48%' }}>
              <div className="progress-percentage"></div>
            </div>
          </div>

          <div className="relative flex items-start justify-between">
            {projectPhases.map((phase, index) => (
              <div key={phase.name} className="flex flex-col items-center text-center flex-1 group">
                <div className={`phase-node relative w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 z-10 ${
                  phase.status === 'completed' ? 'completed-node' :
                  phase.status === 'current' ? 'current-node' :
                  'upcoming-node'
                }`}>
                  <div className="relative z-10 text-white">
                    {phase.status === 'completed' ? 
                      <CheckCircle className="w-7 h-7" /> : 
                      <span className="font-bold text-lg">{phase.step}</span>
                    }
                  </div>
                  
                  {/* Node glow ring */}
                  <div className={`absolute inset-0 rounded-full border-2 ${
                    phase.status === 'completed' ? 'border-green-400/30' :
                    phase.status === 'current' ? 'border-blue-400/50' :
                    'border-gray-500/20'
                  } scale-125 opacity-60`}></div>
                </div>
                
                <div className="max-w-32">
                  <h3 className={`text-sm md:text-base font-semibold leading-tight transition-colors duration-300 mb-2 ${
                    phase.status === 'current' ? 'text-blue-400' :
                    phase.status === 'completed' ? 'text-green-400' :
                    'text-gray-500'
                  }`}>
                    {phase.name}
                  </h3>
                  
                  <Badge className={`text-xs ${
                    phase.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    phase.status === 'current' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-gray-600/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {phase.status === 'completed' ? '✓ Done' : 
                     phase.status === 'current' ? '🔄 Active' : 
                     '⏳ Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Progress Timeline - Mobile */}
        <div className="relative mb-16 md:hidden">
          <div className="space-y-6">
            {projectPhases.map((phase, index) => (
              <div key={phase.name} className="flex items-center gap-6 p-5 bg-gray-800/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`phase-node relative w-14 h-14 rounded-full flex items-center justify-center z-10 ${
                    phase.status === 'completed' ? 'completed-node' :
                    phase.status === 'current' ? 'current-node' :
                    'upcoming-node'
                  }`}>
                    {phase.status === 'completed' ? 
                      <CheckCircle className="w-6 h-6 text-white" /> : 
                      <span className="font-bold text-white">{phase.step}</span>
                    }
                  </div>
                  {index < projectPhases.length - 1 && (
                    <div className={`w-1 h-12 mt-3 rounded-full ${
                      phase.status === 'completed' ? 'bg-gradient-to-b from-green-500/80 to-green-500/20' : 
                      'bg-gradient-to-b from-gray-600/50 to-gray-700/20'
                    }`}></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold leading-tight mb-2 ${
                    phase.status === 'current' ? 'text-blue-400' :
                    phase.status === 'completed' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {phase.name}
                  </h3>
                  
                  <Badge className={`${
                    phase.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    phase.status === 'current' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-gray-600/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {phase.status === 'completed' ? '✓ Completed' : 
                     phase.status === 'current' ? '🔄 In Progress' : 
                     '⏳ Upcoming'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Current Phase Details */}
        <Card className="status-card shadow-2xl rounded-2xl">          
          <CardHeader className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Development & <span className="text-blue-400">Community Building</span>
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-sm px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                    In Progress
                  </Badge>
                  <Badge className="bg-gray-700/50 text-gray-300 border border-gray-600/30 text-sm px-4 py-2 rounded-full">
                    Phase 3 of 5
                  </Badge>
                </div>
              </div>
              
              <div className="text-left md:text-right bg-gray-700/30 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
                <div className="flex items-center text-gray-400 mb-3 text-sm font-medium">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Expected Completion</span>
                </div>
                <div className="font-bold text-white text-xl md:text-2xl">October 14, 2025</div>
                <div className="text-blue-400 text-sm mt-1">60% Complete</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 p-6 md:p-8 pt-0 md:pt-0">
            <div className="bg-gray-700/30 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
              <div className="flex items-start">
                <div className="w-12 h-12 md:w-auto md:h-auto bg-blue-500/20 md:bg-transparent rounded-full md:rounded-none flex items-center justify-center mr-4 flex-shrink-0 border border-blue-500/30">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-4">
                    Backend infrastructure is fully configured on our cloud environment. Frontend development for the main 
                    dealership dashboard and inventory management system is currently underway.
                  </p>
                  
                  {/* Progress indicators */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Backend Setup</span>
                      <span className="text-green-400 text-sm font-semibold">✓ Complete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Frontend Dashboard</span>
                      <span className="text-blue-400 text-sm font-semibold">🔄 In Progress</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Community Features</span>
                      <span className="text-gray-500 text-sm">⏳ Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}