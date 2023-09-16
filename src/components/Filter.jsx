import React from 'react'

const Filter = ({handleFilter, contactFilter}) => {
  return (
    <>
      <form> 
          <input type="search" onChange={handleFilter} value={contactFilter} placeholder="filter shown with"/>
      </form> 
    </>
  )
}

export default Filter