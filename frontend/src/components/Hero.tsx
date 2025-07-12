'use client';

import { Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// interface User {
//   id: number;
//   name: string;
//   skillsOffered: string[];
//   skillsWanted: string[];
//   rating: number;
//   profilePhotoUrl?: string;
//   availability: 'Available' | 'Busy';
//   location: string;
// }

export default function SkillSwapLanding() {
  const route = useRouter();

  const users = [
    {
      id: 1,
      name: 'Marc Demo',
      avatar: '/placeholder.svg?height=80&width=80',
      skillsOffered: ['JavaScript', 'Python', 'React'],
      skillsWanted: ['Photoshop', 'Graphic Design'],
      rating: 4.8,
      availability: 'Available',
      location: 'San Francisco, CA',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=80&width=80',
      skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      skillsWanted: ['Node.js', 'Database Design'],
      rating: 4.9,
      availability: 'Available',
      location: 'New York, NY',
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg?height=80&width=80',
      skillsOffered: ['Data Science', 'Machine Learning', 'Python'],
      skillsWanted: ['Mobile Development', 'Swift'],
      rating: 4.7,
      availability: 'Busy',
      location: 'Austin, TX',
    },
    {
      id: 4,
      name: 'Emily Johnson',
      avatar: '/placeholder.svg?height=80&width=80',
      skillsOffered: ['Content Writing', 'SEO', 'Marketing'],
      skillsWanted: ['Web Development', 'CSS'],
      rating: 4.6,
      availability: 'Available',
      location: 'Seattle, WA',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto text-center max-w-4xl'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
            Trade Talents &
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              {' '}
              Team Up
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            One-stop hub to connect with like-minded creators, form the perfect
            team, and bring your ideas to life—together. Whether you code,
            design, write, or strategize, there&apos;s a teammate waiting for
            you.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className='py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>
            Find Your Perfect Skill Match
          </h2>

          <div className='flex flex-col sm:flex-row gap-4 mb-8'>
            <div className='flex-1'>
              <Input
                placeholder='Search for skills (e.g., JavaScript, Photography, Guitar)'
                className=' text-base sm:text-lg text-blue-500 bg-white'
              />
            </div>
            <Select>
              <SelectTrigger className='w-full sm:w-48 h-12 text-blue-500 bg-white'>
                <SelectValue placeholder='Availability' />
              </SelectTrigger>
              <SelectContent className='text-blue-500 bg-white'>
                <SelectItem value='all'>All Users</SelectItem>
                <SelectItem value='available'>Available Now</SelectItem>
                <SelectItem value='this-week'>This Week</SelectItem>
                <SelectItem value='flexible'>Flexible</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size='sm'
              className='px-6 sm:px-8 bg-blue-500 hover:bg-blue-600 cursor-pointer'
            >
              <Search className='h-5 w-5 mr-1' />
              Search
            </Button>
          </div>

          {/* User Cards */}
          <div className='space-y-6 bg-gradient-to-br from-slate-50 to-blue-50'>
            {users.map((user) => (
              <Card
                key={user.id}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm'
              >
                <CardContent className='p-4'>
                  <div className='flex flex-col lg:flex-row items-center lg:items-stretch gap-6'>
                    {/* Avatar & Basic Info */}
                    <div className='flex flex-col items-center justify-center gap-3 lg:w-48'>
                      <div className='relative'>
                        <Image
                          src={user.avatar || '/placeholder.svg'}
                          alt={user.name}
                          width={80}
                          height={80}
                          className='rounded-full ring-4 ring-blue-100 shadow-lg object-cover'
                        />
                        <span
                          className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${user.availability === 'Available' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}
                        ></span>
                      </div>
                      <h3 className='text-lg font-bold text-gray-900'>
                        {user.name}
                      </h3>
                      <p className='text-xs text-gray-500 flex items-center gap-1'>
                        <span className='w-2 h-2 bg-gray-400 rounded-full'></span>
                        {user.location}
                      </p>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant={
                            user.availability === 'Available'
                              ? 'default'
                              : 'secondary'
                          }
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
                          <span className='font-medium text-gray-900'>
                            {user.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Actions */}
                    <div className='flex-1 flex flex-col justify-between gap-4 w-full'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <span className='text-xs font-semibold text-green-700 mb-2 block'>
                            Skills Offered
                          </span>
                          <div className='flex flex-wrap gap-2'>
                            {user.skillsOffered.map((skill) => (
                              <Badge
                                key={skill}
                                className='bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200 px-3 py-1 text-xs font-medium shadow-sm hover:scale-105 transition-transform duration-200'
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className='text-xs font-semibold text-amber-700 mb-2 block'>
                            Skills Wanted
                          </span>
                          <div className='flex flex-wrap gap-2'>
                            {user.skillsWanted.map((skill) => (
                              <Badge
                                key={skill}
                                className='bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 border-amber-200 px-3 py-1 text-xs font-medium shadow-sm hover:scale-105 transition-transform duration-200'
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end mt-4'>
                        <Button
                          onClick={() => route.push(`/user/${user.id}`)}
                          className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-base font-semibold rounded-xl shadow-md'
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center items-center space-x-2 mt-8 text-black'>
            <Button variant='outline' size='sm'>
              Previous
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? 'default' : 'outline'}
                size='sm'
                className='w-10'
              >
                {page}
              </Button>
            ))}
            <Button variant='outline' size='sm'>
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id='how-it-works' className='py-20 px-4 bg-white'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-gray-600'>
              Get started in just three simple steps
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-blue-600'>1</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Create Your Profile
              </h3>
              <p className='text-gray-600'>
                List the skills you can teach and what you want to learn. Add
                your availability and preferences.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-green-600'>2</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Find Your Match
              </h3>
              <p className='text-gray-600'>
                Browse through profiles or let our algorithm suggest perfect
                matches based on your interests.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-purple-600'>3</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Start Learning
              </h3>
              <p className='text-gray-600'>
                Connect with your match, schedule sessions, and begin your skill
                exchange journey together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
