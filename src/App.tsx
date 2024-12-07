import { useEffect } from 'react';
import { initializeTheme } from '@/themes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/MainNav';
import AdminZone from '@/pages/AdminZone';
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <MainNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminZone />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;