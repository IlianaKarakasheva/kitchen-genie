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
    console.log("recipesCollection", recipesCollection)
    const recipeRef = await collection(firestore, "recipes")
    console.log("recipeRef", recipeRef)

    const q = query(recipeRef);
    const querySnapshot = await getDocs(q);
    const result = [];
    // const updatedddata{      
      // const title = doc.data().title;
      // const time = doc.data().time; 
    // }

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots  
      // console.log(doc.id, " => ", doc.data());
    
      const updateddata = doc.data().title;
      const data = {
        title: doc.data().title,
        time:doc.data().time,
        ingredients: doc.data().ingredients
      }
      result.push(data)
    
      // result.push(doc.data())
    });
    setRecipes(result)
    // map through todos adding them to an array
    // querySnapshot.forEach((snapshot) => {
    //   result.push(snapshot);
    // });
    // // set it to state
    // setRecipes(result);
  };
  useEffect(() => {
    getRecipes()
    // get the todos
    // const data = getRecipes();
    // console.log("data",data)
    // setRecipes(data)
    // reset loading
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000)
  }, []);
  console.log("recipes", recipes)
  return (
    <div className='dbDisplay'>
    <ul>
  {recipes.map((recipe, index) => (
    <li key={index}>
      <h3>
      title: {recipe.title}</h3>
      Time: {recipe.time}
      <li>
      ingredients: {recipe.ingredients}
      
      </li>
    </li>
  ))}
</ul>
    </div>
  );
}
