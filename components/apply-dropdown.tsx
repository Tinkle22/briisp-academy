'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const programs = {
  ADULTS: [
    { name: 'Full Time', href: '/fulltime' },
    { name: 'Online', href: '/adults-online' },
    { name: 'Distance', href: '/distance' },
    { name: 'Part Time', href: '/part-time' },
  ],
  KIDS: [
    { name: 'Weekends Program', href: '/weekend' },
    { name: 'Holiday Program', href: '/holiday' },
    { name: 'Online Program', href: '/kids-online' },
    { name: 'Briisp Kids-Hub', href: '/hub' },
  ],
};

export default function ApplyDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.apply-dropdown')) {
      setIsOpen(false);
    }
  };

  // Add/remove event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative apply-dropdown">
      <Link
        href="#"
        className="text-sm font-semibold leading-6 text-muted-foreground hover:text-amber-600"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        Apply
      </Link>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-full md:w-[600px] origin-top-right rounded-lg bg-background shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none p-4 md:p-6">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Adults Section */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-3 md:mb-4 text-amber-600">ADULTS</h3>
              <div className="space-y-1 md:space-y-2">
                {programs.ADULTS.map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="block px-3 md:px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Kids Section */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-3 md:mb-4 text-amber-600">KIDS</h3>
              <div className="space-y-1 md:space-y-2">
                {programs.KIDS.map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="block px-3 md:px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}