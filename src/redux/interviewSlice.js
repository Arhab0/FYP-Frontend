import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name : "interview",
    initialState:{
        interviewData : null,
    },
    reducers:{
        setInterviewData:(state,action)=>{
            state.interviewData = action.payload
        }
    }
})

export const {setInterviewData} = interviewSlice.actions
export default interviewSlice.reducer