import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import {ingredients} from "../../../public/ingredients.json"
import Select from 'react-select'
import { firestore } from '../../../firebase/clientApp';
import { collection, addDoc} from "@firebase/firestore";
import { async } from '@firebase/util'

 
const inter = Inter({ subsets: ['latin'] })
export default function NewRecipe() {
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({ image: null, title:"", time: 0, ingredients:[], instructions:""})
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onDeleteImage = (event) => {
        event.target.previousElementSibling.value = null;
        setImage(null)
    }

    const onInputChange = (event) => {
        // event.target.
        const name = event.target.name
        const value = event.target.value

        setFormData({...formData, [name]: value})
      
    }

    const onFormSubmit = async (event) =>{
        const newRecipe = {title: formData.title, time: Number(formData.time), ingredients: formData.ingredients, instructions: formData.instructions}
        const collectionRef= collection(firestore, "recipes")
        const newRecipeRef = await addDoc(collectionRef, {...newRecipe})
    } 
    
    const options = ingredients.map(ingredient => {
        return {value: ingredient, label:ingredient}
    })
    const onSelect= (option)=> {
        const data =  option.map( option => option.value)
        // console.log(data, option)
        setFormData({...formData, ingredients:[...data] })
    }
    return (
        <div className='addRecipe container '>
            <div className='newRecipe row align-items-center justify-content-center mt-4'>
                {/* <h4>post a new recipe</h4> */}
                <form className='col-12 d-flex flex-row'>
                    <div className='image col-6 flex-column d-flex justify-content-center'>
 
                        {!image && "Pick a photo of your dish:"}
                        {
                            image && <img src={image} alt="preview image" className='selectedPhoto'/>
                        }
                        <input type="file" onChange={onImageChange} required placeholder='' />
                     
{image &&   <button type="submit" onClick={onDeleteImage} class="btn btn-sm btn-secondary col-2 me-2 mt-4 mb-3">Delete</button>  }
                    </div>
                    <div className='col-6'>

                        <div className='title'>
                            <strong>
                                Label your dish:
                            </strong>
                            <input type="text" className='form-control' placeholder='Dish Title' name='title' onChange={onInputChange}  required />
                        </div>
                        <div className='content'>
                            <div className='time'>
                                <strong>
                                    How long does it take to cook?
                                </strong>
                                <input type="number" className='form-control' placeholder='Time Needed' name='time' onChange={onInputChange} required />
                            </div>
                            <div className='ingredients'>
                                <strong>
                                    Ingredients needed:
                                </strong>
                                <Select options={options} isMulti onChange={onSelect}/>
                                {/* <input type="text" className='form-control' placeholder='Ingredients needed' required /> */}
                            </div>
                            <div className='instructions'>
                                <strong>
                                    Instructions:
                                </strong>
                                <textarea rows="9" type="text" className='form-control' placeholder='Instructions' name='instructions' onChange={onInputChange} required />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-sm btn-primary me-2 mt-4 mb-3">Cancel</button>
                        <button type="button" class="btn btn-sm btn-secondary me-2 mt-4 mb-3" onClick={onFormSubmit}>Submit Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
