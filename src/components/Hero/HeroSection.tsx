
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-kakamega-100/50 to-transparent -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-kakamega-200 rounded-full blur-3xl opacity-20 -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-kakamega-300 rounded-full blur-3xl opacity-20 -z-10 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block animate-fade-in">
            <div className="inline-flex items-center rounded-full border border-kakamega-200 bg-white px-3 py-1 text-sm text-kakamega-600 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-kakamega-500 mr-2" />
              Introducing Kakamega AI
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="mt-6 text-balance font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Your Local</span>
            <span className="relative">
              <span className="absolute -z-10 inset-0 bg-gradient-to-r from-kakamega-400/20 to-kakamega-300/20 blur-2xl" />
              <span className="text-kakamega-600"> Digital Gateway</span>
            </span>
          </h1>
          
          {/* Description */}
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Empowering Kakamega through intelligent local insights, connecting businesses, 
            residents, and services in ways never before possible.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button className="bg-kakamega-500 hover:bg-kakamega-600 text-white rounded-full px-8 py-6 text-lg group">
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="border-kakamega-200 text-kakamega-700 hover:bg-kakamega-100 hover:text-kakamega-700 rounded-full px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '10K+', label: 'Local Businesses' },
              { value: '30K+', label: 'Users' },
              { value: '100+', label: 'Community Groups' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-kakamega-600">{stat.value}</div>
                <div className="mt-1 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hero image frame */}
      <div className="mt-16 max-w-5xl mx-auto px-4 animate-scale-in" style={{ animationDelay: '0.5s' }}>
        <div className="relative rounded-2xl bg-gradient-to-b from-kakamega-200 to-white p-2 shadow-xl ring-1 ring-kakamega-100/80 overflow-hidden">
          {/* Simulate a dialog interface */}
          <div className="relative bg-white rounded-xl shadow-sm overflow-hidden min-h-[300px] sm:min-h-[400px] p-4">
            <div className="absolute top-0 inset-x-0 h-10 bg-gray-50 border-b flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto text-sm font-medium text-gray-500">Kakamega AI Assistant</div>
            </div>
            
            <div className="pt-12 pb-4 space-y-6">
              <div className="flex items-start max-w-[80%]">
                <div className="bg-kakamega-500 text-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                  How can I help you discover Kakamega today?
                </div>
              </div>
              
              <div className="flex items-start max-w-[80%] ml-auto">
                <div className="bg-gray-100 rounded-2xl rounded-tr-none px-4 py-2">
                  I'm looking for the best local restaurants near Kakamega town.
                </div>
              </div>
              
              <div className="flex items-start max-w-[80%]">
                <div className="bg-kakamega-500 text-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                  I found 24 restaurants in Kakamega town. The highest rated are Kakamega Bistro, Green Gardens, and Forest View. Would you like me to filter by cuisine type?
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 inset-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-gray-100 border-0 rounded-full px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-kakamega-500" 
                  placeholder="Type your question about Kakamega..." 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-kakamega-500 p-1 rounded-full hover:bg-kakamega-100 transition-all">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
