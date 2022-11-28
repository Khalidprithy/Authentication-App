import { getAuth } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import toast from 'react-hot-toast';
const NavigationBar = () => {


    const [user] = useAuthState(auth);

    console.log(user);

    const [signOut, loading, error] = useSignOut(auth);

    const menuItems = <>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/'>Home</Link></li>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/about'>About</Link></li>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/contact'>Contact</Link></li>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/profile'>Profile</Link></li>
    </>

    const profileMenu = <>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/profile'>
            {user?.displayName ? user.displayName : 'Profile'}</Link></li>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/saved'>Saved</Link></li>
        <li className='text-xl hover:bg-gray-50 hover:text-gray-700 rounded-xl text-gray-50 m-1'><Link to='/setting'>Setting</Link></li>
        <button
            onClick={async () => {
                const success = await signOut();
                if (success) {
                    toast.success('Logged out')
                }
            }}
            className='btn btn-sm btn-error mx-10 mt-2'>Logout</button>

    </>


    return (
        <div className="navbar bg-gray-700">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-700 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <div className='ml-0 md:ml-6'>
                    <Link to='/' className='flex items-center gap-2 text-base md:text-2xl text-gray-50'><img className='w-10' src="https://icons.veryicon.com/png/o/business/business-style-icon/shield-24.png" alt="" />Auth App</Link>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className='navbar-end'>
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className='w-10 rounded-full'>
                                    {
                                        user.photoURL ?
                                            <img src={user?.photoURL} alt='' /> :
                                            <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg" alt='' />
                                    }

                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-4 p-2 shadow bg-gray-700 text-gray-50 rounded-box w-52">
                                {profileMenu}
                            </ul>
                        </div>

                        :

                        <>
                            <Link to='/login' className='btn btn-sm btn-success mr-2'>Login</Link>
                            <Link to='/signup' className='btn btn-sm btn-success'>SignUp</Link>
                        </>
                }


            </div>
        </div>
    );
};

export default NavigationBar;