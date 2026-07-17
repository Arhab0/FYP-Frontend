import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt
} from 'react-icons/fa'
import { auth, googleProvider } from "../utils/firebase"
import { signInWithPopup } from 'firebase/auth'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Auth = ({ isModel = false, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setShowPassword(false)
  }


  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true)
      const response = await signInWithPopup(auth, googleProvider)
      const details = response.user;
      const name = details.displayName;
      const email = details.email;

      const result = await axios.post("http://localhost:8000/api/auth/google",
        { name, email }, { withCredentials: true }
      )
      // dispatch(setUserData(result.data.user))
      const user = await axios.get(
        "http://localhost:8000/api/user/current-user",
        { withCredentials: true }
      );

      dispatch(setUserData(user.data.user));
    } catch (error) {
      console.error(error);
      dispatch(setUserData(null))
    } finally {
      setIsLoading(false)
      onClose()
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  const features = [
    { icon: FaBolt, text: 'AI-Powered Practice' },
    { icon: FaShieldAlt, text: 'Real-time Feedback' },
    { icon: FaCheckCircle, text: 'Track Progress' }
  ]

  return (
    <div>
      {
        isModel == false ?
          (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
              {/* Background decorative elements */}
              <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-10"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 50, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-10"
                animate={{
                  scale: [1.3, 1, 1.3],
                  x: [0, -50, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl opacity-5"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Left Side - Branding */}
                <motion.div
                  className="hidden lg:flex flex-col justify-center items-start p-8"
                  variants={itemVariants}
                >
                  <motion.div
                    className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: ["0 0 20px rgba(59, 130, 246, 0.5)", "0 0 40px rgba(147, 51, 234, 0.5)", "0 0 20px rgba(59, 130, 246, 0.5)"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaRobot className="w-16 h-16 text-white" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    AI Interview Platform
                  </motion.h1>

                  <motion.p
                    className="text-gray-600 text-lg mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    Transform your interview preparation with AI-powered practice sessions. Get real-time feedback and ace your next interview.
                  </motion.p>

                  <motion.div
                    className="space-y-4 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delayChildren: 0.9 }}
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Auth Form */}
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95"
                  variants={itemVariants}
                >
                  {/* Mobile Logo */}
                  <motion.div
                    className="lg:hidden text-center mb-6"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FaRobot className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      AI Interview Platform
                    </h1>
                  </motion.div>

                  {/* Google Sign-Up Button - Primary CTA */}
                  <motion.div
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={handleGoogleSignUp}
                      className="w-full bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-800 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGoogle className="w-5 h-5" />
                      <span className="text-lg">Sign up with Google</span>
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center mt-2">
                      Quick sign-up using your Google account
                    </p>
                  </motion.div>

                  {/* Divider with Text */}
                  {/* <motion.div 
            className="relative mb-6"
            variants={itemVariants}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">
                or continue with email
              </span>
            </div>
          </motion.div> */}

                  {/* Toggle Buttons */}
                  {/* <motion.div 
            className="flex mb-6 bg-gray-50 rounded-lg p-1"
            variants={itemVariants}
          >
            <motion.button
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLogin ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setIsLogin(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
                !isLogin ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setIsLogin(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </motion.div> */}

                  {/* Email/Password Form */}
                  {/* <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <motion.div className="space-y-4" variants={containerVariants}>
                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                      required
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </motion.button>
                  </div>
                </motion.div>

                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {isLogin && (
                  <motion.div 
                    className="flex justify-between items-center"
                    variants={itemVariants}
                  >
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </a>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <FaArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence> */}

                  {/* Footer Text */}
                  {/* <motion.p 
            className="text-center mt-6 text-gray-600 text-sm"
            variants={itemVariants}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <motion.button
              onClick={toggleMode}
              className="text-blue-600 font-medium hover:text-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </motion.p> */}

                  {/* Terms and Privacy */}

                </motion.div>
              </motion.div>
            </div>
          )
          :
          (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              {/* Header */}
              <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-3 shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.3)",
                      "0 0 35px rgba(59, 130, 246, 0.3)",
                      "0 0 20px rgba(147, 51, 234, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaRobot className="w-6 h-6 text-white" />
                </motion.div>

                <motion.h2
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to InterviewIQ
                </motion.h2>

                <motion.p
                  className="text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Sign in to start your AI-powered interview practice
                </motion.p>
              </motion.div>

              {/* Features */}
              <motion.div
                className="space-y-2 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { icon: "🎯", text: "AI-Powered Mock Interviews" },
                  { icon: "⚡", text: "Real-time Performance Feedback" },
                  { icon: "📊", text: "Track Your Progress" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-purple-50 border border-gray-100"
                  >
                    <span className="text-base">{feature.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div
                className="relative mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium">
                    Continue with
                  </span>
                </div>
              </motion.div>

              {/* Google Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-800 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg relative overflow-hidden group"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ) : (
                    <>
                      <FaGoogle className="w-5 h-5" />
                      <span className="text-base font-semibold">
                        Sign in with Google
                      </span>
                    </>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            </div>
          )
      }
    </div>
  )
}

export default Auth