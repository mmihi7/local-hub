
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ProfileForm from '@/components/Profiles/ProfileForm';
import { User, Building, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Profile = () => {
  const [profileType, setProfileType] = useState<'individual' | 'business' | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Create Your Profile</h1>
              <p className="text-lg text-muted-foreground">
                Join the Kakamega digital ecosystem by creating your personal or business profile.
              </p>
            </div>
            
            {profileType === null ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div 
                  className="border border-border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-standard flex flex-col cursor-pointer animate-fade-in"
                  onClick={() => setProfileType('individual')}
                >
                  <div className="w-14 h-14 rounded-xl bg-kakamega-100 text-kakamega-600 flex items-center justify-center mb-6">
                    <User className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-medium mb-3">Individual Profile</h2>
                  <p className="text-muted-foreground mb-6">
                    Create a personal profile to connect with your community, discover local opportunities, and share your expertise.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-auto flex items-center justify-center border-kakamega-200 text-kakamega-600"
                  >
                    Create Individual Profile
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div 
                  className="border border-border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-standard flex flex-col cursor-pointer animate-fade-in"
                  onClick={() => setProfileType('business')}
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="w-14 h-14 rounded-xl bg-kakamega-500 text-white flex items-center justify-center mb-6">
                    <Building className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-medium mb-3">Business Profile</h2>
                  <p className="text-muted-foreground mb-6">
                    Register your business to increase visibility, connect with customers, and grow your presence in Kakamega.
                  </p>
                  <Button 
                    className="mt-auto flex items-center justify-center bg-kakamega-500 hover:bg-kakamega-600 text-white"
                  >
                    Create Business Profile
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex items-center">
                  <button 
                    onClick={() => setProfileType(null)}
                    className="text-muted-foreground hover:text-foreground flex items-center focus-ring"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                    Back to profile selection
                  </button>
                  <div className="ml-auto flex items-center space-x-2">
                    <button 
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm font-medium",
                        profileType === 'individual'
                          ? "bg-kakamega-100 border-kakamega-200 text-kakamega-700"
                          : "bg-white border-border text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setProfileType('individual')}
                    >
                      <User className="w-4 h-4 inline-block mr-2" />
                      Individual
                    </button>
                    <button 
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm font-medium",
                        profileType === 'business'
                          ? "bg-kakamega-100 border-kakamega-200 text-kakamega-700"
                          : "bg-white border-border text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setProfileType('business')}
                    >
                      <Building className="w-4 h-4 inline-block mr-2" />
                      Business
                    </button>
                  </div>
                </div>
                
                <ProfileForm type={profileType} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
