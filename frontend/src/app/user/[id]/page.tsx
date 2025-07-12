'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar } from 'lucide-react';
import RequestModal from '@/components/RequestModal';
import { Button } from '@/components/ui/button';

const user = {
  name: 'Marc Demo',
  location: 'San Francisco, CA',
  avatar: '/placeholder.svg',
  bio: 'Passionate about teaching and learning new skills. Always open to collaboration!',
  skillsOffered: ['JavaScript', 'Python', 'React'],
  skillsWanted: ['Photoshop', 'Graphic Design'],
  rating: 4.8,
  availability: 'Available',
};

export default function UserProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 flex items-center justify-center'>
      <div className='w-full max-w-5xl min-w-[64rem] mx-auto'>
        <div className='relative rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-slate-200 overflow-hidden'>
          <div
            className='absolute inset-0 pointer-events-none z-0'
            style={{
              background:
                'radial-gradient(circle at 20% 40%, #a5b4fc33 0%, transparent 70%), radial-gradient(circle at 80% 60%, #fbbf2433 0%, transparent 70%)',
            }}
          />
          <div className='relative z-10 p-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='flex-shrink-0 flex flex-col items-center md:items-start gap-4'>
                {/* ...avatar... */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  width={120}
                  height={120}
                  className='rounded-full ring-8 ring-blue-200 shadow-xl object-cover border-4 border-white'
                />
                <h1 className='text-3xl font-extrabold text-gray-900'>{user.name}</h1>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <MapPin className='h-4 w-4' />
                  {user.location}
                </div>
                <p className='text-gray-700 text-center md:text-left'>{user.bio}</p>
                <div className='flex items-center gap-4'>
                  <Badge
                    variant={user.availability === 'Available' ? 'default' : 'secondary'}
                    className={
                      user.availability === 'Available'
                        ? 'bg-green-100 text-green-800 border-green-200 px-2 py-1'
                        : 'bg-gray-100 text-gray-600 border-gray-200 px-2 py-1'
                    }
                  >
                    {user.availability}
                  </Badge>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-bold text-gray-900'>{user.rating}</span>
                  </div>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Calendar className='h-4 w-4' /> Available for swap
                  </div>
                </div>
              </div>
              <div className='flex-1 flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* ...skills offered and wanted... */}
                  <div>
                    <h3 className='text-xs font-bold text-green-700 mb-2 uppercase tracking-wide'>Skills Offered</h3>
                    <div className='flex flex-wrap gap-2'>
                      {user.skillsOffered.map(skill => (
                        <Badge key={skill} className='bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold shadow-sm'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className='text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide'>Skills Wanted</h3>
                    <div className='flex flex-wrap gap-2'>
                      {user.skillsWanted.map(skill => (
                        <Badge key={skill} className='bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold shadow-sm'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <Button
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-150'
                    onClick={() => setModalOpen(true)}
                  >
                    Send a Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RequestModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          skillsOffered={user.skillsOffered}
          skillsWanted={user.skillsWanted}
        />
      </div>
    </div>
  );
}
