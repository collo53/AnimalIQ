import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, TreePine, Leaf, Globe, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    case 'temperate oceanic': return 'bg-blue-100 text-blue-800';
    case 'tropical rainforest': return 'bg-green-100 text-green-800';
    case 'subarctic': return 'bg-purple-100 text-purple-800';
    case 'humid subtropical': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Forests = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForestAnimals = async () => {
      try {
        const res = await axios.get("https://animals-production-13e6.up.railway.app/animals/animals/category/forest-animals/");
        setAnimals(res.data.animals || []);
      } catch (err) {
        console.error("Failed to load forest animals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForestAnimals();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556648011-e01aca870a81?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <TreePine className="h-12 w-12 mr-4 text-accent" />
            <h1 className="text-6xl md:text-7xl font-bold">Forests of the World</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Discover fascinating facts about Earth's most magnificent forests.
          </p>
        </div>
      </section>

      {/* Animal Cards Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Forest Animals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the animals that inhabit the lush, diverse forests around the globe.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-lg text-muted-foreground">Loading animals...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {animals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden hover:shadow-forest transition-all duration-300 hover:-translate-y-2">
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
  );
};

export default Forests;