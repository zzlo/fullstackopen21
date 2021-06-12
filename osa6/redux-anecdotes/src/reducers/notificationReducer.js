const notificationReducer = (state = 'default', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification,
        })
        setTimeout(() => {
            dispatch(notificationRemove())
        }, time * 1000);
    }
}

export const notificationRemove = () => {
    return {
        type: 'SET_NOTIFICATION',
        notification: 'default',
    }
}

export default notificationReducer