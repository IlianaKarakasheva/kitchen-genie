import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { firestore } from '../../firebase/clientApp';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useState, useEffect } from 'react';
import Select from 'react-select'

const recipesCollection = collection(firestore, 'recipes');
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);


  const getRecipes = async () => {
    const recipeRef = await collection(firestore, "recipes")
    const q = query(recipeRef);
    const querySnapshot = await getDocs(q);
    const result = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        title: doc.data().title,
        time: doc.data().time,
        ingredients: doc.data().ingredients
      }

      result.push(data)

    });

    setRecipes(result)
    setFilteredRecipes(result)

  };

  useEffect(() => {
    getRecipes()
  }, []
  );
  
  function changePlaceholder() {const recipeSearch = document.getElementById("recipe-search");
    if (recipeSearch.placeholder === "Search recipe by name") {
      recipeSearch.placeholder = "Search by products";
    } else {
      recipeSearch.placeholder = "Search recipe by name";
    }
  }

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value
    setSearchInput(newSearchValue)
    
    if (newSearchValue === "") {
      setFilteredRecipes(recipes)
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(newSearchValue.toLowerCase())
      );

      setFilteredRecipes(filtered);
    }
    console.log("user is typing:", newSearchValue);
  }

  return (
        <main>
          <section class="py-5 text-center banner">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-bold">Гладни ли сте?</h1>
                <p class="lead">Вижте какво имате в хладилника и разберете какво може да си сготвите</p>
                <div class="input-group mb-3 search">
                  <button class="btn btn-secondary" type="button" id="button-addon2" onClick={changePlaceholder}><i class="bi bi-arrow-down-up"></i></button>
                  {/* <button class="btn btn-secondary" type="button" id="button-addon2" onclick="changePlaceholder()"><i class="bi bi-arrow-down-up"></i></button> */}
                  <input id="recipe-search" type="text" class="form-control" placeholder="Search recipe by name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleSearchChange} />
                 </div>
              </div>
            </div>
          </section>

          <div class="album py-5 bg-light">
            <div class="container">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {
                  filteredRecipes.map((recipe) => {
                    return (
                      <div class="col">
                        <div class="card shadow-sm">
                          <a href={"/recipes/" + recipe.id}><img src={`/images/${recipe.image ? recipe.image : "nophoto.png"}`} alt={recipe?.title} className="card-image" />
                          </a>
                          <div class="card-body text-black">
                            <div class="card-text">
                              <a href={"/recipes/" + recipe.id} className='card-title'>
                                <strong>{recipe.title}</strong>
                              </a>
                            </div>
                            <div className='card-ingredients'>
                              Products needed:

                              <blockquote className='card-ingredients'>
                                {

                                  recipe.ingredients.slice(0, 4).map((ingredient, index) => {
                                    return (
                                      (index > 0) ? `, ${ingredient}` : ingredient
                                    )
                                  })
                                }
                                {recipe?.ingredients.length > 5 && (
                                  " etc."
                                )}
                              </blockquote>
                            </div>
                            <div class="d-flex justify-content-between align-recipes-center mt-4 border-top pt-2">
                              <a href={"/recipes/" + recipe.id} class="btn btn-sm btn-secondary">View</a>
                              <small class="text-muted"><i class="bi bi-hourglass-split"></i>{recipe.time}min</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </main>
  )
}
