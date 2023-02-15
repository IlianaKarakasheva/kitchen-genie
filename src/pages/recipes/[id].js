import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useParams } from 'react-router-dom'
import { useRouter } from 'next/router'
import Data from '../../../public/data.json'

const inter = Inter({ subsets: ['latin'] })

export default function Recipe() {
    const router = useRouter()
    console.log(router.query)
    const{id} = router.query
    const recipe = Data.recipes.find((r) => {
      console.log(r.id)
      console.log(id)
     return  r.id == id
    });
    // const recipe = Data.recipes;
    console.log(recipe)
    return (
      // <h1>{recipe?.title} {id}</h1>,
      // <h2>{recipe?.ingredients  }</h2>,
      // <h4>{recipe?.decription} </h4>
      <div>
      <h2>{recipe?.title}</h2>
      <img src={`/images/${recipe?.image ? recipe?.image:"nophoto.jpg" }`} alt={recipe?.title} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe?.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe?.instructions}</p>
      <h3>Time needed:</h3>
      <p>{recipe?.time}min</p>
      <h3>Rating:</h3>
      <p>{recipe?.rating}/5</p>
      <h3>Comments:</h3>
      {recipe?.comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>User ID: {comment.userid}</p>
          <p>Description: {comment.description}</p>
          <br/>
        </div>
      ))}
      
    </div>
      )
    }
