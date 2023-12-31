import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personservice from './services/person'
import Notification from './components/Notification'


function App() {
  const {getAllContact,saveData,deleteData,updateData} = personservice

  const [contactName, setContactName] = useState([])
  const [contactFilter, setContactFilter] = useState("")
  const [notificationMessage,setNotificationMessage] = useState({
    message:null,
    isSuccessful: true
  })
  const [newContact, setNewContact] = useState({
    name: "",
    number:""
  })

  console.log("hello world")

useEffect(()=>{
   getAllContact()
    .then((response)=>{
      setContactName(response)
      console.log(response.data)
    })
    console.log("hello world1")
},[])

function handleErrorMessage(event){
  
}

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

    //stop function if name or number input field is empty onsubmit
    if(name === "" || number === ""){
      return
    }

    //stores the returned status of an operation to check if number or name existed before in the database
    const {nameStatus,numberStatus} = handleContactCheck()
    console.log(nameStatus,numberStatus)

    const capitalized = {name:capitalizeFirstChar(name.toLowerCase()),number:number}

    if(nameStatus||numberStatus){
      if(window.confirm(`${nameStatus||numberStatus} exist in the contact, do you wish to edit it`)){
 
        const currentcontact = contactName.find(a=> a.name === capitalized.name)
        console.log(numberStatus)
        numberStatus? alert(`${numberStatus} already exist`):
        updateData(currentcontact.id,capitalized)
          .then((response)=>setContactName((prev)=>prev.map((ele)=>{
            console.log(response)
            setNotificationMessage({message:"Data updated successfully",isSuccessful:true})
            setTimeout(()=>setNotificationMessage({message:null,isSuccessful:true}),6000)  
            return ele.id === currentcontact.id? response : ele
          }))).catch(response=>{
            setNotificationMessage({message:`can't update data, information of ${capitalized.name} has been removed from server`,isSuccessful:false})
            setTimeout(()=>setNotificationMessage({message:null,isSuccessful:false}),6000)
          })
      }
    }else{
      saveData(capitalized)
      .then(response=>{
        setContactName(prev=>{
          return prev?.concat(response)
        });
        setNotificationMessage({message:"Data saved successfully",isSuccessful:true})
        setTimeout(()=>setNotificationMessage({message:null,isSuccessful:true}),6000)
      }).catch(response=>{
        setNotificationMessage({message:`cant save data `,isSuccessful:false})
        setTimeout(()=>setNotificationMessage({message:null,isSuccessful:false}),6000)
      })
    }
    // post request to save data to database for data persistence
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
      const nameMatch = contactName.find((a)=> a.name.trim().toLowerCase() === newContact.name.trim().toLowerCase())
      console.log(nameMatch)
      returnedvalue.nameStatus = nameMatch?.name

      //checks if number exist before in the contact list
      const numberMatch = contactName.find((a)=> a.number.trim() === newContact.number)
      console.log(numberMatch)
      returnedvalue.numberStatus = numberMatch?.number

      return returnedvalue
  }

  function handleDelete(id){
    if(window.confirm("are you sure you want to delete this contact")){
      deleteData(id)
        .then((response)=>{
          setContactName(prev=>prev.filter((ele)=>ele.id !== id))
          console.log(response)
          setNotificationMessage({message:"Data deleted successfully",isSuccessful:true})
          setTimeout(()=>setNotificationMessage({message:null,isSuccessful:true}),6000)
        })
        .catch(()=>{
          setNotificationMessage({message:`can't be deleted, information has been removed from server`,isSuccessful:false})
          setTimeout(() => {
            setNotificationMessage({message:null,isSuccessful:false})
          }, 6000);
        })
    }
  }

  return (
    <>
       <div>
          <h1>Phonebook</h1>
          <Notification  message={notificationMessage.message} isSuccessful={notificationMessage.isSuccessful}/>
          <Filter handleFilter={handleFilter} contactFilter={contactFilter}/>
          <div>
            <h1>add a new</h1>
            <PersonForm handleChange={handleChange} newContact={newContact} handleSubmit={handleSubmit}/>
          </div>
       </div>
       <div>
          <h1>Numbers</h1>
          {contactName?.filter((elem)=>{
            return elem.name.toLowerCase().includes(contactFilter.toLowerCase()) || elem.number.includes(contactFilter)
           })?.map(ele=>{
              return <Persons key={ele.number} ele={ele} handleDelete={()=>handleDelete(ele.id)}/>
           })}
       </div>
       <div>debug: {newContact.name}</div>
    </>
  )
}

export default App
