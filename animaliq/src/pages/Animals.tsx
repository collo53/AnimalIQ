import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Leaf, Globe, Droplets, Waves } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


interface Animal {
  id: number;
  name: string;
  habitat: string;
  description: string;
  size: string;
  lifespan: string;
  diet: string;
  conservation_status: string;
  category: string;
  facts: string[];
  image: string;
}

const getClimateColor = (climate: string) => {
  switch (climate.toLowerCase()) {
    case 'marine': return 'bg-blue-200 text-blue-800';
    case 'polar': return 'bg-cyan-100 text-cyan-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOceanAnimals = async () => {
      try {
    const res = await axios.get("https://animals-production-13e6.up.railway.app/animals/animals/category/endangered-animals/");
        setAnimals(res.data.animals || []);
      } catch (err) {
        console.error("Failed to load ocean animals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOceanAnimals();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
           <div className="flex items-center space-x-2">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
              <span className="text-2xl font-bold text-gray-800">AnimalIQ</span>
            </div>

            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Adventures</a>
              <Link to="/animals" className="text-gray-700 hover:text-green-600 transition-colors">Animals</Link>
              <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">Forum</Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
              <Link to="/gallery" className="text-gray-700 hover:text-green-600 transition-colors">Gallery</Link>
            </div>
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
      </nav>

      {/* Animal Cards Grid (same as your Forest component) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
           <h1 className="text-5xl font-bold text-gray-800 mb-6">Amazing  Animals</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover incredible facts about our planet's endangered creatures. 
            Learn about their Diet, habitats, and the conservation status.
          </p>
          </div>

          {loading ? (
            <div className="text-center text-lg text-muted-foreground">Loading animals...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {animals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={`https://animals-production-13e6.up.railway.app/${animal.image}`}
                      alt={animal.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getClimateColor(animal.habitat || "")}>
                        {animal.habitat}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4 flex items-center bg-black/50 text-white px-2 py-1 rounded">
                      <Globe className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{animal.lifespan}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-foreground">
                        {animal.name}
                      </CardTitle>
                      <span className="text-lg font-bold text-primary">{animal.size}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{animal.habitat}</span>
                    </div>

                    <CardDescription className="text-base leading-relaxed">
                      {animal.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Leaf className="h-4 w-4 mr-2" />
                        <span>Diet: {animal.diet}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Droplets className="h-4 w-4 mr-2" />
                        <span>Conservation: {animal.conservation_status}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-foreground mb-2">Amazing Facts:</h4>
                      <div className="flex flex-wrap gap-2">
                        {animal.facts?.map((fact, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {fact}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </div>
  );
};

export default Animals;
