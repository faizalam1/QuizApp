import Link from "next/link";
import Image from "next/image";
import NavMobile from "./NavMobile";
import SignoutButton from "./SignoutButton";
import { getServerSession } from "next-auth";

const Nav = async () => {
  const session = await getServerSession();

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={160}
          height={37.63}
          className='object-contain'
        />
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/courses' className='black_btn'>
              Courses
            </Link>

            <SignoutButton />

            <Link href='/profile'>
              <Image
                src="/assets/icons/profile-circle.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
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

      {/* Mobile Navigation */}
      <NavMobile session={session} />
    </nav>
  );
};

export default Nav;
