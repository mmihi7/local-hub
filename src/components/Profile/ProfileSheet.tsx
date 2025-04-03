
import React from 'react';
import { User, X } from 'lucide-react';
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileSheet = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  return (
    <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
      <SheetHeader className="mb-5">
        <div className="flex justify-between items-center">
          <SheetTitle className="flex items-center gap-2">
            <User className="w-5 h-5" /> Profile
          </SheetTitle>
          <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center">
            <X className="h-4 w-4" />
          </SheetClose>
        </div>
      </SheetHeader>
      
      {isLoggedIn ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-lg font-medium">John Doe</h2>
            <p className="text-muted-foreground text-sm">john.doe@example.com</p>
          </div>
          
          <Tabs defaultValue="personal">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Contact Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="text-sm col-span-2">+254 123 456 789</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm col-span-2">Kakamega, Kenya</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Social Profiles</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Facebook</span>
                    <span className="text-sm col-span-2 text-primary">@johndoe</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Twitter</span>
                    <span className="text-sm col-span-2 text-primary">@johndoe</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="business" className="space-y-4 mt-4">
              <p className="text-sm text-center text-muted-foreground">No business profile registered yet</p>
              <Button className="w-full">Register Business Profile</Button>
            </TabsContent>
          </Tabs>

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-medium">Sign In</h2>
            <p className="text-sm text-muted-foreground">Access your profile and preferences</p>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                id="email" 
                type="email" 
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input 
                id="password" 
                type="password" 
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <Button className="w-full" onClick={() => setIsLoggedIn(true)}>Sign In</Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <span className="text-primary cursor-pointer">Sign up</span>
            </p>
          </div>
        </div>
      )}
    </SheetContent>
  );
};

export default ProfileSheet;
