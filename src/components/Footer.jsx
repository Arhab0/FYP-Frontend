import React from 'react'
import { BsRobot, BsHeart, BsStars } from 'react-icons/bs'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const navigate = useNavigate();

    return (
        <footer className='relative bg-gradient-to-br from-gray-50 via-white to-purple-50/50'>
            {/* Top wave decoration */}
            <div className="absolute top-0 left-0 right-0">
                <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
                </svg>
            </div>

            <div className='flex justify-center px-4 pb-8 pt-16'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='w-full max-w-3xl'
                >
                    <div className='relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/50 p-8 md:p-12 text-center overflow-hidden'>
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                        
                        {/* Animated dots */}
                        <div className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse" />
                        <div className="absolute bottom-4 right-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />

                        <div className="relative z-10">
                            {/* Logo */}
                            <motion.div 
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                onClick={()=>navigate("/")}
                                className='inline-flex items-center gap-3 mb-6 hover:cursor-pointer'
                            >
                                <motion.div 
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className='bg-gradient-to-br from-purple-600 to-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-purple-500/30'
                                >
                                    <BsRobot size={28} />
                                </motion.div>
                                <div className="text-left">
                                    <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        InterviewIQ
                                    </h2>
                                    <span className='text-xs text-gray-400 font-medium tracking-wider uppercase'>
                                        AI Interview Platform
                                    </span>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className='text-gray-500 text-sm leading-relaxed max-w-xl mx-auto mb-8'
                            >
                                AI-powered interview preparation platform designed to improve your communication skills, technical depth, and professional confidence.
                            </motion.p>

                            {/* Features Tags */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className='flex flex-wrap justify-center gap-3 mb-8'
                            >
                                {[
                                    { icon: "🎯", text: "AI Mock Interviews" },
                                    { icon: "⚡", text: "Real-time Feedback" },
                                    { icon: "📊", text: "Performance Analytics" },
                                    { icon: "🎤", text: "Voice Analysis" }
                                ].map((tag, index) => (
                                    <motion.span
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-full text-sm font-medium text-purple-700 border border-purple-100'
                                    >
                                        <span>{tag.icon}</span>
                                        <span>{tag.text}</span>
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />

                            {/* Bottom */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center gap-3"
                            >
                                <p className="text-gray-500 text-sm flex items-center gap-1.5">
                                    © {currentYear} InterviewIQ. Made with 
                                    <BsHeart className="text-red-500 animate-pulse" size={14} />
                                    by Our Team
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                                    <span>•</span>
                                    <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom gradient bar */}
                    <div className="mt-6 flex justify-center">
                        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full opacity-50" />
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer