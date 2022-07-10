import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useMeQuery } from '../../generated/graphql';

const Header = () => {
  const { data: session, status } = useSession();
  const isUserLoading = status === 'loading';
  const isUserAuthenticated = status === 'authenticated';

  const { data } = useMeQuery({
    skip: isUserLoading || !isUserAuthenticated
  });

  const isAdmin = data?.me?.role === 'ADMIN';

  const user = session?.user;

  return (
    <header className='text-gray-600 body-font'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link href='/'>
          <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <svg
              className='w-10 h-10 text-white p-2 bg-blue-500 rounded-full'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
              ></path>
            </svg>
          </a>
        </Link>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          {user && isAdmin && (
            <div className='flex items-center justify-center mr-5 capitalize bg-blue-500 py-1 px-3 rounded-md text-white'>
              <Link href='/admin'>
                <a>+ Create</a>
              </Link>
            </div>
          )}

          {isUserLoading ? (
            <svg
              className='animate-spin 
                     h-4 w-4 rounded-full 
                     bg-transparent 
                     border-2 border-transparent 
                   border-t-black 
                   border-r-black border-opacity-50'
              viewBox='0 0 24 24'
            />
          ) : user ? (
            <div className='flex items-center space-x-5'>
              <Link href='/favorites'>
                <a className='inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
                  My Favorites
                </a>
              </Link>
              <button onClick={() => signOut()}>
                <a className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
                  Logout
                </a>
              </button>
              <img
                alt='profile'
                className='rounded-full w-12 h-12'
                src={user.image}
              />
            </div>
          ) : (
            <button onClick={() => signIn()}>
              <a className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
                Login
              </a>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
