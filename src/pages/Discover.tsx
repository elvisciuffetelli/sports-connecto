
import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import CenterCard, { SportsCenterProps } from '@/components/discover/CenterCard';
import BookingModal from '@/components/discover/BookingModal';
import MotionWrapper from '@/components/shared/MotionWrapper';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<{ id: number; name: string } | null>(null);
  
  // Mock data
  const sportsCenters: Omit<SportsCenterProps, 'onClick'>[] = [
    {
      id: 1,
      name: 'Downtown Sports Club',
      image: 'https://images.unsplash.com/photo-1505666287802-931582b5ed38?q=80&w=1000',
      address: '123 Main St, Downtown',
      distance: '1.2 miles',
      rating: 4.7,
      openingHours: '7:00 AM - 10:00 PM',
      sports: ['Tennis', 'Basketball', 'Swimming']
    },
    {
      id: 2,
      name: 'Elite Tennis Academy',
      image: 'https://images.unsplash.com/photo-1622279457486-28f993f99cd9?q=80&w=1000',
      address: '456 Park Ave, Midtown',
      distance: '2.5 miles',
      rating: 4.9,
      openingHours: '8:00 AM - 9:00 PM',
      sports: ['Tennis', 'Padel']
    },
    {
      id: 3,
      name: 'Riverside Sports Complex',
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1000',
      address: '789 River Rd, Eastside',
      distance: '3.8 miles',
      rating: 4.5,
      openingHours: '6:00 AM - 11:00 PM',
      sports: ['Soccer', 'Basketball', 'Volleyball', 'Swimming']
    }
  ];

  const filteredCenters = sportsCenters.filter((center) => 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    center.sports.some(sport => sport.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCenterClick = (id: number, name: string) => {
    setSelectedCenter({ id, name });
  };

  const handleCloseModal = () => {
    setSelectedCenter(null);
  };

  const myBookings = [
    {
      id: 1,
      centerName: 'Downtown Sports Club',
      sport: 'Tennis',
      court: 'Court 3',
      date: 'Today',
      time: '5:00 PM',
      players: [
        { id: 1, name: 'You', avatar: '' },
        { id: 2, name: 'Alex Johnson', avatar: '' },
        { id: 3, name: 'Sarah Williams', avatar: '' }
      ]
    }
  ];

  return (
    <AppLayout>
      <MotionWrapper>
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search sports centers or activities" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="centers">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="centers">Sports Centers</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="centers" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredCenters.map((center) => (
                <MotionWrapper key={center.id} delay={100 * center.id} animation="scale-in">
                  <CenterCard 
                    {...center}
                    onClick={() => handleCenterClick(center.id, center.name)}
                  />
                </MotionWrapper>
              ))}
              
              {filteredCenters.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No sports centers found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="bookings">
            {myBookings.length > 0 ? (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <MotionWrapper key={booking.id} animation="scale-in">
                    <div className="bg-card rounded-lg shadow-sm border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{booking.centerName}</h3>
                          <div className="flex items-center text-sm mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{booking.date}, {booking.time}</span>
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium">{booking.sport}</span>
                            <span className="mx-1">•</span>
                            <span>{booking.court}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Players</p>
                        <div className="flex -space-x-2">
                          {booking.players.map((player) => (
                            <div 
                              key={player.id}
                              className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium"
                            >
                              {player.name.charAt(0)}
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            className="w-8 h-8 rounded-full ml-1 p-0"
                            size="icon"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You don't have any bookings yet</p>
                <Button className="mt-4">Find Sports Centers</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </MotionWrapper>
      
      {selectedCenter && (
        <BookingModal 
          isOpen={!!selectedCenter}
          onClose={handleCloseModal}
          centerName={selectedCenter.name}
        />
      )}
    </AppLayout>
  );
};

export default Discover;
