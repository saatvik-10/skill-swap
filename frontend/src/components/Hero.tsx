import {
  Search,
  Users,
  Star,
  MessageCircle,
  Calendar,
  Shield,
} from 'lucide-react';
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
// import Navbar from "@/components/navbar"

export default function SkillSwapLanding() {
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

  const features = [
    {
      icon: <Users className='h-8 w-8 text-blue-600' />,
      title: 'Smart Matching',
      description:
        'Our AI-powered algorithm connects you with the perfect skill exchange partners based on your interests and availability.',
    },
    {
      icon: <MessageCircle className='h-8 w-8 text-green-600' />,
      title: 'Secure Communication',
      description:
        'Built-in messaging system with video calls, file sharing, and progress tracking to ensure smooth collaboration.',
    },
    {
      icon: <Calendar className='h-8 w-8 text-purple-600' />,
      title: 'Flexible Scheduling',
      description:
        'Coordinate sessions with integrated calendar sync and automated reminders for both parties.',
    },
    {
      icon: <Shield className='h-8 w-8 text-orange-600' />,
      title: 'Verified Profiles',
      description:
        'All users go through verification process with skill assessments and community reviews for trust and quality.',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Header */}

      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto text-center max-w-4xl'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
            Learn New Skills by
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              {' '}
              Teaching Others
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Connect with like-minded learners, exchange skills, and grow
            together. From coding to cooking, find your perfect learning partner
            today.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>
            Find Your Perfect Skill Match
          </h2>

          <div className='flex flex-col sm:flex-row gap-4 mb-8'>
            <div className='flex-1'>
              <Input
                placeholder='Search for skills (e.g., JavaScript, Photography, Guitar)'
                className=' text-base sm:text-lg'
              />
            </div>
            <Select>
              <SelectTrigger className='w-full sm:w-48 h-12'>
                <SelectValue placeholder='Availability' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Users</SelectItem>
                <SelectItem value='available'>Available Now</SelectItem>
                <SelectItem value='this-week'>This Week</SelectItem>
                <SelectItem value='flexible'>Flexible</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size='sm'
              className='px-6 sm:px-8 bg-blue-500 hover:bg-blue-600'
            >
              <Search className='h-5 w-5 mr-2' />
              Search
            </Button>
          </div>

          {/* User Cards */}
          <div className='space-y-6'>
            {users.map((user) => (
              <Card
                key={user.id}
                className='hover:shadow-lg transition-all duration-300 border-0 shadow-md'
              >
                <CardContent className='p-4 sm:p-6 lg:p-8'>
                  {/* Mobile Layout */}
                  <div className='block lg:hidden'>
                    <div className='flex flex-col items-center text-center space-y-4'>
                      <Image
                        src={user.avatar || '/placeholder.svg'}
                        alt={user.name}
                        width={80}
                        height={80}
                        className='rounded-full ring-4 ring-blue-50'
                      />

                      <div className='w-full'>
                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                          {user.name}
                        </h3>

                        <div className='flex items-center justify-center space-x-3 mb-3'>
                          <Badge
                            variant={
                              user.availability === 'Available'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              user.availability === 'Available'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : ''
                            }
                          >
                            {user.availability}
                          </Badge>
                          <div className='flex items-center space-x-1'>
                            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                            <span className='font-medium text-gray-900'>
                              {user.rating}
                            </span>
                          </div>
                        </div>

                        <p className='text-gray-600 mb-4 flex items-center justify-center'>
                          <span className='w-2 h-2 bg-gray-400 rounded-full mr-2'></span>
                          {user.location}
                        </p>

                        <div className='space-y-4 mb-6'>
                          <div>
                            <span className='text-sm font-medium text-green-700 block mb-2 text-center'>
                              Skills Offered
                            </span>
                            <div className='flex flex-wrap gap-2 justify-center'>
                              {user.skillsOffered.map((skill) => (
                                <Badge
                                  key={skill}
                                  className='bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-xs'
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className='text-sm font-medium text-amber-700 block mb-2 text-center'>
                              Skills Wanted
                            </span>
                            <div className='flex flex-wrap gap-2 justify-center'>
                              {user.skillsWanted.map((skill) => (
                                <Badge
                                  key={skill}
                                  className='bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs'
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-base font-medium w-full'>
                          Send Request
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className='hidden lg:flex lg:items-center lg:justify-between'>
                    <div className='flex items-center space-x-6'>
                      <Image
                        src={user.avatar || '/placeholder.svg'}
                        alt={user.name}
                        width={80}
                        height={80}
                        className='rounded-full ring-4 ring-blue-50'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center space-x-4 mb-3'>
                          <h3 className='text-2xl font-semibold text-gray-900'>
                            {user.name}
                          </h3>
                          <Badge
                            variant={
                              user.availability === 'Available'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              user.availability === 'Available'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : ''
                            }
                          >
                            {user.availability}
                          </Badge>
                          <div className='flex items-center space-x-1'>
                            <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                            <span className='font-medium text-gray-900'>
                              {user.rating}
                            </span>
                          </div>
                        </div>

                        <p className='text-gray-600 mb-4 flex items-center'>
                          <span className='w-2 h-2 bg-gray-400 rounded-full mr-2'></span>
                          {user.location}
                        </p>

                        <div className='flex items-center space-x-8'>
                          <div className='flex-1'>
                            <span className='text-sm font-medium text-green-700 block mb-2'>
                              Skills Offered
                            </span>
                            <div className='flex flex-wrap gap-2'>
                              {user.skillsOffered.map((skill) => (
                                <Badge
                                  key={skill}
                                  className='bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className='flex-1'>
                            <span className='text-sm font-medium text-amber-700 block mb-2'>
                              Skills Wanted
                            </span>
                            <div className='flex flex-wrap gap-2'>
                              {user.skillsWanted.map((skill) => (
                                <Badge
                                  key={skill}
                                  className='bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='ml-6'>
                      <Button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-medium'>
                        Send Request
                      </Button>
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

      {/* Features Section */}
      <section id='features' className='py-20 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Why Choose SkillSwap?
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              We&apos;ve built the most comprehensive platform for skill exchange
              with features designed to make learning collaborative and
              effective.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='text-center p-6 hover:shadow-lg transition-shadow'
              >
                <CardContent className='pt-6'>
                  <div className='flex justify-center mb-4'>{feature.icon}</div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                  <Users className='h-5 w-5 text-white' />
                </div>
                <span className='text-xl font-bold'>SkillSwap</span>
              </div>
              <p className='text-gray-400'>
                Connecting learners worldwide through skill exchange.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Platform</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    How it Works
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Browse Skills
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Company</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
