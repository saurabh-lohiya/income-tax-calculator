import './App.scss'
import React, { useState } from 'react'
import Calculater from './components/Calculater/Calculater'
import Slabs from './components/Slabs/Slabs'

function App() {
  return (
    <div className='App'>
      <h1>Income Tax Calculator</h1>
      <div className='slab'>
        <Slabs />
      </div>
      <div className='container-1'>
        <Calculater />
      </div>
    </div>
  )
}

export default App
