import React, { useState, useEffect } from 'react'
import '../styles/food.css'
import axios from 'axios'

export default function Food() {

    const [foodName, setFoodName] = useState('')
    const [days, setDays] = useState(0)
    const [image, setImage] = useState("")
    const [foodList, setFoodList] = useState([])
    const [newFoodName, setNewFoodName] = useState('')


    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            console.log(file)


            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/upload' , formData, {
                headers:{
                    'content-type' : 'multipart/form-data'
                }
            })
            setImage(res.data.url)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }      

    const addToList = () => {
             axios.post("/insert", {
                foodName,
                days,
                photo:image
        })
    }

    const onUpdate =(id) => {
        axios.put('/update',{
            id:id,
            newFoodName: newFoodName
        })
    }

    const onDelete =(id) => {
        axios.delete(`/delete/${id}`)
    }

    useEffect( () => {
        const fetchData = async () => {
               const res=await axios.get('https://blog-crud-be.herokuapp.com/read')
               setFoodList(res.data)              
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="heading">Crud app with mern</h1>
            <div className="input_fields">
            <label htmlFor="foodName" className="lable_name">  Food Name</label>
            <input type="text" id='foodName' className="foodName_input" onChange={(e) => {setFoodName(e.target.value)}} />

            <label htmlFor="foodName" className="lable_name"> Days since you ate it </label>
            <input type="number" id='foodName' className="foodName_input" onChange={(e) => {setDays(e.target.value)}} />
                <div className="card input_field blue-grey darken-1">
        
                <div class="file-field input-field">
               
                    <span>Upload Image</span>
                    <input type="file"  name="file" id="file_up" onChange={handleUpload} />
                
                </div>
                <button class="btn waves-effect waves-light darken-1" >Submit Post </button>
            </div>
            <button type="submit"  className="button" onClick={addToList} > Add to List </button>
            </div>
            
           

            <hr />
            <h1>Food List </h1> 
            {
                foodList.map((value, key) => {
                    return (
                    <div key={key}>
                        <img src={value.photo} className="image_style" alt="" /> 
                        <h1> {value.foodName} </h1>
                        <h1> {value.daysSinceIEat} </h1>
                        <input type="text" placeholder="enter text to update"  onChange={(e) => {setNewFoodName(e.target.value)}} />
                        <button onClick={() => onUpdate(value._id)} > Update </button>
                        <button  onClick={() => onDelete(value._id)} > Delete </button>
                    </div>
                    )
                })
            }
            
        </div>
    )
}
