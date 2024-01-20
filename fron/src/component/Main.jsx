import React from 'react'
import Home from './Home'
import Right from './Right'
import Side from './Side'

const Main = () => {
  return (
    <div className='container'>
<div className='row'>
  <Side/>
  <Home/>
  <Right/>
</div>
</div>
  )
}

export default Main
