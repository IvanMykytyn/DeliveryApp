import './submit-button.styles.scss'

import React from 'react'

const SubmitButton = ({text}) => {
  return (
    <button className='submit-button' type="submit"> {text}</button>
  )
}

export default SubmitButton