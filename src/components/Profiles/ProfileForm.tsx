
import React, { useState } from 'react';
import { Check, ChevronDown, Facebook, Globe, Instagram, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  type: 'individual' | 'business';
}

const ProfileForm: React.FC<ProfileFormProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = type === 'individual' 
    ? ['Personal Info', 'Social Media', 'Preferences'] 
    : ['Business Info', 'Contact Details', 'Products & Services', 'Social Media'];
  
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8 animate-fade-in">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-standard focus-ring rounded-t-lg -mb-px",
              activeTab === index 
                ? "text-kakamega-600 border-b-2 border-kakamega-500" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Form Fields - Personal Info / Business Info */}
      {activeTab === 0 && (
        <div className="space-y-6 animate-fade-in">
          {type === 'individual' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location in Kakamega</label>
                <div className="relative">
                  <select className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent appearance-none">
                    <option>Select your location</option>
                    <option>Kakamega Town</option>
                    <option>Lurambi</option>
                    <option>Mumias</option>
                    <option>Malava</option>
                    <option>Butere</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Category</label>
                <div className="relative">
                  <select className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent appearance-none">
                    <option>Select a category</option>
                    <option>Restaurant & Food</option>
                    <option>Retail & Shopping</option>
                    <option>Health & Wellness</option>
                    <option>Services</option>
                    <option>Entertainment</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your business..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Status</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="status" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500" />
                    <span className="ml-2">Registered Business</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="status" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500" />
                    <span className="ml-2">Unregistered</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Location</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  placeholder="Physical address in Kakamega"
                />
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Form Fields - Social Media */}
      {(activeTab === 1 && type === 'individual') || (activeTab === 3 && type === 'business') ? (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Facebook className="w-5 h-5 text-blue-600 mr-2" />
              Facebook Profile URL
            </label>
            <input 
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
              placeholder="https://facebook.com/yourprofile"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Twitter className="w-5 h-5 text-blue-400 mr-2" />
              Twitter/X Profile URL
            </label>
            <input 
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Instagram className="w-5 h-5 text-pink-500 mr-2" />
              Instagram Profile URL
            </label>
            <input 
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
              placeholder="https://instagram.com/yourprofile"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Linkedin className="w-5 h-5 text-blue-700 mr-2" />
              LinkedIn Profile URL
            </label>
            <input 
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          {type === 'business' && (
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Globe className="w-5 h-5 text-green-600 mr-2" />
                Website URL
              </label>
              <input 
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                placeholder="https://yourbusiness.com"
              />
            </div>
          )}
        </div>
      ) : null}
      
      {/* Form Fields - Preferences */}
      {activeTab === 2 && type === 'individual' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="font-medium mb-4">Communication Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">SMS notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Event notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Business updates</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Make profile public</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Show location</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded" />
                <span className="ml-2">Allow businesses to contact me</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['Community Events', 'Business Network', 'Government Services', 'Education', 'Healthcare', 'Entertainment', 'Local News', 'Sports'].map((interest, index) => (
                <label key={index} className="flex items-center px-3 py-1.5 rounded-full border border-border hover:bg-muted cursor-pointer transition-standard">
                  <input type="checkbox" className="w-4 h-4 text-kakamega-500 focus:ring-kakamega-500 rounded mr-2" />
                  {interest}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Form Fields - Contact Details (Business only) */}
      {activeTab === 1 && type === 'business' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-2">Business Email</label>
            <input 
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Business Phone</label>
            <input 
              type="tel"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alternative Phone</label>
            <input 
              type="tel"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Operating Hours</label>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <span className="w-24">Monday</span>
                <input 
                  type="text" 
                  className="px-3 py-1.5 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  placeholder="9:00 AM"
                />
                <span>to</span>
                <input 
                  type="text" 
                  className="px-3 py-1.5 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  placeholder="5:00 PM"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="w-24">Tuesday</span>
                <input 
                  type="text" 
                  className="px-3 py-1.5 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  placeholder="9:00 AM"
                />
                <span>to</span>
                <input 
                  type="text" 
                  className="px-3 py-1.5 rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                  placeholder="5:00 PM"
                />
              </div>
              {/* Add more days... simplified for this example */}
            </div>
          </div>
        </div>
      )}
      
      {/* Form Fields - Products & Services (Business only) */}
      {activeTab === 2 && type === 'business' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Products/Services</h3>
              <button className="text-sm text-kakamega-600 hover:text-kakamega-700">+ Add New</button>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Name</label>
                      <input 
                        type="text"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                        defaultValue={index === 1 ? "Business Consultation" : "Financial Planning"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Category</label>
                      <div className="relative">
                        <select className="w-full px-3 py-1.5 text-sm rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent appearance-none">
                          <option>Service</option>
                          <option>Product</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Price Range</label>
                      <input 
                        type="text"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent"
                        defaultValue={index === 1 ? "KSh 5,000 - 15,000" : "KSh 3,000 - 10,000"}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea 
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-border focus:ring-2 focus:ring-kakamega-500 focus:border-transparent resize-none"
                      defaultValue={index === 1 ? "Professional business consultation services for small and medium enterprises." : "Comprehensive financial planning and advisory services."}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Business Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {['Financial Services', 'Business Advisory', 'Tax Planning', 'Investment', 'Retirement', 'Insurance'].map((specialty, index) => (
                <div key={index} className="flex items-center px-3 py-1.5 rounded-full bg-kakamega-100 text-kakamega-700 text-sm">
                  {specialty}
                  <button className="ml-2 text-kakamega-600 hover:text-kakamega-800">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-kakamega-300 text-sm transition-standard">
                + Add Specialty
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Save Button */}
      <div className="mt-10 flex items-center justify-between">
        <button className="text-muted-foreground hover:text-foreground">Cancel</button>
        <Button className="bg-kakamega-500 hover:bg-kakamega-600 text-white px-6">
          <Check className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
