
import React, { useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ChatInterface from '@/components/Chat/ChatInterface';
import { MessageSquare, ThumbsUp, Users, Mail, BookOpen } from 'lucide-react';

const Chat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const suggestedTopics = [
    {
      icon: Users,
      title: "Local Government",
      description: "Ask about county services, officials, and operations"
    },
    {
      icon: ThumbsUp,
      title: "Business Directory",
      description: "Find local businesses and their offerings"
    },
    {
      icon: Mail,
      title: "Community Events",
      description: "Discover what's happening in Kakamega"
    },
    {
      icon: BookOpen,
      title: "Local Knowledge",
      description: "Learn about Kakamega's history and culture"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Chat with Kakamega AI</h1>
              <p className="text-lg text-muted-foreground">
                Ask questions about Kakamega and get intelligent responses powered by local knowledge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="h-[600px]">
                  <ChatInterface />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                {/* AI Assistant Info */}
                <div className="rounded-xl border border-border p-6 bg-white shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-kakamega-500 flex items-center justify-center text-white">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Kakamega AI Assistant</h3>
                      <p className="text-sm text-muted-foreground">Powered by local knowledge</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    I'm your AI assistant for all things Kakamega. Ask me about local businesses, events, government services, or anything related to the county.
                  </p>
                </div>
                
                {/* Suggested Topics */}
                <div className="rounded-xl border border-border p-6 bg-white shadow-sm">
                  <h3 className="font-medium mb-4">Suggested Topics</h3>
                  <div className="space-y-4">
                    {suggestedTopics.map((topic, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-kakamega-100 flex items-center justify-center text-kakamega-600 flex-shrink-0">
                          <topic.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{topic.title}</h4>
                          <p className="text-xs text-muted-foreground">{topic.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* FAQs */}
                <div className="rounded-xl border border-border p-6 bg-white shadow-sm">
                  <h3 className="font-medium mb-4">Frequently Asked</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-kakamega-600 hover:underline cursor-pointer">What are the popular restaurants in Kakamega?</li>
                    <li className="text-kakamega-600 hover:underline cursor-pointer">How do I pay county rates online?</li>
                    <li className="text-kakamega-600 hover:underline cursor-pointer">What's the best time to visit Kakamega Forest?</li>
                    <li className="text-kakamega-600 hover:underline cursor-pointer">Who is the current Governor of Kakamega?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
