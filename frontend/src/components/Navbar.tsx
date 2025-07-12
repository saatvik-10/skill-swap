'use client';

import { useState } from 'react';
import { Home, Bell, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import Link from 'next/link';
import NotificationModal from './notificationModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
              <Users className='h-5 w-5 text-white' />
            </div>
            <Link href={'/'} className='text-xl font-bold text-gray-900'>
              SkillSwap
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center'>
            <Link
              href='/'
              className='flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors'
            >
              <Home className='h-4 w-4' />
              <span>Home</span>
            </Link>
            <NotificationModal />
          </nav>

          {/* User Profile Section */}
          <div className='hidden md:flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200'>
            <Link href={'/profile'}>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <User className='h-4 w-4 text-blue-500' />
                </div>
                <span className='text-gray-700 font-medium'>John Doe</span>
              </div>
            </Link>
            <Button
              variant='outline'
              size='sm'
              className='bg-red-500 text-white hover:bg-red-600 cursor-pointer hover:text-white'
            >
              Log out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant={'outline'}
            className='md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors'
            onClick={toggleMobileMenu}
            aria-label='Toggle mobile menu'
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden mt-4 pb-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200 px-4'>
          <div className='flex flex-col space-y-4 pt-4'>
            <Link
              href='/'
              className='flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className='h-5 w-5' />
              <span>Home</span>
            </Link>
            <Link
              href='/notification'
              className='flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bell className='h-5 w-5' />
              <span>Notifications</span>
              <div className='w-2 h-2 bg-red-500 rounded-full'></div>
            </Link>

            {/* Mobile User Profile */}
            <div className='flex items-center space-x-3 pt-2 border-t border-gray-100'>
              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                <User className='h-4 w-4 text-blue-500' />
              </div>
              <span className='text-gray-700 font-medium'>John Doe</span>
            </div>
            <div className='flex space-x-2 w-full'>
              <Link
                href={'/profile'}
                className='flex-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-white flex items-center justify-center'
              >
                Profile
              </Link>
              <Button
                variant='outline'
                size='sm'
                className='flex-1 bg-red-500 text-white'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
