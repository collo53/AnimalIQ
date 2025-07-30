import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Waves, Mountain, Snowflake, Users, MessageSquare, Heart, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const adventureZones = [
    {
      id: 'forests',
      title: 'Forest Expedition',
      description: 'Discover the secrets of ancient forests and meet incredible woodland creatures',
      icon: Trees,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      image: 'photo-1507041957456-9c397ce39c97'
    },
    {
      id: 'oceananimals',
      title: 'Ocean Adventure',
      description: 'Dive deep into marine ecosystems and encounter majestic sea life',
      icon: Waves,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      image: 'photo-1518877593221-1f28583780b4'
    },
    {
      id: 'savanna',
      title: 'Savanna Safari',
      description: 'Journey across vast grasslands and witness the Big Five in action',
      icon: Mountain,
      color: 'bg-amber-600',
      hoverColor: 'hover:bg-amber-700',
      image: 'photo-1466721591366-2d5fba72006d'
    },
    {
      id: 'arctic',
      title: 'Arctic Exploration',
      description: 'Brave the frozen wilderness and learn about polar wildlife',
      icon: Snowflake,
      color: 'bg-cyan-600',
      hoverColor: 'hover:bg-cyan-700',
      image: 'photo-1441057206919-63d19fac2369'
    }
  ];

  const featuredAnimals = [
    {
      name: 'Snow Leopard',
      status: 'Endangered',
      habitat: 'Mountains of Central Asia',
      image: 'photo-1472396961693-142e6e269027'
    },
    {
      name: 'African Elephant',
      status: 'Vulnerable',
      habitat: 'African Savannas',
      image: 'photo-1465379944081-7f47de8d74ac'
    },
    {
      name: 'Humpback Whale',
      status: 'Least Concern',
      habitat: 'World\'s Oceans',
      image: 'photo-1518877593221-1f28583780b4'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
           <div className="flex items-center space-x-2">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
              <span className="text-2xl font-bold text-gray-800">AnimalIQ</span>
            </div>

            <div className="hidden md:flex space-x-6">
              <a href="#adventures" className="text-gray-700 hover:text-green-600 transition-colors">Adventures</a>
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
           Turning passion into protection.
          </h1>
          <p className="text-xl md:text-1xl mb-8 animate-fade-in">
            Welcome to Animal IQ—a youth-led movement dedicated to protecting wildlife and all animals. We educate, inspire, and unite, turning passion into action for a brighter, sustainable future. Through adventure, learning, and hands-on projects, we empower young people to take meaningful steps in wildlife conservation and animal care. With advocacy and action, we’re leading the way to preserve habitats and protect animals every day. Join us on this exciting journey to inspire, protect, and make a lasting impact on the natural world!
          </p>
         
        </div>
      </section>

      {/* Adventure Zones */}
      <section id="adventures" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Adventure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Embark on virtual expeditions to different habitats around the world. 
              Each zone offers unique learning experiences and wildlife encounters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adventureZones.map((zone) => {
        const CardContentJSX = (
          <Card className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden rounded-t-lg">
              <img 
                src={`https://images.unsplash.com/${zone.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                alt={zone.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${zone.color} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <zone.icon className="h-16 w-16 text-white" />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{zone.title}</h3>
              <p className="text-gray-600">{zone.description}</p>
            </CardContent>
          </Card>
        );

  return (
  <Link to={`/${zone.id}`} key={zone.id}>
      {CardContentJSX}
    </Link>
  );
})}

          </div>
        </div>
      </section>

      {/* Animals Teaser Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Discover Amazing Animals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn incredible facts about wildlife from around the world and discover how we can help protect them.
          </p>
          <Link to="/animals">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
              <Heart className="mr-2 h-5 w-5" />
              Explore Animal Facts of Endangered Species
            </Button>
          </Link>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with passionate young conservationists from around the world. 
            Share experiences, discuss wildlife protection strategies, and plan conservation actions together.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">300+</h3>
              <p>Active Members</p>
            </div>
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p>Discussion Topics</p>
            </div>
            <div className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">3+</h3>
              <p>Countries Represented</p>
            </div>
          </div>
          <Link to="/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
              <MessageSquare className="mr-2 h-5 w-5" />
              Enter Forum
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
              <span className="text-2xl font-bold">AnimalIQ</span>
            </div>
            <p className="text-gray-400">
              Protecting wildlife through youth action and community engagement.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-green-400 transition-colors">Adventures</a></li>
              <li><Link to="/animals" className="hover:text-green-400 transition-colors">Animals</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition-colors">Forum</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/register" className="hover:text-green-400 transition-colors">Join Us</a></li>
             
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
            <li><a href="https://www.instagram.com/animal_lq?utm_source=ig_web_button_share_sheet&igsh=Zzl0amUzM3VjbWpq" className="hover:text-green-400 transition-colors">Social Media</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 AnimalIQ. All rights reserved. Made with ❤️ for wildlife conservation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
