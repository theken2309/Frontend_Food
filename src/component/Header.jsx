    import React, { useState } from 'react'
    import { motion } from 'framer-motion'
    import { app } from '../firebaseconnect';
    import { Link } from 'react-router-dom';
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    import logo from '../img/logo.png'
    import Avatar from '../img/avatar.png'
    import { MdAddShoppingCart, MdAddToPhotos, MdOutlineLogout,MdLogout,MdAdd } from "react-icons/md";
    import { actionType } from '../context/reducer';
    import { useStateValue } from '../context/StateProvider';

    const Header = () => {
        const firebaseAuth = getAuth(app);
        const [{ user }, dispatch] = useStateValue()
        const provider = new GoogleAuthProvider();
        const [isMenu, setIsMenu] = useState(false);
        //lam onclick hien mo menu dang nhap !
        const login = async () => {
            if (!user) {
                const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
                // console.log(response);
                dispatch({
                    type: actionType.SET_USER,
                    user: providerData[0]
                });
                localStorage.setItem('user', JSON.stringify(providerData[0])); // kiem tra thong tin 
            }
            else {
                setIsMenu(!isMenu)
            }
        }
        const logout = () => {
            setIsMenu(false);
            localStorage.clear();
            dispatch({
                type: actionType.SET_USER,
                user: null,
            })
        }
        return (
            <div className='fixed z-10 w-screen bg-purple-200 p-6 px-16' >
                {/* desktop and tablet */}
                <div className='hidden md:flex w-full h-full items-center justify-between'>
                    <Link to='/' className="flex items-center gap-2">
                        <img src={logo} className="w-8 object-cover" alt="logo" />
                        <p className="text-headingColor text-xl font-bold">City Food</p>
                    </Link >
                    <div className='flex items-center gap-8'>
                        <ul className="flex items-center gap-8 ml-auto ">
                            <Link to='/Home' className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Home
                            </Link>
                            <Link to='/Menu' className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Menu
                            </Link>
                            <Link to='/About' className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                About Us
                            </Link>
                            <Link to='/Services' className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Services
                            </Link>
                        </ul>
                        <div className='relative flex items-center justify-center'>
                            <MdAddShoppingCart className='text-textColor text-2xl ml-5 cursor-pointer' ></MdAddShoppingCart>
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold"> 23 </p>
                            </div>
                        </div>
                        <div className='relative '>
                            <motion.img
                                whileTap={{ scale: 0.7 }}
                                src={user ? user.photoURL : Avatar} alt="Avatar" //toan tu 3 ngoi neu dang nhap duoc thi dung ava cua email
                                className='w-10 min-w-[60px] h-10 min-h-[60px] drop-shadow-2xl rounded-full cursor-pointer'
                                onClick={login} />
                        </div>
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 bg-gray-50 shadow-l rounded-lg flex flex-col absolute top-24 right-1'>
                                <Link to='/CreateIteam' className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                >
                                    <MdAddToPhotos  /> New Item</Link>
                                <p onClick={logout} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" >
                                    <MdOutlineLogout />Logout</p>
                            </motion.div>
                        )}
                    </div>
                </div>
                {/*Mobile */}
                <div className='flex md:hidden w-full h-full bg-blue-500 p-4'>
                    <div className='flex items-center justify-between md:hidden w-full h-full'>
                        <div className="relative flex items-center justify-center">
                            <MdAddShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer"></MdAddShoppingCart>
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    2
                                </p>
                            </div>
                        </div>
                        <Link to={'/'} className="flex items-center gap-2">
                            <img src={logo} className="w-8 object-cover" alt="logo" />
                            <p className="text-headingColor text-xl font-bold">Food</p>
                        </Link>

                        {/* avatar */}
                        <div className="relative">
                            <motion.img
                                whileTap={{ scale: 0.7 }}
                                className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer'
                                src={user ? user.photoURL : Avatar}
                                alt="Avatar"
                                onClick={login}
                            />
                            {
                                isMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.6 }}
                                        className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0'>

                                        <Link to={'/createItem'} >
                                            <p className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"  >
                                                <MdAdd  /> New Item
                                            </p>
                                        </Link>

                                        {/* menu  */}
                                        <ul className="flex flex-col px-4 py-3 gap-4">
                                            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                                Home
                                            </li>
                                            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                                Menu
                                            </li>
                                            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                                About Us
                                            </li>
                                            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                                Services
                                            </li>
                                        </ul>

                                        <p className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                            onClick={logout}
                                        ><MdLogout />Logout</p>
                                    </motion.div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    export default Header