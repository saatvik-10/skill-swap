import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className='bg-gray-900 text-white'>
        <div className='container py-3 flex items-center justify-center'>
          <div className='border-t border-gray-800 text-center text-gray-400'>
            <p>
              &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
