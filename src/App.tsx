import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ServicePage from "./pages/ServicePage";
import BundlePage from "./pages/BundlePage";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ClientPortal from "./pages/ClientPortal";
import NotFound from "./pages/NotFound";
import IntroAnimation from "./components/IntroAnimation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <IntroAnimation />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/service/:slug" element={<ServicePage />} />
            <Route path="/bundle/:slug" element={<BundlePage />} />
            <Route path="/checkout/:slug" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/portal" element={<ClientPortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
