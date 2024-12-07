import { useEffect } from 'react';
import { initializeTheme } from '@/themes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/MainNav';
import AdminZone from '@/pages/AdminZone';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';

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
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminZone />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;