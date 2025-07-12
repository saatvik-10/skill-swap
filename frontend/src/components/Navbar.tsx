import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className='rounded-lg shadow-md my-6 p-4 bg-blue-500 text-white '>
        <div className='flex items-center justify-between'>
          <span className='font-bold'>Skill-Swap</span>
          <span className='bg-white text-blue-500 py-1 px-2 rounded-lg'>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
