
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Globe, Users, Target, Award, TreePine, Fish, Bird, Leaf, Book, BookOpen, Bus,X,Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: 'Tabitha Waigwa',
      role: 'Founder & Wildlife Conservationist',
      age: 22,
      location: 'Nairobi, Kenya',
      bio: 'Wildlife student passionate about wildlife conservation and youth empowerment.'
    },
   
  ];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
      const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

  const achievements = [
    {
      icon: Users,
      title: '300+ Youth Engaged',
      description: 'Young conservationists from 3 countries actively participating in our movement.'
    },
    {
      icon: TreePine,
      title: 'Awareness Campaigns',
      description: ' Guided 50+ people on educational nature walks and tours.'
    

    },
    {
      icon: Bus,
      title: 'Educational getaways',
      description: 'Organized 10+ educational trips to national parks and wildlife reserves.'
    },
    {
      icon: Award,
      title: 'Network Recognition',
      description: 'Gained recognition from local conservation networks and NGOs for our impact.'
    }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Wildlife Experience Trips',
      description: 'We believe that seeing animals in their natural habitats creates lasting emotional connections—and from that connection comes action..'
    },
    {
      icon: Heart,
      title: ' By Youth, For Earth',
      description: 'Animal IQ is led by youth and powered by youth. We believe young people have the creativity, passion, and energy to change the world for animals.'
    },
    {
      icon: Target,
      title: 'Compassion Beyond the Wild',
      description: 'We care for all creatures—from elephants in the wild to dogs, cats, and birds in our communities. Conservation begins with everyday kindness.'
    },
    {
      icon: Users,
      title: 'Curiosity with Purpose',
      description: 'We encourage questions, exploration, and knowledge-sharing. Curiosity is our spark; change is our goal.'
    }, 
  
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
     <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-green-600 rounded-full flex items-center justify-center">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">Animal IQ</span>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Animal IQ</h1>
          <p className="text-xl text-gray-600 mb-8">
            We are a global movement of passionate young people united by one mission: 
            to protect and preserve our planet's incredible wildlife for future generations.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
               <p className="text-gray-600">
                We aim to spark a love for animals by giving youth real chances to explore, connect with, and protect nature—turning first encounters into lifelong conservation action.
              </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  We envision a world where every young person becomes a powerful voice for animals—driven by experience, understanding, and a deep commitment to conservation. Youth-led action will shape the future of wildlife protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-xl mb-6">
            Animal IQ was founded by Tabitha Wanjira Waigwa, a passionate conservationist inspired by her childhood near Lake Nakuru National Park. Her daily encounters with wildlife sparked a deep love for animals and nature.
          </p>
          <p className="text-xl mb-6">
            Growing up, she realized many of her peers had never experienced the wild firsthand. This disconnect drove her to launch Animal IQ—a youth-led platform bringing people closer to wildlife through travel, storytelling, and shared experiences.
          </p>
          <p className="text-xl mb-6">
            Animal IQ is not just about wild animals, but also about caring for those around us—pets and community animals. Tabitha believes respect begins at home and grows outward.
          </p>
          <p className="text-xl mb-6">
            Today, Animal IQ is a growing youth movement built on education, adventure, and advocacy—making conservation real, relatable, and fun.
          </p>

          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-2">Age {member.age} • {member.location}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <achievement.icon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Ready to become a wildlife guardian? Join thousands of young conservationists 
            who are making a real difference for our planet's incredible biodiversity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-green-600">
                <Globe className="mr-2 h-5 w-5" />
                Visit Our Forum
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12 px-4">
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
            <img src="/wan.jpg" alt="AnimalIQ Logo" className="h-20 w-20 object-contain rounded-full" />
                    <span className="text-2xl font-bold">Animal IQ</span>
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
                <p>&copy; 2024 Animal IQ. All rights reserved. Made with ❤️ for wildlife conservation.</p>
              </div>
            </footer>
    </div>
  );
};

export default About;
