
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import UserCard, { UserCardProps } from '@/components/social/UserCard';
import MotionWrapper from '@/components/shared/MotionWrapper';

const Social = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<Omit<UserCardProps, 'onToggleFollow' | 'onViewProfile'>[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'New York, NY',
      sports: ['Tennis', 'Basketball'],
      isFollowing: false
    },
    {
      id: 2,
      name: 'Sarah Williams',
      username: 'sarahw',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: 'Los Angeles, CA',
      sports: ['Tennis', 'Swimming'],
      isFollowing: true
    },
    {
      id: 3,
      name: 'Michael Brown',
      username: 'mikeb',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      location: 'Chicago, IL',
      sports: ['Basketball', 'Soccer'],
      isFollowing: false
    },
    {
      id: 4,
      name: 'Emma Davis',
      username: 'emmad',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      location: 'Boston, MA',
      sports: ['Swimming', 'Volleyball'],
      isFollowing: true
    }
  ]);
  
  const handleToggleFollow = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing } 
        : user
    ));
  };
  
  const handleViewProfile = (userId: number) => {
    navigate(`/profile/${userId}`);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.sports.some(sport => sport.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const followingUsers = filteredUsers.filter(user => user.isFollowing);

  // Activity content
  const activities = [
    {
      id: 1,
      user: { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      action: 'joined a basketball game',
      location: 'Downtown Sports Center',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: { name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      action: 'created a tennis match',
      location: 'Elite Tennis Academy',
      time: 'Yesterday'
    },
    {
      id: 3,
      user: { name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      action: 'is looking for players',
      location: 'Riverside Sports Complex',
      time: '2 days ago'
    }
  ];

  return (
    <AppLayout>
      <MotionWrapper>
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users by name or sport" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="people">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="people">
              <UserPlus className="h-4 w-4 mr-2" />
              People
            </TabsTrigger>
            <TabsTrigger value="following">
              <Users className="h-4 w-4 mr-2" />
              Following
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="people" className="space-y-4">
            {filteredUsers.map((user) => (
              <MotionWrapper key={user.id} delay={100 * user.id} animation="scale-in">
                <UserCard 
                  {...user}
                  onToggleFollow={handleToggleFollow}
                  onViewProfile={handleViewProfile}
                />
              </MotionWrapper>
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="following" className="space-y-4">
            {followingUsers.map((user) => (
              <MotionWrapper key={user.id} delay={100 * user.id} animation="scale-in">
                <UserCard 
                  {...user}
                  onToggleFollow={handleToggleFollow}
                  onViewProfile={handleViewProfile}
                />
              </MotionWrapper>
            ))}
            
            {followingUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You aren't following anyone yet</p>
                <Button 
                  className="mt-4"
                  onClick={() => document.querySelector('[value="people"]')?.dispatchEvent(new Event('click'))}
                >
                  Discover People
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="space-y-4">
              {activities.map((activity) => (
                <MotionWrapper key={activity.id} delay={100 * activity.id} animation="scale-in">
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex">
                      <div 
                        className="w-10 h-10 rounded-full bg-cover bg-center mr-3"
                        style={{ backgroundImage: `url(${activity.user.avatar})` }}
                      />
                      <div>
                        <p>
                          <span className="font-medium">{activity.user.name}</span>
                          {' '}{activity.action}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          <span>{activity.location}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </MotionWrapper>
    </AppLayout>
  );
};

export default Social;
