import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
function Navbar() {
  return (
    <nav className="bg-purple-200 py-4 w-full fixed top-0 left-0 z-50 border-b border-black">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-black text-xl font-bold">
          Coding Challenge
        </a>
        <div className='flex space-x-4'>
            <a href='/' className='flex items-center text-black bg-purple-200 hover:bg-purple-200 px-4 py-2 rounded'>
            <HomeIcon className= "mr-2"/>
              Home
            </a>
        
            <a href='/aboutUs' className='flex items-center text-black bg-purple-200 hover:bg-purple-200 px-4 py-2 rounded'>
            <InfoIcon className='mr-2'/>
              About
            </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

