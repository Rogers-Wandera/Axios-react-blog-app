import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div className='Missing'>
      <h4>Opps looks like you followed a wrong link</h4>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Missing