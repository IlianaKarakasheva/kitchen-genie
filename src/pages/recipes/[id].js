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
      <h1>{recipe?.title} {id}</h1>
  )
  
    }
