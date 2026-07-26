import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewHistory from './pages/InterviewHistory'
import InterviewReport from './pages/InterviewReport'
import StartInterview from './pages/StartInterview'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const result = await axios.get("http://localhost:8000/api/user/current-user",
        { withCredentials: true }
      )
      dispatch(setUserData(result.data.user));
    }
    getCurrentUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/startInterview" element={<StartInterview />} />
      <Route path="/history" element={<InterviewHistory />} />
      <Route path="/report/:id" element={<InterviewReport />} /> 
    </Routes>
  )
}

export default App