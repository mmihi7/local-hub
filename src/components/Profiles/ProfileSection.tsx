
import React from 'react';
import { User, Building, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  type: 'individual' | 'business';
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  type,
  title,
  description,
  features,
  index,
}) => {
  return (
    <div 
      className="relative group rounded-2xl p-8 bg-white border border-border shadow-sm transition-standard hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
      style={{ 
        animationDelay: `${0.1 + index * 0.2}s`
      }}
    >
      <div 
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
          type === 'individual' 
            ? "bg-kakamega-100 text-kakamega-600" 
            : "bg-kakamega-500 text-white"
        )}
      >
        {type === 'individual' ? (
          <User className="w-7 h-7" />
        ) : (
          <Building className="w-7 h-7" />
        )}
      </div>
      
      <h3 className="text-2xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2 mt-1 text-kakamega-500">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={cn(
          "mt-auto rounded-full group flex items-center justify-center",
          type === 'individual' 
            ? "bg-white text-kakamega-600 border border-kakamega-200 hover:bg-kakamega-50" 
            : "bg-kakamega-500 text-white hover:bg-kakamega-600"
        )}
      >
        Create Profile
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

const ProfileSection = () => {
  const profiles = [
    {
      type: 'individual' as const,
      title: 'Individual Profiles',
      description: 'Connect with your community and discover local opportunities tailored to your interests.',
      features: [
        'Add personal social media profiles',
        'Connect with community groups',
        'Share local expertise and recommendations',
        'Build professional and social connections',
        'Discover events and opportunities'
      ]
    },
    {
      type: 'business' as const,
      title: 'Business Profiles',
      description: 'Expand your local presence and connect with potential customers in the Kakamega region.',
      features: [
        'Quick self-registration process',
        'Verify business status',
        'Upload business photos and information',
        'Showcase product and service catalogs',
        'Social media profile integration',
        'Enterprise API integration for CRM systems'
      ]
    }
  ];

  return (
    <section id="profiles" className="py-20 relative overflow-hidden bg-kakamega-50/50">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4 text-balance animate-slide-up">Comprehensive Profiles</h2>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We've created a powerful, interconnected profile system for individuals and businesses.
          </p>
        </div>
        
        {/* Profile cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {profiles.map((profile, index) => (
            <div key={index} className="animate-slide-up">
              <ProfileCard
                type={profile.type}
                title={profile.title}
                description={profile.description}
                features={profile.features}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
