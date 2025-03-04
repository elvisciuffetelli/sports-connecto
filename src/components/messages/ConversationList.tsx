
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: number | null;
  onSelectConversation: (id: number) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages" className="pl-9" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {conversations.map((conversation) => (
          <Card 
            key={conversation.id}
            className={cn(
              "rounded-none border-0 border-b cursor-pointer transition-colors",
              selectedConversationId === conversation.id 
                ? "bg-secondary" 
                : "hover:bg-muted"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center shrink-0 relative"
                  style={{ backgroundImage: `url(${conversation.avatar})` }}
                >
                  {conversation.unread && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {conversation.time}
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-sm truncate mt-1",
                    conversation.unread ? "font-medium" : "text-muted-foreground"
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
