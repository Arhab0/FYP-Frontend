import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const result = await axios.get("http://localhost:8000/api/user/current-user",
        { withCredentials: true }
      )
      console.log(result.data.user)
      dispatch(setUserData(result.data.user));
    }
    getCurrentUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App