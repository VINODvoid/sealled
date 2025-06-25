"use client"
import { FolderLock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { IoLogoGithub } from 'react-icons/io'
import { Button } from './ui/button'

const Navbar = () => {
  return (
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-transparent backdrop-blur-lg backdrop-opacity-100 transition-all duration-300 shadow-md">
          <div className="flex flex-cols items-center justify-between">
            
            <h1 className="font-extrabold text-gray-950 text-4xl flex items-center gap-2">
              <FolderLock className="w-8 h-8 m-2" />
              Sealled
            </h1>

            <Link
              href="https://github.com/VINODvoid/sealled"
              passHref
              target="_blank"
            >
              <Button variant={"outline"}>
                Star on GitHub{" "}
                <span className="p-2">
                  <IoLogoGithub />
                </span>
              </Button>
            </Link>
          </div>
        </nav>
  )
}

export default Navbar
