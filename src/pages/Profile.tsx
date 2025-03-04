
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Medal, Settings, User, MessageCircle, UserPlus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/components/layout/AppLayout';
import MotionWrapper from '@/components/shared/MotionWrapper';

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('activities');
  
  // Determine if this is viewing own profile or another user's
  const isOwnProfile = !userId;
  
  // Mock user data
  const userData = isOwnProfile ? {
    id: 0,
    name: 'Your Name',
    username: 'yourname',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    location: 'San Francisco, CA',
    bio: 'Tennis and basketball enthusiast. Looking for regular games and new teammates.',
    sports: ['Tennis', 'Basketball'],
    level: 'Intermediate',
    followers: 24,
    following: 36,
    isFollowing: false
  } : {
    id: parseInt(userId as string),
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'New York, NY',
    bio: 'Tennis player looking for doubles partners. Also enjoy basketball on weekends.',
    sports: ['Tennis', 'Basketball'],
    level: 'Advanced',
    followers: 64,
    following: 42,
    isFollowing: true
  };
  
  // Mock activities
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Tennis Match',
      location: 'Downtown Sports Club',
      date: 'Tomorrow, 5:00 PM',
      participants: 3,
      maxParticipants: 4
    },
    {
      id: 2,
      type: 'past',
      title: 'Basketball Game',
      location: 'Riverside Sports Complex',
      date: 'Last Monday, 7:00 PM',
      result: 'Won'
    },
    {
      id: 3,
      type: 'past',
      title: 'Tennis Practice',
      location: 'Elite Tennis Academy',
      date: 'Last Saturday, 10:00 AM'
    }
  ];
  
  // Mock stats
  const stats = [
    { label: 'Matches Played', value: 27 },
    { label: 'Win Rate', value: '68%' },
    { label: 'MVP Awards', value: 3 }
  ];

  return (
    <AppLayout>
      <MotionWrapper className="space-y-6">
        {/* Profile header */}
        <div className="relative">
          {/* Background banner */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg" />
          
          {/* Profile info card - positioned to overlap the banner */}
          <Card className="relative -mt-16 mx-4">
            <CardContent className="pt-0">
              <div className="flex flex-col items-center -mt-12 sm:flex-row sm:items-end sm:justify-between">
                {/* Avatar */}
                <div className="flex flex-col items-center sm:flex-row sm:items-end">
                  <div 
                    className="w-24 h-24 rounded-full border-4 border-background bg-cover bg-center"
                    style={{ backgroundImage: `url(${userData.avatar})` }}
                  />
                  
                  {/* Name and details */}
                  <div className="mt-2 text-center sm:text-left sm:ml-4 sm:mb-2">
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-muted-foreground">@{userData.username}</p>
                    
                    {userData.location && (
                      <div className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{userData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-4 sm:mt-0">
                  {isOwnProfile ? (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-1" />
                        {userData.isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Bio section */}
              <div className="mt-6">
                <p className="text-sm">{userData.bio}</p>
              </div>
              
              {/* Sports and level */}
              <div className="mt-4 flex flex-wrap gap-2">
                {userData.sports.map((sport) => (
                  <Badge key={sport} variant="secondary">
                    {sport}
                  </Badge>
                ))}
                <Badge className="bg-primary/10 text-primary border-primary/20">{userData.level}</Badge>
              </div>
              
              {/* Stats row */}
              <div className="mt-6 flex justify-around py-3 border-t border-b">
                <div className="text-center">
                  <p className="font-semibold">{userData.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{userData.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{activities.length}</p>
                  <p className="text-xs text-muted-foreground">Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="activities">
              <Calendar className="h-4 w-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Medal className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={!isOwnProfile}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="space-y-4 pt-4">
            {activities.map((activity) => (
              <MotionWrapper key={activity.id} delay={100 * activity.id} animation="scale-in">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.location}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{activity.date}</span>
                        </div>
                      </div>
                      <div>
                        {activity.type === 'booking' && (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1" />
                              <span>{activity.participants}/{activity.maxParticipants}</span>
                            </div>
                            <Button className="mt-2" size="sm">Details</Button>
                          </div>
                        )}
                        {activity.type === 'past' && activity.result && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {activity.result}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </TabsContent>
          
          <TabsContent value="stats" className="pt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Performance Stats</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <MotionWrapper 
                      key={stat.label} 
                      delay={100 * index} 
                      animation="scale-in"
                      className="text-center p-4 bg-secondary rounded-lg"
                    >
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </MotionWrapper>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Recent Achievements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Medal className="h-4 w-4 mr-2 text-yellow-500" />
                      MVP in Downtown Basketball Tournament
                    </li>
                    <li className="flex items-center text-sm">
                      <Medal className="h-4 w-4 mr-2 text-blue-500" />
                      5-game winning streak in Tennis singles
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            {isOwnProfile ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
                  <p className="text-muted-foreground">Account settings would be displayed here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You can only view your own settings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </MotionWrapper>
    </AppLayout>
  );
};

export default Profile;
