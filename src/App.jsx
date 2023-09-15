import { useState } from 'react'

function App() {

  const [contactName, setContactName] = useState([])
  const [newContact, setNewContact] = useState({
    name: "",
    number:""
  })

  function handleChange(event){
    const {value,id} = event.target
    setNewContact(prev=>{
      return {...prev,[id]:value}
    })
    console.log(newContact)
  }

  function handleSubmit(event){
    event.preventDefault()
    handleContactCheck() == true ? alert(`${newContact.name} already exist`): setContactName(prev=>{
      return prev?.concat([newContact])
    });
    
    setNewContact({name:"",number:""})
  }

  function handleContactCheck(){
    let truthstate = ""
      contactName.forEach((ele)=>{
          if(ele.name.trim() === newContact.name.trim() || ele.number ===  newContact.number ){
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
            <div>
              <div>
                <input onChange={handleChange} id="name" value={newContact.name} type="text" placeholder="Add name"/> 
              </div>
              <div>
                <input onChange={handleChange} id="number" value={newContact.number} type="tel" placeholder="Add number"/>
              </div>
              <button type="submit">add</button>
            </div>
          </form>
       </div>
       <div>
          <h1>Numbers</h1>
          <ul>
            {contactName.map((elem)=>{
              return <li key={elem.number}>{elem.name} {elem.number} </li>
            })}
          </ul>
       </div>
       <div>debug: {newContact.name}</div>
    </>
  )
}

export default App
