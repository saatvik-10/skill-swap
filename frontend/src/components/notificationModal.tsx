'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bell, Star } from 'lucide-react';
import Link from 'next/link';

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

const mockNotifications: NotificationUser[] = [
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
    status: 'pending',
  },
];

export default function NotificationModal() {
  const [activeTab, setActiveTab] = useState<
    'pending' | 'all' | 'accepted' | 'rejected'
  >('pending');
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleAccept = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'accepted' as const } : notif
      )
    );
  };

  const handleReject = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'rejected' as const } : notif
      )
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'all') return true;
    return notif.status === activeTab;
  });

  const pendingCount = notifications.filter(
    (n) => n.status === 'pending'
  ).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='text-gray-600 hover:text-gray-900 transition-colors hover:bg-transparent cursor-pointer relative'
        >
          <Bell className='h-5 w-5' />
          <span className='-ml-1'>Notification</span>
          {pendingCount > 0 && (
            <Badge className='absolute -top-0.5 -right-1 h-2 w-2 rounded-full p-0 flex items-center justify-center text-xs bg-red-500'></Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md p-0 gap-0 bg-gray-50 shadow-md'>
        <DialogHeader className='p-6 pb-4 border-b'>
          <DialogTitle className='text-xl font-semibold'>
            Skill Swap Notifications
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className='flex border-b bg-gray-50'>
          {[
            {
              key: 'pending' as const,
              label: `Pending${pendingCount > 0 ? ` (${pendingCount})` : ''}`,
            },
            { key: 'all' as const, label: 'All' },
            { key: 'accepted' as const, label: 'Accepted' },
            { key: 'rejected' as const, label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className='max-h-96 overflow-y-auto'>
          {filteredNotifications.length === 0 ? (
            <div className='p-8 text-center text-gray-500'>
              <Bell className='h-12 w-12 mx-auto mb-3 text-gray-300' />
              <p>No notifications in this category</p>
            </div>
          ) : (
            <div className='p-4 space-y-4'>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className='bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow'
                >
                  <div className='flex items-start gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={notification.avatar || '/placeholder.svg'}
                        alt={notification.name}
                      />
                      <AvatarFallback>
                        {notification.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold text-gray-900'>
                          {notification.name}
                        </h4>
                        <Badge
                          variant={
                            notification.status === 'pending'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            notification.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : ''
                          }
                        >
                          {notification.status.charAt(0).toUpperCase() +
                            notification.status.slice(1)}
                        </Badge>
                      </div>

                      <div className='flex items-center gap-2 mb-3 text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                          <span>{notification.rating}/5</span>
                        </div>
                        <span>•</span>
                        <span>{notification.timeAgo}</span>
                      </div>

                      <div className='space-y-2 mb-3'>
                        <div className='flex items-center gap-2 text-sm'>
                          <span className='text-gray-600'>Skills Offered:</span>
                          <div className='flex gap-1'>
                            {notification.skillsOffered.map((skill) => (
                              <Badge
                                key={skill}
                                variant='secondary'
                                className='bg-green-100 text-green-800 text-xs'
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                          <span className='text-gray-600'>Skills Wanted:</span>
                          <div className='flex gap-1'>
                            {notification.skillsWanted.map((skill) => (
                              <Badge
                                key={skill}
                                variant='secondary'
                                className='bg-blue-100 text-blue-800 text-xs'
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {notification.status === 'pending' && (
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            onClick={() => handleAccept(notification.id)}
                            variant={'outline'}
                            className='border-green-800 text-green-800 hover:text-green-800 hover:bg-green-100'
                          >
                            Accept
                          </Button>
                          <Button
                            size='sm'
                            className='border-red-800 text-red-800 hover:text-red-800 hover:bg-red-100'
                            variant={'outline'}
                            onClick={() => handleReject(notification.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show More Link */}
        <div className='p-4 border-t bg-gray-50'>
          <Link href='/notifications' className='block'>
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50'
            >
              Show more...
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
