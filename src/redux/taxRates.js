import { createSlice } from '@reduxjs/toolkit'

const taxRateSlice = createSlice({
  name: 'taxRate',
  initialState: {
    taxRateA: 0,
    taxRateB: 0.025,
    taxRateC: 0.10,
    taxRateD: 0.25,
    taxRateE: 0.3
  },
  reducers: {
    incrementA: state => {
      state.taxRateA += .001
    },
    incrementB: state => {
      state.taxRateB += .0025
    },
    incrementC: state => {
      state.taxRateC += .01
    },
    incrementD: state => {
      state.taxRateD += .025
    },
    incrementE: state => {
      state.taxRateE += .03
    },
    decrementA: state => {
      state.taxRateA -= .001
    },
    decrementB: state => {
      state.taxRateB -= .0025
    },
    decrementC: state => {
      state.taxRateC -= .01
    },
    decrementD: state => {
      state.taxRateD -= .025
    },
    decrementE: state => {
      state.taxRateE -= .03
    }
  }
})

export const { incrementA, incrementB, incrementC, incrementD, incrementE, decrementA, decrementB, decrementC, decrementD, decrementE } = taxRateSlice.actions
export default taxRateSlice.reducer