
import React from 'react';
import { useState } from 'react';
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
import { useTheme, counties, CountyType } from '@/contexts/ThemeContext';
import ProfileSheet from '../Profile/ProfileSheet';

const Header = () => {
  const { county, setCounty } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
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
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-3'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <span className="text-primary">Local</span>
          <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-xs">AI</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>{counties[county].displayName}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
              <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0">
                <User className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <ProfileSheet />
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
