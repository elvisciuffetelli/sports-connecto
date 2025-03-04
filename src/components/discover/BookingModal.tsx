
import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  centerName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, centerName }) => {
  const [selectedTab, setSelectedTab] = useState('book');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Mock data
  const availableDates = ['Mon, June 5', 'Tue, June 6', 'Wed, June 7', 'Thu, June 8', 'Fri, June 9'];
  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
  
  const openTeams = [
    { id: 1, sport: 'Tennis', time: '5:00 PM', date: 'Today', players: 3, maxPlayers: 4 },
    { id: 2, sport: 'Basketball', time: '6:30 PM', date: 'Tomorrow', players: 7, maxPlayers: 10 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{centerName}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="book" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="book">Book a Court</TabsTrigger>
            <TabsTrigger value="join">Join a Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Select Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {availableDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    className="rounded-full text-sm whitespace-nowrap"
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                Select Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-1.5" />
                Create Team
              </h3>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Your Team</p>
                      <p className="text-sm text-muted-foreground">1/4 players joined</p>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Invite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="join" className="space-y-4">
            <h3 className="text-sm font-medium mb-2">Available Teams</h3>
            
            {openTeams.map((team) => (
              <Card key={team.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <Badge>{team.sport}</Badge>
                        <span className="text-sm ml-2 text-muted-foreground">{team.date}, {team.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{team.players}/{team.maxPlayers} players</span>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {openTeams.length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No teams available at this center</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button 
            className="w-full" 
            disabled={selectedTab === 'book' ? !(selectedDate && selectedTime) : false}
          >
            {selectedTab === 'book' ? 'Complete Booking' : 'Find More Teams'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
