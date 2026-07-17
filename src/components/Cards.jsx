import React from 'react'
import { BsBarChart, BsFileEarmarkText, BsStars, BsShieldCheck } from 'react-icons/bs'
import { motion } from 'motion/react'
import { FaBrain, FaChartLine, FaFilePdf, FaHistory } from 'react-icons/fa'

import hrImg from "../assets/HR.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import evalImg from "../assets/ai-ans.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"

const Cards = () => {
  const card2 = [
    {
      image: evalImg,
      icon: <FaBrain size={24} />,
      title: "AI Answer Evaluation",
      desc: "Scores communication, technical accuracy, and confidence with detailed feedback.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50"
    },
    {
      image: resumeImg,
      icon: <BsFileEarmarkText size={24} />,
      title: "Resume Based Interview",
      desc: "Dynamic questions tailored to your resume and experience automatically.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      image: pdfImg,
      icon: <FaFilePdf size={24} />,
      title: "Downloadable PDF Report",
      desc: "Detailed strengths, weaknesses, and improvement insights in PDF format.",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50"
    },
    {
      image: analyticsImg,
      icon: <FaChartLine size={24} />,
      title: "History & Analytics",
      desc: "Track progress with performance graphs and topic-wise analysis.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
  ]

  const card3 = [
    {
      image: hrImg,
      title: "HR Interview Mode",
      desc: "Behavioral and communication based evaluation with real-world scenarios.",
      icon: "👥",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      image: techImg,
      title: "Technical Mode",
      desc: "Deep technical questioning based on your selected role and stack.",
      icon: "💻",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      image: confidenceImg,
      title: "Confidence Detection",
      desc: "Advanced tone and voice analysis to improve your delivery.",
      icon: "🎯",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      image: creditImg,
      title: "Credits System",
      desc: "Unlock premium interview sessions with our flexible credit system.",
      icon: "💎",
      gradient: "from-amber-500 to-orange-500"
    },
  ]

  return (
    <div>
      {/* AI Capabilities Section */}
      <div className='mb-32'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2 rounded-full mb-6"
          >
            <BsStars className="animate-pulse" />
            <span className="text-sm font-semibold">Powered by Advanced AI</span>
          </motion.div>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Advanced AI{" "}
            <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>Capabilities</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-2xl mx-auto'>
            Cutting-edge features designed to give you the best interview preparation experience
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {card2.map((e, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${e.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className='relative z-10 flex flex-col md:flex-row items-center gap-8'>
                <div className='w-full md:w-1/2 flex justify-center'>
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={e.image} 
                    alt={e.title} 
                    className='w-full h-auto object-contain max-h-64 drop-shadow-2xl' 
                  />
                </div>

                <div className='w-full md:w-1/2'>
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className={`bg-gradient-to-r ${e.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}
                  >
                    {e.icon}
                  </motion.div>
                  <h3 className='font-bold mb-3 text-xl text-gray-800'>{e.title}</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{e.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interview Modes Section */}
      <div className='mb-32'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-2 rounded-full mb-6"
          >
            <BsShieldCheck className="animate-pulse" />
            <span className="text-sm font-semibold">Multiple Formats Available</span>
          </motion.div>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Multiple Interview{" "}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Modes</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-2xl mx-auto'>
            Choose from various interview formats tailored to your needs
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {card3.map((e, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Gradient bar on top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${e.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              
              <div className='flex items-center justify-between gap-6'>
                <div className="w-1/2">
                  <div className="text-3xl mb-3">{e.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">
                    {e.title}
                  </h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{e.desc}</p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <motion.img 
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={e.image} 
                    alt={e.title} 
                    className='w-32 h-32 object-contain drop-shadow-xl'
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards