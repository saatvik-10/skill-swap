import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  skillsOffered: string[];
  skillsWanted: string[];
}

export default function RequestModal({
  open,
  onClose,
  skillsOffered,
  skillsWanted,
}: RequestModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md mx-auto rounded-xl p-6 bg-white shadow-xl'>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold text-gray-900 mb-2'>
            Send a Skill Swap Request
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Skill Offered
            </label>
            <select className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'>
              {skillsOffered.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Skill Required
            </label>
            <select className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200'>
              {skillsWanted.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Message
            </label>
            <textarea
              className='w-full border rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100'
              placeholder='Write a message...'
            />
          </div>
        </div>
        <DialogFooter className='mt-4 flex justify-end'>
          <Button
            onClick={onClose}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
