import { FolderLock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 px-4 py-2 bg-transparent backdrop-blur-lg backdrop-opacity-100 transition-all duration-300 shadow-md'>
        <div className='flex flex-col items-center justify-between'>
            <div className='flex flex-row items-center '>
            <FolderLock size={42} className='mx-41'/>
            <span>
            <h1 className='font-extrabold text-gray-950 text-4xl'>Sealled</h1>
            </span>
            </div>
            <Link 
            href="https://github.com/VINODvoid/sealled"
              passHref
              target="_blank"
            >
            
            </Link>
        </div>
    </nav>
  )
}

export default Navbar