import React from 'react'

const Notification = ({message,isSuccessful}) => {
    if(!message){
        return true
    }
    
    const responseState = isSuccessful? "green": "red";

    const Style = {
      color: `${responseState}`,
      padding: '5px',
      fontSize: "25px",
      border: `2px solid ${responseState}`,
      borderRadius: "10px",
      width: "300px",
      margin: "10px"
    }

  return (
    <div style={Style}>{message}</div>
  )
}

export default Notification