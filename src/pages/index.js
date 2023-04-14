import { firestore } from "../../firebase/clientApp";
import { collection, query, getDocs } from "@firebase/firestore";
import { useState } from "react";
import Link from "next/link";

export default function Home({ recipes }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [filterBy, setFilterBy] = useState("name");

  function changePlaceholder() {
    const recipeSearch = document.getElementById("recipe-search");
    if (recipeSearch.placeholder === "Search recipe by name") {
      recipeSearch.placeholder = "Search by products";
      setFilterBy("products");
    } else {
      recipeSearch.placeholder = "Search recipe by name";
      setFilterBy("name");
    }
  }

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value;
    // setSearchInput(newSearchValue);

    if (newSearchValue === "") {
      setFilteredRecipes(recipes);
    } else if (filterBy === "name") {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(newSearchValue.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.ingredients.find((ingredients) =>
          ingredients.includes(newSearchValue)
        )
      );

      setFilteredRecipes(filtered);
    }
  };
  return (
    <main>
      <section className="py-5 text-center banner">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-bold">Гладни ли сте?</h1>
            <p className="lead">
              Вижте какво имате в хладилника и разберете какво може да си
              сготвите
            </p>
            <div className="input-group mb-3 search">
              <button
                className="btn btn-secondary"
                type="button"
                id="button-addon2"
                onClick={changePlaceholder}
              >
                <i className="bi bi-arrow-down-up"></i>
              </button>
              <input
                id="recipe-search"
                type="text"
                className="form-control"
                onChange={handleSearchChange}
                placeholder="Search recipe by name"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredRecipes.map((recipe) => {
              return (
                <div className="col" key={recipe.id}>
                  <div className="card shadow-sm">
                    <Link href={"/recipes/" + recipe.id}>
                      <img
                        src={`${recipe.image ? recipe.image : "nophoto.png"}`}
                        alt={recipe?.title}
                        className="card-image img-fluid"
                      />
                    </Link>
                    <div className="card-body text-black">
                      <div className="card-text">
                        <Link
                          href={"/recipes/" + recipe.id}
                          className="card-title"
                        >
                          <strong>{recipe.title}</strong>
                        </Link>
                      </div>
                      <div className="card-ingredients">
                        Products needed:
                        <blockquote className="card-ingredients">
                          {recipe.ingredients
                            .slice(0, 4)
                            .map((ingredient, index) => {
                              return index > 0 ? `, ${ingredient}` : ingredient;
                            })}
                          {recipe?.ingredients.length > 5 && " etc."}
                        </blockquote>
                      </div>
                      <div className="d-flex justify-content-between align-recipes-center mt-4 border-top pt-2">
                        <Link
                          href={"/recipes/" + recipe.id}
                          className="btn btn-sm btn-secondary"
                        >
                          View
                        </Link>
                        <small className="text-muted">
                          <i className="bi bi-hourglass-split"></i>
                          {recipe.time}min
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Link href="/new-recipe" className="float">
          <i className="bi bi-plus"></i>
        </Link>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const getRecipes = async () => {
    const recipeRef = await collection(firestore, "recipes");
    const q = query(recipeRef);
    const querySnapshot = await getDocs(q);
    const result = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        title: doc.data().title,
        time: doc.data().time,
        ingredients: doc.data().ingredients,
        image: doc.data().image,
      };

      result.push(data);
    });

    return result;
  };
  const recipes = await getRecipes();
  return { props: { recipes } };
}
