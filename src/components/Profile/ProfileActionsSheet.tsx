
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Settings, Briefcase, Share2, LogOut, SunMoon, Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

const ProfileActionsSheet = ({ onClose }: { onClose: () => void }) => {
  const { signOut, user, updateProfile } = useAuth();
  const { toggleTheme, theme } = useTheme();
  
  const form = useForm({
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    }
  });

  const handleProfileUpdate = (data: any) => {
    updateProfile(data);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'theme':
        toggleTheme();
        break;
      case 'logout':
        signOut();
        break;
      default:
        break;
    }
    onClose(); // Close the sheet after action
  };

  return (
    <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
      <SheetHeader className="mb-5">
        <SheetTitle className="flex items-center gap-2">
          <User className="w-5 h-5" /> Account
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        {user && (
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="rounded-full w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{user.displayName || 'User'}</h3>
              <p className="text-sm text-muted-foreground">{user.email || user.phoneNumber}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium px-1">Account Settings</h3>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" className="w-full justify-start" onClick={() => handleActionClick('personalization')}>
            <Settings className="w-4 h-4 mr-2" />
            Personalization
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleActionClick('business')}>
            <Briefcase className="w-4 h-4 mr-2" />
            List a Business
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleActionClick('socials')}>
            <Share2 className="w-4 h-4 mr-2" />
            Connect Socials
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleActionClick('theme')}>
            <SunMoon className="w-4 h-4 mr-2" />
            Toggle Theme ({theme === 'dark' ? 'Light' : 'Dark'} Mode)
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => handleActionClick('logout')}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default ProfileActionsSheet;
