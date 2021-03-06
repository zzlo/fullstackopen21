import React from 'react'

const Notification = ( {message} ) => {
    const style = {
        color: 'green',
        fontStyle: 'helvetica',
        fontSize: 16,
        padding: 10,
        marginBottom: 5,
        background: 'lightgrey',
        borderRadius: 5
    }

    if (message === null) {
        return null
    } else {
        return (
            <div style={style}>
                {message}
            </div>
        )
    }
}

export default Notification