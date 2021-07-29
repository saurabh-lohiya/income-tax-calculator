import React from "react"
import './Slab.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import { useDispatch } from "react-redux"
const Slab = (props) => {
  const dispatch = useDispatch()
  return (
    <>
      <div className='row'>
        <div className='col'>
          <FontAwesomeIcon icon={faPlusCircle} className='icon plus' onClick={() => dispatch(props.increment())} />
          <FontAwesomeIcon icon={faMinusCircle} className='icon minus' onClick={() => dispatch(props.decrement())} />
        </div>
        <div className='col'>{props.taxRate * 100}%</div>
        <div className='col'>3,00,001 - 8,00,000</div>
      </div>
    </>
  )
}

export default Slab
