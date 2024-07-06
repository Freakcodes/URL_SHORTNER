import React from 'react'

const Error =(props) => {
  return (
    <span className='text-red-400'>{props.message}</span>
  )
}

export default Error