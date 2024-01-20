import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    getUser: (state,action) => {
      state.value = action.payload
      console.log(state.value)
    }
}
})

// Action creators are generated for each case reducer function
export const {getUser} = UserSlice.actions

export default UserSlice.reducer