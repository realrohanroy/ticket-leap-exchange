
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "@/context/AuthContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Import pages
import Index from "@/pages/Index";
import PostTicket from "@/pages/PostTicket";
import Search from "@/pages/Search";
import MyTickets from "@/pages/MyTickets";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import TermsOfUse from "@/pages/TermsOfUse";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import UserProfile from "@/pages/UserProfile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <SiteSettingsProvider>
              <Toaster />
              <SpeedInsights />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/post-ticket" element={<PostTicket />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/my-tickets" element={<MyTickets />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/user/:userId" element={<UserProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SiteSettingsProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
