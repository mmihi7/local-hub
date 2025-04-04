
import React from 'react';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthTabs from '../Auth/AuthTabs';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const ProfileSheet = () => {
  const { isAuthenticated, user, signOut, setupTwoFactor } = useAuth();
  
  return (
    <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
      <SheetHeader className="mb-5">
        <SheetTitle className="flex items-center gap-2">
          <User className="w-5 h-5" /> Profile
        </SheetTitle>
      </SheetHeader>
      
      {isAuthenticated && user ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-lg font-medium">{user.displayName || 'User'}</h2>
            <p className="text-muted-foreground text-sm">{user.email || user.phoneNumber}</p>
          </div>
          
          <Tabs defaultValue="personal">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Contact Information</h3>
                <div className="space-y-2">
                  {user.phoneNumber && (
                    <div className="grid grid-cols-3">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <span className="text-sm col-span-2">{user.phoneNumber}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="grid grid-cols-3">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm col-span-2">{user.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Social Profiles</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Facebook</span>
                    <span className="text-sm col-span-2 text-primary">Not connected</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Twitter</span>
                    <span className="text-sm col-span-2 text-primary">Not connected</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    checked={user.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      setupTwoFactor(checked ? 'app' : 'none')
                    }
                  />
                </div>
                
                {user.twoFactorEnabled && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-xs font-medium text-muted-foreground">
                      Authentication method
                    </h4>
                    <RadioGroup 
                      defaultValue={user.twoFactorMethod} 
                      className="space-y-2"
                      onValueChange={(value) => 
                        setupTwoFactor(value as 'sms' | 'app' | 'email')
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="app" id="app" />
                        <Label htmlFor="app">Authenticator app</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sms" id="sms" />
                        <Label htmlFor="sms">SMS verification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email">Email verification</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Session management</h3>
                <Button variant="outline" size="sm" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Manage active sessions
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Password settings</h3>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Change password
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Business Profile</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm col-span-2">Not Registered</span>
                  </div>
                </div>
                <Button className="w-full">Register Business Profile</Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Create a Post</h3>
                <Button variant="outline" size="sm" className="w-full">
                  Create Post as Individual
                </Button>
                <Button variant="outline" size="sm" className="w-full" disabled={true}>
                  Create Post as Business
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2 pt-4 border-t">
            <Button variant="outline" size="sm" className="w-full">
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Terms of Use
            </Button>
            <Button variant="destructive" className="w-full" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <AuthTabs />
      )}
    </SheetContent>
  );
};

export default ProfileSheet;
