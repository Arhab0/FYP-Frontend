import React, { useEffect, useState } from 'react'
import Step2Interview from '../components/Step2Interview'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from "../redux/userSlice"
import axios from 'axios';
import { motion } from 'motion/react'

const StartInterview = () => {
    const dispatch = useDispatch();
    const { interviewData } = useSelector((state) => state.interview);
    const { userData } = useSelector((state) => state.user)
    const role = interviewData?.role
    const experience = interviewData?.experience
    const mode = interviewData?.mode
    const resumeText = interviewData?.resumeText
    const projects = interviewData?.project
    const skills = interviewData?.skill
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!interviewData) {
            return;
        }
        setLoading(true);

        const generateQuestion = async () => {

            try {
                const result = await axios.post("http://localhost:8000/api/interview/generate-questions",
                    {
                        role, experience, mode, resumeText, projects, skills
                    },
                    {
                        withCredentials: true
                    })

                if (userData) {
                    dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
                }
                setData(result.data)
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        generateQuestion()

    }, [])

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex items-center justify-center'>
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className='text-gray-500 text-lg font-medium'>Loading...</p>
                </div>
            </div>
        )
    }

    return <Step2Interview interviewData={data} />
}

export default StartInterview