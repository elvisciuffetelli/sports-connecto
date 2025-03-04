
import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface SportsCenterProps {
  id: number;
  name: string;
  image: string;
  address: string;
  distance: string;
  rating: number;
  openingHours: string;
  sports: string[];
  onClick: () => void;
}

const CenterCard: React.FC<SportsCenterProps> = ({
  name,
  image,
  address,
  distance,
  rating,
  openingHours,
  sports,
  onClick
}) => {
  return (
    <Card 
      className="overflow-hidden card-hover cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{address}</span>
          <span className="mx-1.5">•</span>
          <span>{distance}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{openingHours}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {sports.map((sport) => (
            <Badge key={sport} variant="secondary" className="text-xs">
              {sport}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterCard;
