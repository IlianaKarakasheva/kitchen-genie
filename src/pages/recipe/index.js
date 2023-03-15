import { Inter } from "@next/font/google";
import { firestore } from "../../../firebase/clientApp";
import { collection, query, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";

const recipesCollection = collection(firestore, "recipes");

const inter = Inter({ subsets: ["latin"] });

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    const recipeRef = await collection(firestore, "recipes");

    const q = query(recipeRef);
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      const data = {
        title: doc.data().title,
        time: doc.data().time,
        ingredients: doc.data().ingredients,
      };
      result.push(data);
    });
    setRecipes(result);
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div className="dbDisplay">
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>title: {recipe.title}</h3>
            <p>Time: {recipe.time}</p>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
