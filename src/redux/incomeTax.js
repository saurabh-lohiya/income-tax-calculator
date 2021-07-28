import { createSlice } from '@reduxjs/toolkit'

const incomeTaxSlice = createSlice({
  name: 'incomeTaxRate',
  initialState: {
    taxRateA: 0,
    taxRateB: 0.025,
    taxRateC: 0.10,
    taxRateD: 0.25,
    taxRateE: 0.3
  },
  reducers: {
    incrementA: state => {
      state.taxRateA += .01
    },
    incrementB: state => {
      state.taxRateB += .025
    },
    incrementC: state => {
      state.taxRateC += .1
    },
    incrementD: state => {
      state.taxRateD += .1
    },
    incrementE: state => {
      state.taxRateE += .1
    },
    decreamentA: state => {
      state.taxRateA -= .01
    },
    decreamentB: state => {
      state.taxRateB -= .01
    },
    decreamentC: state => {
      state.taxRateC -= .01
    },
    decreamentD: state => {
      state.taxRateD -= .01
    },
    decreamentE: state => {
      state.taxRateE -= .01
    },
  }
})

export const { incrementA, incrementB, incrementC, incrementD, incrementE, decrementA, decrementB, decrementC, decrementD, decrementE } = incomeTaxSlice.actions
export default incomeTaxSlice.reducer