import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const Navbar = () => {
    const { user,logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }


    const listItems = <>
        <li className='hover:bg-lime-300 hover:text-white duration-100 delay-300'><Link to='/'>Home</Link></li>
        <li className='hover:bg-lime-300 hover:text-white duration-100 delay-300'><Link to='/addNote'>Add Note</Link></li>
        <li className='hover:bg-lime-300 hover:text-white duration-100 delay-300'><Link to='/myNotes'>My Notes</Link></li>
    </>
    return (
        <div className="navbar bg-black md:text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {listItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case md:text-xl text-white md:font-bold">Note Organizer</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {listItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <Link><button onClick={handleLogOut} className='btn btn-warning btn-sm mr-4 md:mr-12'>Logout</button></Link> :
                        <Link to='/signIn'><button className='btn bg-bg-lime-700 rounded-lg btn-sm mr-12'>SignIn</button></Link>
                }
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Navbar;