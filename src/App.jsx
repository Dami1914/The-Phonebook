import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

function App() {

  const [contactName, setContactName] = useState([])
  const [contactFilter, setContactFilter] = useState("")
  const [newContact, setNewContact] = useState({
    name: "",
    number:""
  })

//handles input for name and number
  function handleChange(event){
    const {value,id} = event.target
    setNewContact(prev=>{
      return {...prev,[id]:value}
    })
    console.log(newContact)
  }

  //handle operations after submit button is cliked like saving the inputed data,checking if name or contact existed before and so on
  function handleSubmit(event){
    event.preventDefault()
    const {name,number} = newContact
    const {nameStatus,numberStatus} = handleContactCheck()
    console.log(nameStatus,numberStatus)
    nameStatus||numberStatus ? alert(`${nameStatus?nameStatus:numberStatus} already exist`): setContactName(prev=>{
      return prev?.concat([{name:capitalizeFirstChar(name.toLowerCase()),number:number}])
    });
    
    setNewContact({name:"",number:""})
  }

  //capitalizes the first character of inputed strings
  function capitalizeFirstChar(str){
    // text.split(" ") turns strings into an array also considering the space between them (" ") e.g input "damilola jibowu" output ["damilola", "jibowu"] 
    return str.split(" ").map((ele)=>{
      return ele.charAt(0).toUpperCase() + ele.slice(1)
      // join(" ") turns content of an array to single a string having also considering the space in between them (" ")
    }).join(" ")
  }
  
  //this receives filter value for filtering the displayed contact
  function handleFilter(event){
    const {value} = event.target
    setContactFilter(value)
  }

// checking if contact contains inputed name or number
  function handleContactCheck(){
    let returnedvalue = {
      nameStatus: "",
      numberStatus:""
    }
    //checks if name exist before in the contact list
      contactName.forEach((ele)=>{
          if(ele.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()){
            returnedvalue.nameStatus = newContact.name
          }else {
            returnedvalue.nameStatus = false
          }
      })
      //checks if number exist before in the contact list
      contactName.forEach((ele)=>{
        ele.number.trim() === newContact.number.trim() ? returnedvalue.numberStatus = newContact.number : returnedvalue.numberStatus = false
      })

      return returnedvalue
  }

  return (
    <>
       <div>
          <h1>Phonebook</h1>
          <Filter handleFilter={handleFilter} contactFilter={contactFilter}/>
          <div>
            <h1>add a new</h1>
            <PersonForm handleChange={handleChange} newContact={newContact} handleSubmit={handleSubmit}/>
          </div>
       </div>
       <div>
          <h1>Numbers</h1>
          <Persons contactName={contactName} contactFilter={contactFilter} />
       </div>
       <div>debug: {newContact.name}</div>
    </>
  )
}

export default App
