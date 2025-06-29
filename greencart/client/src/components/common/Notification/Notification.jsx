import React from 'react'
import "../../styles/styles.css"
const Notification = ({type, text}) => {

    const renderText =()=>{
        switch (type) {
            case "success":
                return <p className='notification success'>{text}</p>
            case "remove":
                return <p className='notification remove'>{text}</p>
            default:
                return;
        }
    }
    return (
    <div className='notification-container'>
      {renderText()}
    </div>
  )
}

export default Notification
