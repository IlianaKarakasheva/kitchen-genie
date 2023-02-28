import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { firestore } from '../../../firebase/clientApp';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useState, useEffect } from 'react';


const recipesCollection = collection(firestore, 'recipes');


const inter = Inter({ subsets: ['latin'] })

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getRecipes = async () => {
    // // construct a query to get up to 10 undone todos 
    // const recipesQuery = query(recipesCollection);
    // // get the todos
    // const querySnapshot = await getDocs(recipesQuery);
    console.log(recipesCollection)
    const recipeRef = collection(firestore, "recipes")
    console.log(recipeRef)
    
    const q = query(recipeRef); 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots  
          console.log(doc.id, " => ", doc.data());
         });
    // map through todos adding them to an array
    // const result = [];
    // querySnapshot.forEach((snapshot) => {
    //   result.push(snapshot);
    // });
    // // set it to state
    // setRecipes(result);
  };
  useEffect(() => {
    // get the todos
    getRecipes();
    // reset loading
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);
  console.log(recipes)
  return (

    <h1>recipe</h1>
  )
}
