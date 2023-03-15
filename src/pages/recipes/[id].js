import { useRouter } from "next/router";
import { firestore } from "../../../firebase/clientApp";
import { collection, deleteDoc, doc, getDoc } from "@firebase/firestore";
import { storage } from "../../../firebase/clientApp";
import { ref, deleteObject } from "@firebase/storage";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const recipesCollection = collection(firestore, "recipes");

export default function Recipe() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const getRecipe = async () => {
    if (id) {
      const recipeRef = await collection(firestore, "recipes");
      const docRef = await doc(recipeRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setRecipe(docSnap.data());
      }
    }
  };
  const handleDelete = async () => {
    if (id) {
      const recipeRef = doc(recipesCollection, id);
      const storageRef = ref(storage, recipe.image);
      await deleteDoc(recipeRef);
      await deleteObject(storageRef);

      router.push("/");
    }
  };

  useEffect(() => {
    getRecipe();
  }, [id]);

  const canEdit = user && recipe.userId === user.uid;

  return (
    <div className="recipeContainer container">
      <div className="row">
        <div className="recipeImage col-6">
          <blockquote>
            <img
              src={`${recipe.image ? recipe?.image : "nophoto.png"}`}
              alt={recipe?.title}
              style={{ width: "100%", height: "auto" }}
            />
          </blockquote>
        </div>
        <div className="col-6">
          <h2 className="recipeTitle">
            {recipe?.title}{" "}
            {canEdit && (
              <>
                <Link href={"/update-recipe/" + id}>
                  <button
                    className="btn btn-sm btn-secondary"
                    style={{ marginRight: "10px" }}
                  >
                    EDIT
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleDelete}
                  style={{ backgroundColor: "#630c42" }}
                >
                  DELETE
                </button>
              </>
            )}
          </h2>
          <div className="recipeDetails row">
            <div className="col-12">
              <h6>Ingredients:</h6>

              <p>
                {recipe &&
                  recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => {
                    return index > 0 ? `, ${ingredient}` : ingredient;
                  })}
              </p>
            </div>
            <div className="col-6">
              <h6>Time needed:</h6>
              <p>{recipe?.time}min</p>
            </div>
            <div className="col-12">
              <h6>Instructions:</h6>
              <p>{recipe?.instructions}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr />
        </div>
      </div>
    </div>
  );
}
