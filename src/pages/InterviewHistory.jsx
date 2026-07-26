import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
    BsCalendar, BsBriefcase, BsBarChart, BsArrowRight,
    BsStars, BsClock, BsCheckCircle, BsHourglassSplit,
    BsGraphUp, BsTrophy, BsLightningCharge
} from 'react-icons/bs'
import { FaBrain, FaUserTie, FaLaptopCode, FaUsers } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const InterviewHistory = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterview = async () => {
            try {
                const result = await axios.get("http://localhost:8000/api/interview/get-interviews", { withCredentials: true })
                setInterviews(result.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getMyInterview();
    }, [])

    const getScoreColor = (score) => {
        if (score >= 8) return 'from-emerald-500 to-green-500'
        if (score >= 6) return 'from-blue-500 to-cyan-500'
        if (score >= 4) return 'from-amber-500 to-orange-500'
        if (score > 0) return 'from-red-500 to-pink-500'
        return 'from-gray-400 to-gray-500'
    }

    const getScoreEmoji = (score) => {
        if (score >= 8) return '🏆'
        if (score >= 6) return '⭐'
        if (score >= 4) return '📈'
        if (score > 0) return '🎯'
        return '⏳'
    }

    const getModeIcon = (mode) => {
        switch (mode) {
            case 'Technical':
                return <FaLaptopCode className="text-purple-600" />
            case 'HR':
                return <FaUsers className="text-blue-600" />
            default:
                return <FaBrain className="text-indigo-600" />
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            const hours = Math.floor(diffTime / (1000 * 60 * 60))
            if (hours === 0) {
                const minutes = Math.floor(diffTime / (1000 * 60))
                return `${minutes} minutes ago`
            }
            return `${hours} hours ago`
        } else if (diffDays === 1) {
            return 'Yesterday'
        } else if (diffDays < 7) {
            return `${diffDays} days ago`
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }
    }

    const filteredInterviews = selectedFilter === 'all'
        ? interviews
        : interviews.filter(interview => interview.mode === selectedFilter)

    const completedInterviews = interviews.filter(i => i.status === 'completed')
    const averageScore = completedInterviews.length > 0
        ? (completedInterviews.reduce((acc, curr) => acc + (curr.finalScore || 0), 0) / completedInterviews.length).toFixed(1)
        : 0

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex flex-col'>
            <Navbar />

            <div className="flex-1 px-4 sm:px-6 py-8 md:py-12">
                <div className='max-w-6xl mx-auto'>
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4"
                                >
                                    <BsStars className="animate-pulse" size={16} />
                                    <span className="text-sm font-semibold">Interview History</span>
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-bold">
                                    Your{' '}
                                    <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                                        Interview Journey
                                    </span>
                                </h1>
                                <p className='text-gray-500 mt-2 text-lg'>Track your progress and improve your skills</p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        {!loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                                {[
                                    {
                                        icon: <BsGraphUp size={24} />,
                                        label: 'Total Interviews',
                                        value: interviews.length,
                                        gradient: 'from-purple-500 to-indigo-500'
                                    },
                                    {
                                        icon: <BsCheckCircle size={24} />,
                                        label: 'Completed',
                                        value: completedInterviews.length,
                                        gradient: 'from-emerald-500 to-green-500'
                                    },
                                    {
                                        icon: <BsTrophy size={24} />,
                                        label: 'Avg Score',
                                        value: `${averageScore}/10`,
                                        gradient: 'from-amber-500 to-orange-500'
                                    },
                                    {
                                        icon: <BsLightningCharge size={24} />,
                                        label: 'Best Score',
                                        value: completedInterviews.length > 0
                                            ? `${Math.max(...completedInterviews.map(i => i.finalScore || 0))}/10`
                                            : 'N/A',
                                        gradient: 'from-blue-500 to-cyan-500'
                                    },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
                                    >
                                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white mb-3 shadow-lg`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                        <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3 mb-8"
                    >
                        {['all', 'Technical', 'HR'].map((filter) => (
                            <motion.button
                                key={filter}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedFilter === filter
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {filter === 'all' ? 'All Interviews' : `${filter} Interviews`}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Interviews List */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
                            />
                        </div>
                    ) : filteredInterviews.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Interviews Found</h3>
                            <p className="text-gray-500 mb-6">Start your first AI-powered interview today!</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/interview')}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/30"
                            >
                                Start Interview
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid gap-4"
                        >
                            {filteredInterviews.map((interview, index) => (
                                <motion.div
                                    key={interview._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    onClick={() => navigate(`/report/${interview._id}`)}
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            {/* Mode Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center border border-purple-100">
                                                {getModeIcon(interview.mode)}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        {interview.role}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${interview.mode === 'Technical'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {interview.mode}
                                                    </span>
                                                    {interview.status === 'completed' ? (
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                                                            <BsCheckCircle size={12} />
                                                            Completed
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 flex items-center gap-1">
                                                            <BsHourglassSplit size={12} />
                                                            In Complete
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                                    <span className="flex items-center gap-1">
                                                        <BsBriefcase size={14} />
                                                        {interview.experience}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <BsCalendar size={14} />
                                                        {formatDate(interview.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Score Section */}
                                        <div className="flex items-center gap-4">
                                            {interview.status === 'completed' && (
                                                <div className="text-center">
                                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getScoreColor(interview.finalScore)} text-white shadow-lg mb-1`}>
                                                        <div>
                                                            <div className="text-xl font-bold">{interview.finalScore}</div>
                                                            <div className="text-xs opacity-90">/10</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-600">
                                                        Score
                                                    </div>
                                                </div>
                                            )}

                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="text-gray-400 group-hover:text-purple-600 transition-colors"
                                            >
                                                <BsArrowRight size={24} />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Hover gradient line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default InterviewHistory