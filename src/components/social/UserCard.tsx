
import React from 'react';
import { MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface UserCardProps {
  id: number;
  name: string;
  username: string;
  avatar: string;
  location: string;
  sports: string[];
  isFollowing: boolean;
  onToggleFollow: (userId: number) => void;
  onViewProfile: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  avatar,
  location,
  sports,
  isFollowing,
  onToggleFollow,
  onViewProfile
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div 
            className="w-12 h-12 rounded-full bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">@{username}</p>
            
            {location && (
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1.5 mt-2">
              {sports.map((sport) => (
                <Badge key={sport} variant="secondary" className="text-xs">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => onToggleFollow(id)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onViewProfile(id)}
            >
              Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
