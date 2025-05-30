
import React, { useState, useEffect } from 'react';
import { ChevronDown, User, SunMoon, Sidebar, X, LayoutPanelLeft, MapPin, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useTheme, counties, CountyType } from '@/contexts/ThemeContext';
import ProfileSheet from '../Profile/ProfileSheet';
import ProfileActionsSheet from '../Profile/ProfileActionsSheet';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = ({ visiblePanels, setVisiblePanels }) => {
  const { county, setCounty, theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isActionsSheetOpen, setActionsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const [allPanelsClosed, setAllPanelsClosed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if all panels are closed
    const areAllClosed = !visiblePanels.topics && !visiblePanels.history;
    setAllPanelsClosed(areAllClosed);
  }, [visiblePanels]);

  const togglePanel = (panel) => {
    setVisiblePanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const restoreAllPanels = () => {
    setVisiblePanels({
      map: true,
      topics: true,
      history: true
    });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        scrolled
          ? theme === 'dark' 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-2' 
            : 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-3'
      )}
      style={{ backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(0, 0, 139, 0.5)' }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo and Slogan */}
        <div className="flex items-center">
          <span className="text-white text-sm md:text-lg italic">Find Anything Locally</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 text-white">
                <span className="text-sm md:text-base">{counties[county].displayName}</span>
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

          {allPanelsClosed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={restoreAllPanels}
              title="Show all panels"
            >
              <LayoutPanelLeft className="h-5 w-5" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Sidebar className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Panels</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visiblePanels.map}
                onCheckedChange={() => togglePanel('map')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map View
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visiblePanels.topics}
                onCheckedChange={() => togglePanel('topics')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Suggested Topics
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visiblePanels.history}
                onCheckedChange={() => togglePanel('history')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Chat History
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={restoreAllPanels}
                className="text-xs justify-center"
              >
                Reset All Panels
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-white" onClick={toggleTheme}>
            <SunMoon className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0 text-white" onClick={() => setActionsSheetOpen(true)}>
                <User className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            {isAuthenticated ? (
              <ProfileActionsSheet onClose={() => setActionsSheetOpen(false)} />
            ) : (
              <ProfileSheet />
            )}
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
