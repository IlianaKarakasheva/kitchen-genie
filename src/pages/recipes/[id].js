import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useParams } from 'react-router-dom'
import { useRouter } from 'next/router'
import Data from '../../../public/data.json'
import { firestore } from '../firebase/clientApp';


const inter = Inter({ subsets: ['latin'] })

export default function Recipe() {
  const router = useRouter()
  console.log(router.query)
  const { id } = router.query
  const recipe = Data.recipes.find((r) => {
    console.log(r.id)
    console.log(id)
    return r.id == id
  });
  // const recipe = Data.recipes;
  console.log(recipe)
  return (
    <div className='recipeContainer container'>
      <div className='row'>
        <div className='recipeImage col-6'>
          <blockquote>
          <img src={`/images/${recipe?.image ? recipe?.image : "nophoto.png"}`} alt={recipe?.title} />
          </blockquote>
        </div>
        <div className='col-6'>


          <h2 className='recipeTitle'>
            {recipe?.title}</h2>
          <div className='recipeDetails row'>
            <div className='col-12'>

              <h6>Ingredients:</h6>
              <p>
                {recipe?.ingredients.map((ingredient, index) => {
                  return (
                    (index > 0) ? `, ${ingredient}` : ingredient
                  )

                })}
              </p>
            </div>
            <div className='col-6'>

              <h6>Time needed:</h6>
              <p>{recipe?.time}min</p>
            </div>
            <div className='col-6'>
              <h6>Rating:</h6>
              <p>{recipe?.rating}/5</p>
            </div>
            <div className='col-12'>
              <h6>Instructions:</h6>
              <p>{recipe?.instructions}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <hr/>
        </div>
      </div>
      <div className='row'>
        <h6>Comments:</h6>
        {recipe?.comments.map((comment) => (
          <div className='col' key={comment.comment_id}>
            <blockquote>
            {comment.description}
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  )
}
