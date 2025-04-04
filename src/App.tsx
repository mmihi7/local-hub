
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import './App.css';

const queryClient = new QueryClient();

// Dynamic background component
const DynamicBackground = () => {
  const { countyInfo, theme } = useTheme();
  
  return (
    <>
      <div 
        className="dynamic-background" 
        style={{ backgroundImage: `url(${countyInfo.backgroundImage})` }}
      />
      <div className="bg-overlay" />
    </>
  );
};

// App layout with background
const AppContent = () => {
  return (
    <>
      <DynamicBackground />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
