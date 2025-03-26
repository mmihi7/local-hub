
import React from 'react';
import { 
  Building, Users, Calendar, Map, Globe, Smartphone, 
  Shield, RefreshCw, MessageSquare, Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <div 
      className="group relative p-6 rounded-2xl transition-standard hover:bg-white hover:shadow-md hover:-translate-y-1"
      style={{ 
        animationDelay: `${0.1 + index * 0.1}s`
      }}
    >
      <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-kakamega-100 to-transparent opacity-0 group-hover:opacity-100 transition-standard" />
      
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-kakamega-100 text-kakamega-600 mb-5 transition-standard group-hover:bg-kakamega-500 group-hover:text-white">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: Building,
      title: 'Local Government Services',
      description: 'Access county services, information, and updates in one convenient location.'
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Build professional and social connections with others in your local community.'
    },
    {
      icon: Database,
      title: 'Business Directory',
      description: 'Discover and connect with local businesses across Kakamega County.'
    },
    {
      icon: Calendar,
      title: 'Community Events',
      description: 'Stay updated with local events, workshops, and community gatherings.'
    },
    {
      icon: Map,
      title: 'Hyperlocal Information',
      description: 'Get detailed insights about specific neighborhoods and locations.'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Communicate in English, Swahili, or Luhya based on your preference.'
    },
    {
      icon: Smartphone,
      title: 'Social Integration',
      description: 'Connect your existing social media profiles to enhance your local presence.'
    },
    {
      icon: Shield,
      title: 'Robust Privacy Controls',
      description: 'Maintain control over your data with comprehensive privacy settings.'
    },
    {
      icon: RefreshCw,
      title: 'Real-time Updates',
      description: 'Receive instant notifications about important local developments.'
    },
    {
      icon: MessageSquare,
      title: 'AI-Powered Assistance',
      description: 'Get intelligent responses to your questions about Kakamega.'
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-kakamega-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-kakamega-100 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4 text-balance animate-slide-up">Comprehensive Local Platform</h2>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Explore the powerful features that make Kakamega AI your essential local digital companion.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-slide-up">
              <Feature 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
