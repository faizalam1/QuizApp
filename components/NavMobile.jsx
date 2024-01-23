"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const NavMobile = ({ session }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
    <div className='sm:hidden flex relative'>
    {session ? (
      <div className='flex'>
        <Image
          src="/assets/icons/profile-circle.svg"
          width={37}
          height={37}
          className='rounded-full'
          alt='profile'
          onClick={() => setToggleDropdown(!toggleDropdown)}
        />

        {toggleDropdown && (
          <div className='dropdown'>
            <Link
              href='/profile'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              My Profile
            </Link>
            <Link
              href='/courses'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              Courses
            </Link>
            <button
              type='button'
              onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}
              className='mt-5 w-full black_btn'
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link href='/auth'>
        <button
          type='button'
          className='black_btn'
        >
          Sign Up / Sign in
        </button>
      </Link>
    )}
  </div>
  )
}

export default NavMobile