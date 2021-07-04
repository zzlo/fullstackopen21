import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const errorStyle = {
    fontStyle: 'helvetica',
    color: 'white',
    padding: 10,
    border: 1,
    backgroundColor: 'grey',
    borderRadius: 3,
    display: notification !== 'default' ? '' : 'none'
  }

  return (
    <div style={errorStyle}>
      {notification}
    </div>
  )
}

export default Notification