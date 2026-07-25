import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import {
  FaUserTie, FaBriefcase, FaFileUpload, FaMicrophoneAlt, FaChartLine,
  FaRocket, FaBrain, FaCheckCircle, FaUpload, FaTimes, FaFilePdf
} from 'react-icons/fa'
import { BsStars, BsLightningCharge, BsArrowRight } from 'react-icons/bs'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from "../redux/userSlice"

const Step1SetUp = ({ onStart }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);


  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [mode, setMode] = useState("Technical")
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const arr1 = [
    {
      icon: <FaUserTie className='text-purple-600 text-xl' />,
      text: "Choose Role & Experience",
      desc: "Select your target position and experience level",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FaMicrophoneAlt className='text-blue-600 text-xl' />,
      text: "Smart Voice Interview",
      desc: "AI-powered voice interaction and analysis",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaChartLine className='text-emerald-600 text-xl' />,
      text: "Performance Analytics",
      desc: "Detailed feedback and improvement insights",
      gradient: "from-emerald-500 to-green-500"
    },
  ]

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) {
      return;
    }
    setAnalyzing(true);
    const formdata = new FormData()
    formdata.append("resume", resumeFile)

    try {
      const result = await axios.post("http://localhost:8000/api/interview/resume", formdata, { withCredentials: true })
      console.log(result.data)

      setRole(result.data.role || "")
      setExperience(result.data.experience || "")
      setProjects(result.data.projects || [])
      setSkills(result.data.skills || [])
      setResumeText(result.data.resumeText || "")
      setAnalysisDone(true);
      setAnalyzing(false)

    } catch (error) {
      console.error(error)
      setAnalyzing(false)
    }
  }

  const handleRemoveFile = (e) => {
    e.stopPropagation()
    setResumeFile(null)
    setAnalysisDone(false)
    setProjects([])
    setSkills([])
  }

  const handleStartInterview = async () => {
    if (!role || !experience) return;
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:8000/api/interview/generate-questions",
        {
          role, experience, mode, resumeText, projects, skills
        },
        {
          withCredentials: true
        })
      console.log(result.data)

      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50/30 px-4 py-8'
    >
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className='w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/50 grid md:grid-cols-2 overflow-hidden relative'>
        {/* Left Side - Info Panel */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-10 md:p-12 flex flex-col justify-center overflow-hidden'
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl opacity-20" />

          {/* Animated dots */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div className="absolute bottom-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200 shadow-lg"
            >
              <BsStars className="text-purple-600 animate-pulse" size={16} />
              <span className="text-sm font-medium text-purple-700">AI Interview Setup</span>
            </motion.div>

            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
              Start Your{' '}
              <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                AI Interview
              </span>
            </h2>

            <p className='text-gray-600 mb-10 text-lg leading-relaxed'>
              Practice real interview scenarios powered by advanced AI. Improve communication, technical skills, and confidence.
            </p>

            <div className="space-y-4">
              {arr1.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className='group flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer relative overflow-hidden'
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-r ${e.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {e.icon}
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className='text-gray-800 font-semibold text-lg'>{e.text}</h3>
                    <p className='text-gray-500 text-sm'>{e.desc}</p>
                  </div>

                  <BsArrowRight className="relative z-10 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Setup Form */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='p-10 md:p-12 bg-white'
        >
          <div className="mb-8">
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Interview Setup
            </h2>
            <p className='text-gray-500'>Configure your interview preferences</p>
          </div>

          <div className="space-y-6">
            {/* Role Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
              <div className="relative group">
                <FaUserTie className='absolute top-4 left-4 text-gray-400 group-focus-within:text-purple-600 transition-colors' />
                <input
                  type="text"
                  placeholder='e.g., Senior Frontend Developer'
                  className='w-full pl-12 py-3.5 pr-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-gray-800'
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
              </div>
            </div>

            {/* Experience Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <div className="relative group">
                <FaBriefcase className='absolute top-4 left-4 text-gray-400 group-focus-within:text-purple-600 transition-colors' />
                <input
                  type="text"
                  placeholder='e.g., 5 years'
                  className='w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-gray-800'
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                />
              </div>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interview Mode</label>
              <div className="relative">
                <select
                  onChange={(e) => setMode(e.target.value)}
                  value={mode}
                  className='w-full py-3.5 px-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-gray-800 cursor-pointer appearance-none'
                >
                  <option value="Technical">💻 Technical Interview</option>
                  <option value="HR">👥 HR Interview</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            {!analysisDone ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume (Optional)</label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => !resumeFile && document.getElementById("resumeUpload").click()}
                  className='relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group'
                >
                  {!resumeFile ? (
                    <>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4 group-hover:bg-purple-200 transition-colors"
                      >
                        <FaUpload className='text-2xl text-purple-600' />
                      </motion.div>
                      <input
                        type="file"
                        accept='application/pdf'
                        id='resumeUpload'
                        className='hidden'
                        onChange={(e) => setResumeFile(e.target.files[0])}
                      />
                      <p className='text-gray-600 font-medium mb-1'>Upload your resume</p>
                      <p className='text-gray-400 text-sm'>PDF format, max 5MB</p>
                    </>
                  ) : (
                    <div className="flex items-center justify-between bg-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <div className="text-left">
                          <p className="text-gray-800 font-medium text-sm truncate max-w-[200px]">{resumeFile.name}</p>
                          <p className="text-gray-500 text-xs">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveFile}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  )}

                  {resumeFile && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadResume();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={analyzing}
                      className='mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {analyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Analyzing Resume...</span>
                        </>
                      ) : (
                        <>
                          <FaBrain size={18} />
                          <span>Analyze Resume</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </motion.div>
              </div>
            ) : (
              /* Analysis Results */
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 space-y-4'
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-white" size={16} />
                  </div>
                  <h3 className='text-lg font-bold text-gray-800'>
                    Resume Analysis Complete
                  </h3>
                </div>

                {projects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaBrain className="text-purple-600" />
                      <p className='font-semibold text-gray-700'>Projects</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projects.map((p, i) => (
                        <span key={i} className='bg-white px-3 py-1.5 rounded-lg text-sm text-gray-700 border border-purple-200 shadow-sm'>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BsLightningCharge className="text-blue-600" />
                      <p className='font-semibold text-gray-700'>Skills</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span key={i} className='bg-white px-3 py-1.5 rounded-lg text-sm text-gray-700 border border-blue-200 shadow-sm'>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setResumeFile(null)
                    setAnalysisDone(false)
                    setProjects([])
                    setSkills([])
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  <FaTimes size={12} />
                  Remove & Re-upload
                </button>
              </motion.div>
            )}

            {/* Start Button */}
            <motion.button
              disabled={!role || !experience || loading}
              onClick={handleStartInterview}
              whileHover={role && experience ? { scale: 1.02 } : {}}
              whileTap={role && experience ? { scale: 0.98 } : {}}
              className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl flex items-center justify-center gap-3 group'
            >
              <span>{loading === true ? "Starting..." : "Start Interview"}</span>
              <FaRocket className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Step1SetUp