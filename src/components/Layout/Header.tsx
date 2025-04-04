import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useTheme, counties, CountyType } from '@/contexts/ThemeContext'; // Ensure this import is present
import ProfileSheet from '../Profile/ProfileSheet';
import ProfileActionsSheet from '../Profile/ProfileActionsSheet'; // Import the new actions sheet


const Header = () => {
  const { county, setCounty, isLoggedIn } = useTheme(); // Access isLoggedIn from context
  const [scrolled, setScrolled] = useState(false);
  const [isActionsSheetOpen, setActionsSheetOpen] = useState(false); // State for actions sheet visibility
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-3'
      )}
      style={{ backgroundColor: 'rgba(0, 0, 139, 0.5)' }} // Dark blue with 50% opacity
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo and Slogan */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <span className="text-white text-3xl">LOCAL</span>
          <span className="text-white text-lg italic">Find Anything Locally</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>{counties[county].displayName}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="transition-opacity duration-200 ease-in-out">
              {Object.entries(counties).map(([key, info]) => (
                <DropdownMenuItem 
                  key={key}
                  onClick={() => setCounty(key as CountyType)}
                  className={cn(
                    county === key && 'font-medium bg-muted'
                  )}
                >
                  {info.displayName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0" onClick={() => setActionsSheetOpen(true)}>
                <User className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            {isLoggedIn ? (
              <ProfileActionsSheet onClose={() => setActionsSheetOpen(false)} /> // Show actions sheet if logged in
            ) : (
              <ProfileSheet /> // Show default profile sheet if not logged in
            )}
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;