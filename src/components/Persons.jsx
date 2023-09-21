import React from 'react'

const Persons = ({ele,handleDelete}) => {
  return (
    <>
        <li>{ele.name} {ele.number} <button onClick={handleDelete}>delete</button></li>
    </>
  )
}

export default Persons