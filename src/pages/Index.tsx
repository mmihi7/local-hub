
import React, { useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import HeroSection from '@/components/Hero/HeroSection';
import FeatureSection from '@/components/Features/FeatureSection';
import ProfileSection from '@/components/Profiles/ProfileSection';
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeatureSection />
        
        {/* Profile Section */}
        <ProfileSection />
        
        {/* Network Effects Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="mb-4 text-balance animate-slide-up">Network Effects</h2>
              <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
                The more people and businesses that join, the more valuable the platform becomes for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="relative p-8 rounded-2xl shadow-sm border border-border bg-white animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute right-4 top-4 text-kakamega-500">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-medium mb-4">For Individuals</h3>
                <ul className="space-y-4">
                  {[
                    'Discover local connections based on shared interests',
                    'Get personalized recommendations for local businesses',
                    'Join and discover community groups',
                    'Contribute to local knowledge sharing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-kakamega-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative p-8 rounded-2xl shadow-sm border border-border bg-white animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="absolute right-4 top-4 text-kakamega-500">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-medium mb-4">For Businesses</h3>
                <ul className="space-y-4">
                  {[
                    'Increase local visibility and customer reach',
                    'Gather reviews and build local reputation',
                    'Connect with other businesses for partnerships',
                    'Access local market insights and trends'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-kakamega-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Features Section */}
        <section className="py-16 bg-gradient-to-b from-kakamega-50/70 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Multilingual Support",
                    description: "Access the platform in English, Swahili, or Luhya based on your preference."
                  },
                  {
                    icon: CheckCircle2,
                    title: "Real-time Updates",
                    description: "Stay informed with immediate notifications about important local developments."
                  },
                  {
                    icon: Shield,
                    title: "Privacy Controls",
                    description: "Manage your data with comprehensive privacy settings and controls."
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-6 animate-slide-up" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                    <div className="w-12 h-12 mx-auto rounded-full bg-kakamega-100 text-kakamega-600 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-kakamega-100/50 to-kakamega-200/30" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-kakamega-200 rounded-full blur-3xl opacity-30" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-scale-in">
              <h2 className="mb-6 text-balance">Join the Kakamega Digital Ecosystem</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Be part of the movement that's connecting Kakamega's businesses, residents, and services in new and innovative ways.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-kakamega-500 hover:bg-kakamega-600 text-white rounded-full px-8 py-6 text-lg group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="border-kakamega-200 text-kakamega-700 hover:bg-kakamega-100 hover:text-kakamega-700 rounded-full px-8 py-6 text-lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
