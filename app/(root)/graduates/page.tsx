import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Trophy, Calendar, Star } from 'lucide-react';
import { headers } from 'next/headers';

// Define the Graduate type based on your schema
interface Graduate {
  graduate_id: number;
  name: string;
  graduate_image_url: string;
  year_of_completion: number;
  period_of_study: string;
  final_score: number;
  // other fields can be added as needed
}

export default async function GraduatesPage() {
  // Construct an absolute URL for the API endpoint using the incoming request's host.
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Fetch graduate data from our API using an absolute URL.
  const res = await fetch(`${baseUrl}/api/graduates`, { cache: 'no-store' });
  const graduates: Graduate[] = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Distinguished Graduates
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Meet our successful graduates who have excelled in their respective programs
              and are now making their mark in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Graduates Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduates.map((graduate, index) => (
              <Link key={graduate.graduate_id} href={`/graduates/${graduate.graduate_id}`}>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="relative">
                    {index < 3 && (
                      <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{index + 1}</span>
                      </div>
                    )}
                    <div className="aspect-square relative">
                      <img
                        src={graduate.graduate_image_url}
                        alt={graduate.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{graduate.name}</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{graduate.period_of_study}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Class of {graduate.year_of_completion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span>Final Score: {graduate.final_score}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}