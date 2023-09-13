import { useState } from 'react'

function App() {

  const [contactName, setContactName] = useState([])
  const [newName, setNewName] = useState('')

  function handleChange(event){
    const {value} = event.target
    setNewName(value)
    console.log(newName)
  }

  function handleSubmit(event){
    event.preventDefault()
    handleContactCheck() == true ? alert(`${newName} already exist`): setContactName(prev=>{
      return prev?.concat([{name:newName}])
    });

    setNewName('')
  }

  function handleContactCheck(){
    let truthstate = ""
      contactName.forEach((ele)=>{
          if(ele.name.trim() === newName.trim()){
            truthstate = true
          }else {
            truthstate = false
          }
      })

      return truthstate
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
       <div>debug: {newName}</div>
    </>
  )
}

export default App
