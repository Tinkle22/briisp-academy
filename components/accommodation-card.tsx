import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

const AccommodationCard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-yellow-400 fill-current" />
        <h2 className="text-lg font-semibold">Limited Availability!</h2>
      </div>
      
      <h3 className="text-xl font-bold mb-3">
        Full-Time Accommodation For Students
      </h3>
      
      <p className="text-muted-foreground mb-4">
        Looking for comfortable and convenient accommodation? Look no further! 
        We offer full-time accommodation in the prime location of Mearwood Ndeke Phase 
        2 at an affordable fee of K300 per month.
      </p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <MapPin className="h-4 w-4 text-amber-600" />
        <span>Mearwood Ndeke Phase 2</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span>Available Spaces</span>
          <span className="font-semibold">10 rooms</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Monthly Rent</span>
          <span className="font-semibold text-amber-600">K300</span>
        </div>
      </div>

      <Button 
        className="w-full mt-6 bg-amber-600 hover:bg-amber-700"
        asChild
      >
        <Link href="/apply-accommodation">
          Apply
        </Link>
      </Button>
    </Card>
  );
};

export default AccommodationCard; 