import { useEffect, useState } from "react";
import axios from "axios";
import { Image,X,Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Photo {
  id: number;
  image: string;  
  title: string;
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
      const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };
  

  useEffect(() => {
    axios.get("https://animals-production-13e6.up.railway.app/animals/gallery/") // replace with your actual endpoint
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Error loading gallery:", err));
  }, []);

  useEffect(() => {
    if (!autoplay || photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoplay, photos]);

  const nextPhoto = () => setCurrent((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrent((prev) => (prev - 1 + photos.length) % photos.length);

  if (photos.length === 0) {
    return <div className="text-center text-gray-500 py-20">Loading gallery...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
           <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-green-600 rounded-full flex items-center justify-center">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">AnimalIQ</span>
            </div>

            <div className="hidden lg:flex space-x-6">
               <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Adventures</a>
                 <Link to="/animals" className="text-gray-700 hover:text-green-600 transition-colors">Animals</Link>
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">Forum</Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
               <Link to="/gallery" className="text-gray-700 hover:text-green-600 transition-colors">Gallery</Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Login
                </Button>
              </Link>
             < Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700">
                Register
              </Button>
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-green-600 transition-colors p-2 rounded-md hover:bg-gray-100"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-2">
                  <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Adventures</a>
                 <Link to="/animals" className="text-gray-700 hover:text-green-600 transition-colors">Animals</Link>
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">Forum</Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
               <Link to="/gallery" className="text-gray-700 hover:text-green-600 transition-colors">Gallery</Link>
                
                <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Login
                </Button>
              </Link>
             < Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700">
                Register
              </Button>
              </Link>
            </div>
              </div>
            </div>
          )}
        </div>
      </nav>

    
    <div className="w-full max-w-4xl mx-auto">
        <div className=" ">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl text-green-400 font-bold ">
            Photo Gallery
          </h1>
          <p className="text-gray-500 mt-2 text-2xl ">
            Explore our collection of stunning images from our various adventures wildlife encounters and get togethers.
          </p>
        </div>
      </div>
      <Card className="overflow-hidden shadow-lg relative group">
        <CardContent className="p-0">
          <div className="relative h-96 w-full overflow-hidden">
            <img
              src={photos[current].image}
              alt={photos[current].title}
               className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out mx-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-lg font-semibold">
              {photos[current].title}
            </div>
            <Button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black rounded-full p-2"
              size="icon"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black rounded-full p-2"
              size="icon"
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {photos.map((photo, index) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <img
                src={photo.image}
                alt={photo.title}
                 className={`h-20 w-28 object-cover cursor-pointer rounded-lg border-2 mx-auto ${current === index ? "border-blue-500" : "border-transparent"}`}
                onClick={() => setCurrent(index)}
              />
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <img src={photo.image} alt={photo.title} className="w-full h-full object-contain" />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  </div>
  );
};

export default PhotoGallery;
