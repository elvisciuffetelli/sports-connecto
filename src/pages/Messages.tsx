
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ConversationList, { Conversation } from '@/components/messages/ConversationList';
import ChatInterface from '@/components/messages/ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';
import MotionWrapper from '@/components/shared/MotionWrapper';

const Messages = () => {
  const isMobile = useIsMobile();
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Hey, want to join my tennis match tomorrow?',
      time: '10:35 AM',
      unread: true
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'Great game yesterday! We should play again soon.',
      time: 'Yesterday',
      unread: false
    },
    {
      id: 3,
      name: 'Basketball Group',
      avatar: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=100',
      lastMessage: "Michael: I'll bring an extra ball just in case",
      time: 'Mon',
      unread: false
    }
  ]);
  
  const handleSelectConversation = (id: number) => {
    setSelectedConversationId(id);
    
    // Mark as read
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, unread: false } : conv
    ));
  };
  
  const handleBack = () => {
    setSelectedConversationId(null);
  };
  
  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  // For mobile: show either conversation list or chat
  // For desktop: show both side by side
  return (
    <AppLayout>
      <div className="h-[calc(100vh-10rem)]">
        {isMobile ? (
          selectedConversationId && selectedConversation ? (
            <MotionWrapper animation="slide-in-right" className="h-full">
              <ChatInterface 
                conversation={selectedConversation}
                onBack={handleBack}
                isMobile={true}
              />
            </MotionWrapper>
          ) : (
            <MotionWrapper className="h-full">
              <ConversationList 
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
              />
            </MotionWrapper>
          )
        ) : (
          <div className="grid grid-cols-3 h-full border rounded-lg overflow-hidden">
            <div className="border-r">
              <ConversationList 
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
              />
            </div>
            <div className="col-span-2">
              {selectedConversation ? (
                <ChatInterface 
                  conversation={selectedConversation}
                  onBack={handleBack}
                  isMobile={false}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-secondary/20">
                  <div className="text-center">
                    <p className="text-muted-foreground">Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
