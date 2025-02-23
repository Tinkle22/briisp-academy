'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ChevronRight, BookOpen, FileCode, Users, Lightbulb, PenTool, GraduationCap } from 'lucide-react';

interface ServiceDetails {
  title: string;
  description: string;
  image: string;
  applyLink: string;
  viewMoreLink: string;
}

const services = [
  {
    id: 'refresher',
    label: 'Refresher Course',
    icon: BookOpen,
    details: {
      title: 'Graduate Refresher Course',
      description: 'We help you practice and become proficient in your field through hands-on training and expert guidance.',
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/refresher',
      viewMoreLink: '/services/refresher'
    }
  },
  {
    id: 'final-year',
    label: 'Final Year Project',
    icon: FileCode,
    details: {
      title: 'Final Year Project Consultation',
      description: 'We give guidance to prototype, abstract, and implement your final year project effectively.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/project',
      viewMoreLink: '/services/project'
    }
  },
  {
    id: 'consultations',
    label: 'Consultations',
    icon: Users,
    details: {
      title: 'Professional Consultations',
      description: 'Get expert advice and guidance for your technical projects and career decisions.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/consultation',
      viewMoreLink: '/services/consultation'
    }
  },
  {
    id: 'internship',
    label: 'Internship',
    icon: GraduationCap,
    details: {
      title: 'Internship Program',
      description: 'We offer and connect students to different internship opportunities in the industry.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/internship',
      viewMoreLink: '/services/internship'
    }
  },
  {
    id: 'innovation',
    label: 'Innovations Technology',
    icon: Lightbulb,
    details: {
      title: 'Innovation Hub',
      description: 'Access cutting-edge technology and resources to bring your innovative ideas to life.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/innovation',
      viewMoreLink: '/services/innovation'
    }
  },
  {
    id: 'pitch',
    label: 'Pitch Decks',
    icon: PenTool,
    details: {
      title: 'Pitch Deck Creation',
      description: 'Learn to create compelling pitch decks and present your ideas professionally.',
      image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=400&q=80',
      applyLink: '/apply/pitch',
      viewMoreLink: '/services/pitch'
    }
  }
];

export default function ServicesDropdown() {
  const [activeService, setActiveService] = useState<ServiceDetails | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.services-dropdown')) {
      setIsOpen(false);
      setActiveService(null);
    }
  };

  // Add/remove event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative services-dropdown z-50">
      <button
        className="text-sm font-semibold leading-6 text-muted-foreground hover:text-amber-600"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          if (!isOpen) {
            setActiveService(null);
          }
        }}
      >
        Other Services
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-full md:w-[600px] origin-top-right rounded-lg bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4 md:p-6">
          <div className="flex flex-col md:flex-row">
            {/* Services List */}
            <div className="w-full md:w-1/3 md:border-r">
              <div className="p-1 md:p-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    className={`flex items-center gap-2 w-full p-2 md:p-3 text-sm rounded-md hover:bg-muted text-left ${
                      activeService?.title === service.details.title ? 'bg-muted' : ''
                    }`}
                    onMouseEnter={() => setActiveService(service.details)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveService(service.details);
                    }}
                  >
                    <service.icon className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                    <span className="text-xs md:text-sm">{service.label}</span>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Panel */}
            <div className="w-full md:w-2/3 p-2 md:p-4">
              {activeService ? (
                <div className="space-y-3 md:space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{activeService.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                      {activeService.description}
                    </p>
                    <div className="flex gap-2 md:gap-3">
                      <Link
                        href={activeService.applyLink}
                        className="inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-amber-700 h-8 md:h-10 px-3 md:px-4 py-1 md:py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Apply
                      </Link>
                      <Link
                        href={activeService.viewMoreLink}
                        className="inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 md:h-10 px-3 md:px-4 py-1 md:py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-32 md:h-full flex items-center justify-center text-muted-foreground">
                  <p className="text-xs md:text-sm">Select a service to see details</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}