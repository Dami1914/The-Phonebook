import React from 'react'

const PersonForm = ({handleChange,newContact,handleSubmit}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
          <div>
           <div>
             <input onChange={handleChange} id="name" aria-required value={newContact.name} type="text" placeholder="Add name"/> 
           </div>
           <div>
             <input onChange={handleChange} id="number" aria-required value={newContact.number} type="tel" placeholder="Add number"/>
           </div>
           <button type="submit">add</button>
          </div>
        </form>
    </>
  )
}

export default PersonForm