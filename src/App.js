import './App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import { incrementA, incrementB, incrementC, incrementD, incrementE, decrementA, decrementB, decrementC, decrementD, decrementE, grossInc, netInc } from './redux/taxRates'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'

function App() {

  const { taxRateA, taxRateB, taxRateC, taxRateD, taxRateE, grossIncome, netIncome, incomeTax } = useSelector(state => state.taxRate)
  const dispatch = useDispatch()

  return (
    <div className='App'>
      <h1>Income Tax Calculator</h1>
      <div className='slab'>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(incrementA())} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(decrementA())} />
          </div>
          <div className='col'>{taxRateA}%</div>
          <div className='col'>0 - 1,50,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(incrementB())} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(decrementB())} />
          </div>
          <div className='col'>{taxRateB}%</div>
          <div className='col'>1,50,001 - 3,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(incrementC())} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(decrementC())} />
          </div>
          <div className='col'>{taxRateC}%</div>
          <div className='col'>3,00,001 - 8,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(incrementD())} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(decrementD())} />
          </div>
          <div className='col'>{taxRateD}%</div>
          <div className='col'>8,00,001 - 1,00,00,000</div>
        </div>
        <div className='row'>
          <div className='col'>
            <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(incrementE())} />
            <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(decrementE())} />
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
              <input type='text' id='gross-input' onChange={() => dispatch(grossInc())} />
            </div>
            <div>Net Income Is <span id='net-income'>{netIncome}</span> </div>
            <div>Income Tax is <span id='gtax'>{incomeTax}</span></div>
          </form>
        </div>
        <div className='net'>
          <form className='income'>
            <div>
              <label for='net-input'>Enter Net-Income </label>
              <input type='text' id='net-input' onChange={() => dispatch(netInc())} />
            </div>
            <div>Gross Income Is <span id='gross-income'>{grossIncome}</span></div>
            <div> Income Tax Is <span id='ntax'>{incomeTax}</span></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
