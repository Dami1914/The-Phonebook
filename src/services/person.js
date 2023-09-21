import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAllContact = ()=>{
    const request = axios.get(baseUrl)
    return request.then((response)=> response.data)
}

const saveData = (resources)=>{
    const request = axios.post(baseUrl,resources)
    return request.then((response)=>response.data)
}

const updateData = (id,newupdate)=>{
    const request = axios.put(`${baseUrl}/${id}`,newupdate)
    return request.then((response)=>response.data)
}

const deleteData = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response)=>response.data)
}

export default {
    saveData,
    getAllContact,
    updateData,
    deleteData
}