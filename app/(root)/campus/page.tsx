import { MapPin, Phone, Mail, Globe, Clock, Users, BookOpen, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CampusPage() {
  return (
    <div className="min-h-screen">
      {/* Admissions Banner */}
      {/* <div className="bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-sm sm:text-base font-medium">
            🎓 Admissions are now open for {new Date().getFullYear()}! Early bird discounts available.
          </p>
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px]">
        <img
          src="img-01.jpg"
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
            Our Campus
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Campus Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Our Main Campus</h2>
            <p className="text-muted-foreground mb-6">
              Our state-of-the-art campus is designed to provide students with the best learning environment. 
              Situated in a prime location, our campus features modern facilities, spacious classrooms, and 
              advanced technology labs to support your educational journey.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: '2000+ Students' },
                { icon: BookOpen, label: '50+ Programs' },
                { icon: Clock, label: 'Modern Facilities' },
                { icon: Trophy, label: 'Award Winning' },
              ].map((item, index) => (
                <Card key={index} className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600/10">
                    <item.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Campus Location</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <p className="font-medium">Meanwood Ndeke Phase 2</p>
                    <p className="text-sm text-muted-foreground">Plot 2436 Lusaka</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-600" />
                  <p>+260 953500666</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-600" />
                  <p>briispacademyacademy111@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-amber-600" />
                  <p>briispacademy.com</p>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-600">
                  Get Directions
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Campus Images */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Campus Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "img-01.jpg",
              "img-02.jpg",
              "event3.jpg",
            ].map((src, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={`Campus View ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Modern Classrooms',
                description: 'Equipped with latest technology and comfortable seating for optimal learning experience.',
              },
              {
                title: 'Computer Labs',
                description: 'State-of-the-art computer labs with high-speed internet and latest software.',
              },
              {
                title: 'Library',
                description: 'Extensive collection of books, journals, and digital resources.',
              },
              {
                title: 'Student Lounge',
                description: 'Comfortable spaces for students to relax and collaborate.',
              },
              {
                title: 'Conference Hall',
                description: 'Large hall for seminars, workshops, and events.',
              },
              {
                title: 'Parking Space',
                description: 'Ample parking space available for students and staff.',
              },
            ].map((facility, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{facility.title}</h3>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}