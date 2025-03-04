
import React, { useState } from 'react';
import { Send, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Conversation } from './ConversationList';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  conversation: Conversation;
  onBack: () => void;
  isMobile: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversation, onBack, isMobile }) => {
  const [newMessage, setNewMessage] = useState('');
  
  // Mock messages for the selected conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: conversation.id, // From the other person
      text: "Hey, want to join my tennis match tomorrow?",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      senderId: 0, // From current user
      text: "Sure, what time and where?",
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      senderId: conversation.id,
      text: "At Downtown Sports Club, 5 PM. We need one more player.",
      timestamp: "10:35 AM"
    }
  ]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          senderId: 0, // Current user
          text: newMessage.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center bg-card border-b p-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div 
          className="w-10 h-10 rounded-full bg-cover bg-center mr-3"
          style={{ backgroundImage: `url(${conversation.avatar})` }}
        />
        
        <div className="flex-1">
          <h3 className="font-medium">{conversation.name}</h3>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-xl p-3 ${
                message.senderId === 0 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-secondary rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block text-right">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggested quick responses */}
      <div className="p-2 border-t flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Calendar className="h-3 w-3 mr-1" /> Invite to game
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <MapPin className="h-3 w-3 mr-1" /> Share location
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Yes, I'm interested
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          What time?
        </Button>
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t flex items-center gap-2">
        <Input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button 
          disabled={!newMessage.trim()} 
          onClick={handleSendMessage}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
