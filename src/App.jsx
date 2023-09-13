import { useState } from 'react'

function App() {

  const [contactName, setContactName] = useState([
    {name:"alex iwobi"}
  ])
  const [newName, setNewName] = useState('')

  function handleChange(event){
    const {value} = event.target
    setNewName(value)
    console.log(newName)
  }
  function handleSubmit(event){
    event.preventDefault()
    setContactName(prev=>{
      return prev?.concat([{name:newName}])
    })
    setNewName('')
  }
  return (
    <>
       <div>
          <h1>Phonebook</h1>
          <form onSubmit={handleSubmit}>
              <input onChange={handleChange} value={newName} type="text" placeholder="Add name"/>
              <button type="submit">add</button>
          </form>
       </div>
       <div>
          <h1>Numbers</h1>
          <ul>
            {contactName.map((elem)=>{
              return <li key={elem.name}>{elem.name}</li>
            })}
          </ul>
       </div>
    </>
  )
}

export default App
