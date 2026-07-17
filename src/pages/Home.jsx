import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText, BsStars, BsArrowRight, BsPlayFill } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { FaRocket, FaUserGraduate } from 'react-icons/fa'
import AuthModel from '../components/AuthModel.jsx'
import { useNavigate } from 'react-router-dom'
import Cards from '../components/Cards.jsx'
import Footer from '../components/Footer.jsx'


const Home = () => {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  const [typedText, setTypedText] = useState('')
  const fullText = 'AI Intelligence'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const card1 = [
    {
      icon: <BsRobot size={24} />,
      step: "Step 1",
      title: "Role & Experience Selection",
      desc: "AI adjusts difficulty based on your selected job role and experience level.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <BsMic size={24} />,
      step: "Step 2",
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up questions based on your answers with real-time voice analysis.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <BsClock size={24} />,
      step: "Step 3",
      title: "Timer Based Simulation",
      desc: "Real interview pressure with intelligent time tracking and performance metrics.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ]


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex flex-col'>
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 py-12 md:py-20">
        <div className='max-w-6xl mx-auto'>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center mb-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-white border border-purple-200 text-gray-700 text-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-lg shadow-purple-500/10'
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <HiSparkles className='text-purple-500' size={16} />
              <span className="font-medium">AI Powered Smart Interview Platform</span>
            </motion.div>
          </motion.div>

          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-4xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto mb-4'
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Practice Interview with
              </span>
              <br />
              <motion.span
                className='inline-block mt-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 text-purple-400"
                >
                  |
                </motion.span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed'
            >
              Role-Based mock interviews with smart follow-ups, adaptive difficulty, and real-time performance evaluation powered by advanced AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className='flex flex-wrap justify-center gap-4 mt-10'
            >
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-3 overflow-hidden'
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BsPlayFill size={24} className="relative z-10" />
                <span className="relative z-10">Start Interview</span>
                <BsArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 flex items-center gap-2'
              >
                <BsBarChart size={20} />
                <span>View History</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16'
            >
              {[
                { number: "10K+", label: "Active Users", icon: <FaUserGraduate /> },
                { number: "95%", label: "Success Rate", icon: <BsStars /> },
                { number: "50K+", label: "Interviews", icon: <FaRocket /> },
                { number: "4.9", label: "Rating", icon: <HiSparkles /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
                >
                  <div className="text-purple-500 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* How It Works Section */}
          <div className='mb-32'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                How It{" "}
                <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>Works</span>
              </h2>
              <p className='text-gray-500 text-lg max-w-2xl mx-auto'>
                Three simple steps to transform your interview preparation
              </p>
            </motion.div>

            <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 lg:gap-10'>
              {card1.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`
        relative bg-white rounded-3xl border-2 border-gray-100 
        hover:border-purple-300 p-8 md:p-10 w-80 max-w-[90%] shadow-lg hover:shadow-2xl transition-all duration-300
        ${i === 0 ? "md:rotate-[-2deg]" : ""}
        ${i === 1 ? "md:rotate-[2deg] md:-mt-8 shadow-xl border-purple-200" : ""}
        ${i === 2 ? "md:rotate-[-1deg]" : ""}
      `}
                >
                  {/* Step Number Badge */}
                  <div className='absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30'>
                    <span className="text-xl font-bold">{i + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className='mt-8 mb-6 flex justify-center'>
                    <div className={`${e.bgColor} p-4 rounded-2xl`}>
                      <div className={e.color}>
                        {e.icon}
                      </div>
                    </div>
                  </div>

                  <div className='text-center'>
                    <div className='text-xs text-purple-600 font-semibold mb-2 tracking-wider uppercase'>
                      {e.step}
                    </div>
                    <h3 className='font-bold mb-3 text-xl text-gray-800'>{e.title}</h3>
                    <p className='text-sm text-gray-500 leading-relaxed'>{e.desc}</p>
                  </div>

                  {/* Connection line between cards */}
                  {i < card1.length - 1 && (
                    <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                      <BsArrowRight className="text-purple-300" size={24} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <Cards />
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home