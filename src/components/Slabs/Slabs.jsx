import React from "react"
import './Slabs.scss'
import Slab from './Slab/Slab'
import { useSelector, useDispatch } from "react-redux"
import { incrementA, incrementB, incrementC, incrementD, incrementE, decrementA, decrementB, decrementC, decrementD, decrementE } from "../../redux/taxRates"

const Slabs = (props) => {
  const { taxRateA, taxRateB, taxRateC, taxRateD, taxRateE } = useSelector(state => state.taxRate)
  return (
    <>
      <Slab taxRate={taxRateA} increment={incrementA} decrement={decrementA} />
      <Slab taxRate={taxRateB} increment={incrementB} decrement={decrementB} />
      <Slab taxRate={taxRateC} increment={incrementC} decrement={decrementC} />
      <Slab taxRate={taxRateD} increment={incrementD} decrement={decrementD} />
      <Slab taxRate={taxRateE} increment={incrementE} decrement={decrementE} />
    </>
  )
}

export default Slabs
