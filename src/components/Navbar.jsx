import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'motion/react'
import { BsRobot, BsCoin, BsLightningCharge, BsStars } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaUserAstronaut, FaCrown } from 'react-icons/fa'
import { IoSparkles, IoRocket } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'
import Cookies from "js-cookie";
import { setInterviewData } from '../redux/interviewSlice'

const Navbar = () => {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setshowCreditPopup] = useState(false)
    const [showUserPopup, setshowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showAuth, setShowAuth] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.post(
            "http://localhost:8000/api/auth/logout",
            {},
            {
                withCredentials: true,
            }
        );

            dispatch(setUserData(null))
            dispatch(setInterviewData(null))
            setshowCreditPopup(false)
            setshowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='flex justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className='w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/50 px-6 md:px-8 py-4 flex justify-between items-center relative'
            >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rounded-3xl pointer-events-none" />

                {/* Animated background dots */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse" />
                    <div className="absolute bottom-2 right-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-pink-400/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
                </div>

                {/* Logo Section */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={()=>navigate("/")}
                    className='flex items-center gap-3 cursor-pointer relative z-10'
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className='relative'
                    >
                        <div className='bg-gradient-to-br from-purple-600 to-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-purple-500/30'>
                            <BsRobot size={20} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                    </motion.div>

                    <div className="flex flex-col">
                        <h1 className='font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hidden md:block leading-tight'>
                            InterviewIQ
                        </h1>
                        <span className='text-[10px] text-gray-400 hidden md:block font-medium tracking-wider uppercase'>
                            AI Platform
                        </span>
                    </div>
                </motion.div>

                {/* Actions Section */}
                <div className="flex items-center gap-4 md:gap-6 relative z-[9999px]">
                    {/* Credits Button */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                if (!userData) {
                                    setShowAuth(true);
                                    return;
                                }
                                e.stopPropagation();
                                setshowCreditPopup(!showCreditPopup);
                                setshowUserPopup(false);
                            }}
                            className='relative flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 group'
                        >
                            <BsCoin size={18} className="group-hover:rotate-12 transition-transform" />
                            <span className="font-bold text-sm md:text-base">{userData?.credits || 0}</span>
                            <div className="w-px h-4 bg-white/30 mx-1" />
                            <BsLightningCharge size={14} className="animate-pulse" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        </motion.button>

                        <AnimatePresence>
                            {showCreditPopup && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-4 w-80 bg-white shadow-2xl border border-gray-100 rounded-2xl p-6'
                                    style={{ zIndex: 9999 }}
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-2.5 rounded-xl">
                                            <IoSparkles className="text-purple-600" size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1">Running low on credits?</h3>
                                            <p className='text-sm text-gray-500'>Continue your interview practice journey!</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-xl mb-4 border border-purple-100">
                                        <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                                            <FaCrown className="text-yellow-500" size={14} />
                                            <span>Premium features available</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            navigate("/pricing")
                                            setshowCreditPopup(false)
                                        }}
                                        className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group'
                                    >
                                        <span>Get More Credits</span>
                                        <IoRocket size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User Profile Button */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                if (!userData) {
                                    setShowAuth(true);
                                    return;
                                }
                                e.stopPropagation();
                                setshowUserPopup(!showUserPopup);
                                setshowCreditPopup(false)
                            }}
                            className='relative w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-purple-500/20 hover:ring-purple-500/50'
                        >
                            {userData ? (
                                <span className="text-sm font-bold">{userData?.name.slice(0, 1).toUpperCase()}</span>
                            ) : (
                                <FaUserAstronaut size={16} />
                            )}

                            {/* Online indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                        </motion.button>

                        <AnimatePresence>
                            {showUserPopup && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-4 w-56 bg-white shadow-2xl border border-gray-100 rounded-2xl p-2'
                                    style={{ zIndex: 9999 }}
                                >
                                    {/* User Info Header */}
                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {userData?.name.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className='font-bold text-gray-800 text-sm'>{userData?.name}</p>
                                                <p className='text-xs text-gray-500'>AI Interview Candidate</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <motion.button
                                            whileHover={{ x: 3 }}
                                            onClick={() => {
                                                navigate("/history")
                                                setshowUserPopup(false)
                                            }}
                                            className='w-full text-left px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-xl transition-all duration-200 flex items-center gap-3 text-gray-700 hover:text-purple-600 group'
                                        >
                                            <BsStars size={16} className="group-hover:rotate-12 transition-transform" />
                                            <span>Interview History</span>
                                        </motion.button>

                                        <div className="h-px bg-gray-100 my-1 mx-3" />

                                        <motion.button
                                            whileHover={{ x: 3 }}
                                            onClick={handleLogout}
                                            className='w-full text-left px-4 py-3 text-sm hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-3 text-red-500 hover:text-red-600 group'
                                        >
                                            <HiOutlineLogout size={18} className="group-hover:-translate-x-1 transition-transform" />
                                            <span>Logout</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {
                showAuth && (
                    <AuthModel onClose={() => setShowAuth(false)} />
                )
            }
        </div>
    )
}

export default Navbar