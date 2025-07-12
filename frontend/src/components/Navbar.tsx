import React from 'react';

const Navbar = () => {
  return (
    <div className='p-2'>
      <div className='rounded-lg shadow-md my-4 p-4 bg-orange-500 text-white '>
        <div className='flex items-center justify-between'>
          <span>Skill-Swap</span>
          <span>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
