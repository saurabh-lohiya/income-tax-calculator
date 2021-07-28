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
    grossInc: (state) => {
      class Slabs {
        constructor() {
          this.A = [0, 150000, state.taxRateA]
          this.B = [150001, 300000, state.taxRateB]
          this.C = [300001, 800000, state.taxRateC]
          this.D = [800001, 10000000, state.taxRateD]
          this.E = [10000000, Infinity, state.taxRateE]
        }
      }
      const slabs = new Slabs()
      class GrossIncome {
        constructor(income) {
          this.grossIncome = income
          this.incomeTax = this.calculateIncomeTax()
          this.netIncome = this.grossIncome - this.incomeTax
        }
        calculateIncomeTax() {
          let incomeTax = 0
          const residualGrossIncome = this.grossIncome
          if (residualGrossIncome >= slabs.E[0]) {
            incomeTax += (residualGrossIncome - slabs.D[1]) * slabs.E[2] + 2353750
          } else if (residualGrossIncome >= slabs.D[0]) {
            incomeTax += (residualGrossIncome - slabs.C[1]) * slabs.D[2] + 53750
          } else if (residualGrossIncome >= slabs.C[0]) {
            incomeTax += (residualGrossIncome - slabs.B[1]) * slabs.C[2] + 3750
          } else if (residualGrossIncome >= slabs.B[0]) {
            incomeTax += (residualGrossIncome - slabs.A[1]) * slabs.B[2] + 0
          } else if (residualGrossIncome >= slabs.A[0]) {
            incomeTax += (residualGrossIncome - 0) * slabs.A[2]
          }
          console.log(incomeTax)
          return incomeTax
        }
      }
      const gi = GrossIncome(1200000, slabs)
      state.incomeTax = gi.incomeTax
      state.grossIncome = gi.grossIncome
      state.netIncome = gi.netIncome
    },
    netInc: (state) => {
      class NetIncome {
        constructor(income, slabs) {
          this.netIncome = income
          this.grossIncome = this.calculateGrossIncome()
          this.incomeTax = this.grossIncome - this.netIncome
        }

        calculateGrossIncome() {
          let grossIncome = 0
          let residualNetIncome = this.netIncome
          if (slabs.A[1] < residualNetIncome) {
            residualNetIncome -= (slabs.A[1]) * (100 - slabs.A[2] * 100) / 100
            grossIncome += slabs.A[1] - 0
          } else {
            grossIncome += residualNetIncome * (100 / (100 - slabs.A[2] * 100))
            return grossIncome
          }
          if (slabs.B[1] < residualNetIncome) {
            residualNetIncome -= (slabs.B[1] - slabs.A[1]) * (100 - slabs.B[2] * 100) / 100
            grossIncome += slabs.B[1] - slabs.A[1]
          } else {
            grossIncome += residualNetIncome * (100 / (100 - 100 * slabs.B[2]))
            return grossIncome
          }
          if (slabs.C[1] < residualNetIncome) {
            residualNetIncome -= (slabs.C[1] - slabs.B[1]) * (100 - slabs.C[2] * 100) / 100
            grossIncome += slabs.C[1] - slabs.B[1]
          } else {
            grossIncome += residualNetIncome * (100 / (100 - 100 * slabs.C[2]))
            return grossIncome
          }
          if (slabs.D[1] < residualNetIncome) {
            residualNetIncome -= (slabs.D[1] - slabs.C[1]) * (100 - slabs.D[2] * 100) / 100
            grossIncome += slabs.D[1] - slabs.C[1]
          } else {
            grossIncome += residualNetIncome * (100 / (100 - 100 * slabs.D[2]))
            return grossIncome
          }
          if (residualNetIncome > 0) {
            grossIncome += residualNetIncome * (100 / (100 - 100 * slabs.E[2]))
            return grossIncome
          }
        }
      }
      const ni = NetIncome(1202020, slabs)
      state.netIncome = ni.netIncome
      state.grossIncome = ni.grossIncome
      state.incomeTax = ni.incomeTax
    }
  }
})

export const { incrementA, incrementB, incrementC, incrementD, incrementE, decrementA, decrementB, decrementC, decrementD, decrementE, grossInc, netInc } = taxRateSlice.actions
export default taxRateSlice.reducer