import './App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import React, { useState } from 'react'

function App () {
  const [taxRateA, setTaxRateA] = useState(0)
  const [taxRateB, setTaxRateB] = useState(0.025)
  const [taxRateC, setTaxRateC] = useState(0.10)
  const [taxRateD, setTaxRateD] = useState(0.25)
  const [taxRateE, setTaxRateE] = useState(0.30)
  const [netIncome, setNetIncome] = useState()
  const [gIncomeTax, setGIncomeTax] = useState()
  const [nIncomeTax, setNIncomeTax] = useState()
  const [grossIncome, setGrossIncome] = useState()

  class Slabs {
    constructor () {
      this.A = [0, 150000, taxRateA]
      this.B = [150001, 300000, taxRateB]
      this.C = [300001, 800000, taxRateC]
      this.D = [800001, 10000000, taxRateD]
      this.E = [10000000, Infinity, taxRateE]
    }
  }
  const slabs = new Slabs()
  class GrossIncome {
    constructor (income) {
      this.grossIncome = income
      this.incomeTax = this.calculateIncomeTax()
      this.netIncome = this.grossIncome - this.incomeTax
    }

    calculateIncomeTax () {
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
    constructor (income, slabs) {
      this.netIncome = income
      this.grossIncome = this.calculateGrossIncome()
      this.incomeTax = this.grossIncome - this.netIncome
    }

    calculateGrossIncome () {
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

  function handleGrossInput (e) {
    console.log(e.target.value)
    if (e.target.value > 400000) {
      const GrossInc = new GrossIncome(e.target.value, slabs)
      setNetIncome(GrossInc.netIncome)
      setGIncomeTax(GrossInc.incomeTax)
    } else {
      setNetIncome(e.target.value)
      setGIncomeTax(0)
    }
  }

  function handleNetInput (e) {
    const NetInc = new NetIncome(e.target.value, slabs)
    if (NetInc.grossIncome > 400000) {
      setGrossIncome(NetInc.grossIncome)
      setNIncomeTax(NetInc.incomeTax)
    } else {
      setGrossIncome(e.target.value)
      setNIncomeTax(0)
    }
  }
  // console.log(new NetIncome(1000000, slabs).incomeTax)

  function handleTaxRateA (e) {
    // console.log(e.target.classList)

    if (e.target.classList.contains('plus')) {
      setTaxRateA(
        prevTaxRateA => prevTaxRateA + 0.1
      )
    }
    if (e.target.classList.contains('minus')) {
      setTaxRateA(
        prevTaxRateA => prevTaxRateA - 0.1
      )
    }
  }
  function handleTaxRateB (e) {
    if (e.target.classList.contains('plus')) {
      setTaxRateB(
        prevTaxRateB => prevTaxRateB + 0.1
      )
    }
    if (e.target.classList.contains('minus')) {
      setTaxRateB(
        prevTaxRateB => prevTaxRateB - 0.1
      )
    }
  }
  function handleTaxRateC (e) {
    if (e.target.classList.contains('plus')) {
      setTaxRateC(
        prevTaxRateC => prevTaxRateC + 0.1
      )
    }
    if (e.target.classList.contains('minus')) {
      setTaxRateC(
        prevTaxRateC => prevTaxRateC - 0.1
      )
    }
  }
  function handleTaxRateD (e) {
    if (e.target.classList.contains('plus')) {
      setTaxRateD(
        prevTaxRateD => prevTaxRateD + 0.1
      )
    }
    if (e.target.classList.contains('minus')) {
      setTaxRateD(
        prevTaxRateD => prevTaxRateD - 0.1
      )
    }
  }
  function handleTaxRateE (e) {
    if (e.target.classList.contains('plus')) {
      setTaxRateE(
        prevTaxRateE => prevTaxRateE + 0.1
      )
    }
    if (e.target.classList.contains('minus')) {
      setTaxRateE(
        prevTaxRateE => prevTaxRateE - 0.1
      )
    }
  }
  return (
    <div className='App'>
      <h1>Income Tax Calculator</h1>
      <div className='slab'>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={handleTaxRateA} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={handleTaxRateA} />
          </div>
          <div className='col'>{taxRateA}%</div>
          <div className='col'>0 - 1,50,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={handleTaxRateB} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={handleTaxRateB} />
          </div>
          <div className='col'>{taxRateB}%</div>
          <div className='col'>1,50,001 - 3,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={handleTaxRateC} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={handleTaxRateC} />
          </div>
          <div className='col'>{taxRateC}%</div>
          <div className='col'>3,00,001 - 8,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={handleTaxRateD} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={handleTaxRateD} />
          </div>
          <div className='col'>{taxRateD}%</div>
          <div className='col'>8,00,001 - 1,00,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={handleTaxRateE} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={handleTaxRateE} />
          </div>
          <div className='col'>{taxRateE}%</div>
          <div className='col'>1,00,00,000+</div>
        </div>
      </div>
      <div className='container-1'>
        <div className='gross'>
          <form className='income'>
            <div>
              <label for='gross-input'>Enter Gross-Income </label>
              <input type='text' id='gross-input' onChange={handleGrossInput} />
            </div>
            <div>Net Income Is <span id='net-income'>{netIncome}</span> </div>
            <div>Income Tax is <span id='gtax'>{gIncomeTax}</span></div>
          </form>
        </div>
        <div className='net'>
          <form className='income'>
            <div>
              <label for='net-input'>Enter Net-Income </label>
              <input type='text' id='net-input' onChange={handleNetInput} />
            </div>
            <div>Gross Income Is <span id='gross-income'>{grossIncome}</span></div>
            <div> Income Tax Is <span id='ntax'>{nIncomeTax}</span></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
