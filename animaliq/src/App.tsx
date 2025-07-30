
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Animals from "./pages/Animals";
import Forum from "./pages/Forum";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forests from "./pages/forests";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin";
import PhotoGallery from "./pages/gallery"
import OceanAnimals from "./pages/OceanAnimals";
import Savanna from "./pages/Savanna"; 
import Arctic from "./pages/Arctic"; 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forests" element={<Forests />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/oceananimals" element={<OceanAnimals />} />
          <Route path="/savanna" element={<Savanna />} />
          <Route path="/arctic" element={<Arctic />} />
          {/* Catch-all route for 404 Not Found */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
