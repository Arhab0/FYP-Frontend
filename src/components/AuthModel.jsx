import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import Auth from '../pages/Auth'

const AuthModel = ({ onClose }) => {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-3 -right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:text-white"
                    >
                        <FaTimes size={16} />
                    </button>

                    <Auth isModel={true} onClose={onClose} />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default AuthModel