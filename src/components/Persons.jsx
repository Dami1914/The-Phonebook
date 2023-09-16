import React from 'react'

const Persons = ({contactName,contactFilter}) => {
  return (
    <div>
      <ul>
            {
            // filters the contactName based on some conditions and the maps the returned array for filtered render of data
            contactName.filter((elem)=>{
             return elem.name.toLowerCase().includes(contactFilter.toLowerCase()) || elem.number.includes(contactFilter)
            }).map((ele)=>{
                return <li key={ele.number}>{ele.name} {ele.number}</li>
            })}
        </ul>
    </div>
  )
}

export default Persons