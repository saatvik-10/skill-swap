'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface NotificationUser {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  skillsOffered: string[];
  skillsWanted: string[];
  status: 'pending' | 'accepted' | 'rejected';
}

const initialNotifications: NotificationUser[] = [
  {
    id: '1',
    name: 'Marc Demo',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 3.9,
    timeAgo: '2 hours ago',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
    status: 'pending',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4.7,
    timeAgo: '4 hours ago',
    skillsOffered: ['React', 'TypeScript'],
    skillsWanted: ['UI/UX Design'],
    status: 'accepted',
  },
  {
    id: '3',
    name: 'Ali Khan',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4.1,
    timeAgo: '1 day ago',
    skillsOffered: ['Python'],
    skillsWanted: ['SQL'],
    status: 'rejected',
  },
];

type TabStatus = 'all' | 'pending' | 'accepted' | 'rejected';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabStatus>('all');
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleAccept = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'accepted' } : notif
      )
    );
  };

  const handleReject = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'rejected' } : notif
      )
    );
  };

  const filteredNotifications =
    activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.status === activeTab);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Notification Center
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {(['all', 'pending', 'accepted', 'rejected'] as TabStatus[]).map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium border-b-2 rounded-none ${
              activeTab === tab
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No {activeTab !== 'all' ? activeTab : 'notifications'} found.
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredNotifications.map((notification) => (
            <li
              key={notification.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>
                    {notification.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {notification.name}
                      </h2>
                      <div className="flex items-center text-sm text-gray-600 mt-1 gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {notification.rating}/5
                        </div>
                        <span>•</span>
                        <span>{notification.timeAgo}</span>
                      </div>
                    </div>
                    <Badge
                      className={
                        notification.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : notification.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {notification.status.charAt(0).toUpperCase() +
                        notification.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-500">Skills Offered:</span>
                      {notification.skillsOffered.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-green-100 text-green-800 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-500">Skills Wanted:</span>
                      {notification.skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-blue-100 text-blue-800 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Show Accept/Reject for pending only */}
                  {notification.status === 'pending' && (
                    <div className="mt-4 flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-800 text-green-800 hover:text-green-800 hover:bg-green-100"
                        onClick={() => handleAccept(notification.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-800 text-red-800 hover:text-red-800 hover:bg-red-100"
                        onClick={() => handleReject(notification.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
