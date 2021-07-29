import React, { useState } from "react"
import { useSelector } from "react-redux"

const Calculater = (props) => {
  const { taxRateA, taxRateB, taxRateC, taxRateD, taxRateE } = useSelector(state => state.taxRate)
  const [netIncome, setNetIncome] = useState(0)
  const [grossIncome, setGrossIncome] = useState(0)
  const [incomeTax, setIncomeTax] = useState(0)

  function handleGrossInput(e) {
    console.log(e.target.value)
    setGrossIncome(e.target.value)
    if (e.target.value > 400000) {
      const GrossInc = new GrossIncome(e.target.value, slabs)
      setNetIncome(GrossInc.netIncome)
      setIncomeTax(GrossInc.incomeTax)
    } else {
      setNetIncome(e.target.value)
      setIncomeTax(0)
    }
  }

  function handleNetInput(e) {
    const NetInc = new NetIncome(e.target.value, slabs)
    setNetIncome(e.target.value)
    if (NetInc.grossIncome > 400000) {
      setGrossIncome(NetInc.grossIncome)
      setIncomeTax(NetInc.incomeTax)
    } else {
      setGrossIncome(e.target.value)
      setIncomeTax(0)
    }
  }
  class Slabs {
    constructor() {
      this.A = [0, 150000, taxRateA]
      this.B = [150001, 300000, taxRateB]
      this.C = [300001, 800000, taxRateC]
      this.D = [800001, 10000000, taxRateD]
      this.E = [10000000, Infinity, taxRateE]
    }
  }
  const slabs = new Slabs()

  class GrossIncome {
    constructor(income, slabs) {
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
  return (
    <>
      <div className='gross'>
        <form className='income'>
          <div>
            <label for='gross-input'>Gross-Income </label>
            <input type='text' id='gross-input' onChange={handleGrossInput} value={grossIncome} />
          </div>
          <div>
            <label for='gross-input'>Net-Income </label>
            <input type='text' id='gross-input' onChange={handleNetInput} value={netIncome} />
          </div>
          <div>Income Tax is <span id='gtax'>{incomeTax}</span></div>
        </form>
      </div>
    </>
  )
}

export default Calculater
