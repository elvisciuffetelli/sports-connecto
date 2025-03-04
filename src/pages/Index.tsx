
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';
import MotionWrapper from '@/components/shared/MotionWrapper';

const Index = () => {
  // Mock upcoming event data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tennis Match',
      location: 'Central Park Courts',
      time: 'Today, 5:00 PM',
      participants: 3,
      maxParticipants: 4
    },
    {
      id: 2,
      title: 'Basketball Game',
      location: 'Downtown Sports Center',
      time: 'Tomorrow, 7:00 PM',
      participants: 8,
      maxParticipants: 10
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <section className="mb-8">
          <MotionWrapper>
            <h1 className="text-3xl font-bold mb-2">Welcome to SportsConnect</h1>
            <p className="text-muted-foreground">Find sports centers, teammates, and matches near you</p>
          </MotionWrapper>
        </section>

        {/* Quick actions */}
        <MotionWrapper delay={100}>
          <section className="grid grid-cols-2 gap-4 mb-8">
            <Link to="/discover">
              <Card className="card-hover h-32">
                <CardContent className="flex flex-col items-center justify-center h-full p-4">
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <span className="text-center font-medium">Find Venues</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/social">
              <Card className="card-hover h-32">
                <CardContent className="flex flex-col items-center justify-center h-full p-4">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <span className="text-center font-medium">Find Players</span>
                </CardContent>
              </Card>
            </Link>
          </section>
        </MotionWrapper>

        {/* Upcoming events */}
        <MotionWrapper delay={200}>
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Link to="/discover" className="text-primary text-sm">View all</Link>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="card-hover overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.participants}/{event.maxParticipants}</span>
                        </div>
                        <Button className="mt-2" size="sm">Join</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events</p>
                  <Button className="mt-4">Create Event</Button>
                </div>
              )}
            </div>
          </section>
        </MotionWrapper>

        {/* Activity feed */}
        <MotionWrapper delay={300}>
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Link to="/social" className="text-primary text-sm">View all</Link>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="divide-y">
                <div className="py-3 px-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary mr-3"></div>
                    <div>
                      <p><span className="font-medium">Alex Johnson</span> joined your tennis match</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="py-3 px-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary mr-3"></div>
                    <div>
                      <p><span className="font-medium">Sarah Williams</span> followed you</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </MotionWrapper>
      </div>
    </AppLayout>
  );
};

export default Index;
