import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/MainNav';
import { Settings } from '@/components/Settings';
import { Routes, Route } from 'react-router-dom';
import Services from '@/pages/Services';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AdminZone from '@/pages/AdminZone';
import '@/styles/app.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminZone />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;