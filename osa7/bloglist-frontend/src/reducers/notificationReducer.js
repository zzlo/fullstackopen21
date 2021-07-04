const notificationReducer = (state = 'default', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationRemove = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: 'default',
  }
}

export default notificationReducer