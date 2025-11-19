import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote / Portland, OR',
    type: 'Full-time',
    salary: '$120k - $160k',
    description: 'Build beautiful, responsive interfaces for dealership websites using React, TypeScript, and modern web technologies.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design skills']
  },
  {
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote / Portland, OR',
    type: 'Full-time',
    salary: '$140k - $180k',
    description: 'Develop AI-powered features for automotive industry applications, including chatbots, lead scoring, and predictive analytics.',
    requirements: ['Machine Learning expertise', 'Python/TensorFlow', 'NLP experience']
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote / Portland, OR',
    type: 'Full-time',
    salary: '$100k - $130k',
    description: 'Design intuitive experiences for dealership management tools and customer-facing automotive websites.',
    requirements: ['5+ years product design', 'Figma expertise', 'B2B SaaS experience']
  },
  {
    title: 'Enterprise Sales Director',
    department: 'Sales',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150k - $200k + Commission',
    description: 'Lead enterprise sales efforts, targeting large dealership groups and automotive industry leaders.',
    requirements: ['B2B enterprise sales', 'Automotive industry knowledge', 'Proven track record']
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80k - $110k',
    description: 'Help dealerships maximize value from Omni.Lot platform through onboarding, training, and ongoing support.',
    requirements: ['Customer success experience', 'Automotive knowledge preferred', 'Excellent communication']
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote / Portland, OR',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Build and maintain scalable infrastructure for automotive AI applications with high availability requirements.',
    requirements: ['AWS/GCP experience', 'Kubernetes', 'CI/CD pipelines']
  }
];

const benefits = [
  'Competitive salary and equity',
  'Comprehensive health insurance',
  'Flexible work arrangements',
  'Professional development budget',
  'Unlimited PTO policy',
  'Top-tier equipment provided'
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style>{`
        @keyframes float-particles {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes holographic-shine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2); }
        }

        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .holographic-text {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8, #6366f1, #3b82f6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: holographic-shine 3s ease-in-out infinite;
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          animation: float-particles 4s infinite ease-in-out;
        }

        .tech-card {
          position: relative;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
        }

        .tech-card:hover {
          border: 1px solid rgba(59, 130, 246, 0.3);
          animation: glow-pulse 0.8s ease-in-out;
          transform: translateY(-2px);
        }

        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          transition: left 0.6s ease;
        }

        .tech-card:hover::before {
          left: 100%;
        }

        .scan-line-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .tech-card:hover .scan-line-effect {
          left: 100%;
        }

        .circuit-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, transparent 98%, rgba(59, 130, 246, 0.05) 99%, transparent 100%),
            linear-gradient(0deg, transparent 98%, rgba(59, 130, 246, 0.05) 99%, transparent 100%);
          background-size: 60px 60px;
          opacity: 0.3;
        }

        .tech-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          transition: all 0.3s ease;
        }

        .tech-button:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          transform: translateY(-1px);
        }

        .tech-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .tech-button:hover::before {
          left: 100%;
        }

        .fade-in-future {
          opacity: 0;
          animation: fadeInFuture 2s ease-in-out 0.5s forwards;
        }

        @keyframes fadeInFuture {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Tech grid background */}
      <div className="circuit-lines"></div>

      {/* Floating particles */}
      <div className="floating-particle top-1/4 left-10" style={{ animationDelay: '0s' }}></div>
      <div className="floating-particle top-1/3 right-20" style={{ animationDelay: '2s' }}></div>
      <div className="floating-particle bottom-1/4 left-20" style={{ animationDelay: '4s' }}></div>
      <div className="floating-particle top-2/3 right-1/3" style={{ animationDelay: '1s' }}></div>
      <div className="floating-particle bottom-1/3 left-1/3" style={{ animationDelay: '3s' }}></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 fade-in-future">
            Join the <span className="holographic-text">Future</span> of Automotive
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us revolutionize how dealerships use AI technology. We&apos;re looking for 
            passionate individuals to build the next generation of automotive software.
          </p>
        </div>

        {/* Job Openings */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">Join our team and help shape the future of automotive technology</p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="tech-card overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                <div className="scan-line-effect"></div>
                <CardHeader className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <CardTitle className="text-2xl text-gray-900 mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button className="tech-button text-white whitespace-nowrap relative">
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="tech-card rounded-3xl p-12 mb-20 hidden md:block relative overflow-hidden">
          <div className="scan-line-effect"></div>
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at Omni.Lot?</h2>
            <p className="text-lg text-gray-600">We offer competitive compensation and amazing benefits</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-gray-700 group">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}