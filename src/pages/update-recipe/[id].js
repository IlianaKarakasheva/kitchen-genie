import { useState } from "react";
import { ingredients } from "../../../public/ingredients.json";
import Select from "react-select";
import { firestore, storage } from "../../../firebase/clientApp";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
export default function UpdateRecipe({ recipe }) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const { id } = router.query;

  const [formData, setFormData] = useState(recipe);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setFormData({ ...formData, image: event.target.files[0] });
      setErrors({ ...errors, image: null });
    }
  };

  const onRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImage(null);
  };

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFormData = (formData) => {
    const errors = {};
    if (formData.title.trim() === "") {
      errors.title = "Please enter title";
    }
    if (formData.time <= 0) {
      errors.time = "Please enter time";
    }
    if (formData.instructions.trim() === "") {
      errors.instructions = "Please enter instructions";
    }
    if (formData.ingredients.length === 0) {
      errors.ingredients = "Please add ingredients";
    }
    if (formData.image === null) {
      errors.image = "Please upload image";
    }
    return errors;
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const errors = validateFormData(formData);
      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        let imageUrl = "";
        const imagesRef = ref(storage, `images/${formData.title}`);

        if (image) {
          await uploadBytes(imagesRef, formData.image);
          imageUrl = await getDownloadURL(imagesRef);
        } else {
          imageUrl = formData.image;
        }

        const updatedRecipe = {
          image: imageUrl,
          title: formData.title,
          time: Number(formData.time),
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          userId: user.uid,
        };

        const docRef = doc(firestore, "recipes", id);
        await setDoc(docRef, updatedRecipe);

        setFormData({
          image: null,
          title: "",
          time: 0,
          ingredients: [],
          instructions: "",
        });

        router.push("/recipes/" + id);
      }
    } catch (error) {
      setErrors({ ...errors, firebase: error.message });
    }
  };

  const options = ingredients.map((ingredient) => {
    return { value: ingredient, label: ingredient };
  });

  const onSelect = (option) => {
    const data = option.map((option) => option.value);
    setFormData({ ...formData, ingredients: [...data] });
  };
  const preselectedOptions = options.filter((option) => {
    if (formData.ingredients.includes(option.value)) {
      return option;
    }
  });

  return (
    <div className="addRecipe container ">
      <div className="newRecipe row align-items-center justify-content-center mt-4">
        <h4>Edit your recipe</h4>
        <form className="col-12 d-flex flex-row">
          <div className="image col-6 flex-column d-flex justify-content-center">
            {!formData.image && "Pick a photo of your dish:"}
            {formData.image && (
              <img
                src={image ? image : formData.image}
                alt="preview image"
                className="selectedPhoto"
              />
            )}
            <input
              type="file"
              onChange={onImageChange}
              required
              placeholder=""
            />
            {errors.image && (
              <span className="error text-danger"> {errors.image}</span>
            )}
            {errors.firebase && (
              <span className="error text-danger"> {errors.firebase}</span>
            )}

            {image && (
              <button
                type="submit"
                onClick={onRemoveImage}
                className="btn btn-sm btn-secondary col-2 me-2 mt-4 mb-3"
              >
                Remove
              </button>
            )}
          </div>
          <div className="col-6">
            <div className="title">
              <strong>Label your dish:</strong>
              <input
                value={formData.title}
                type="text"
                className="form-control"
                placeholder="Dish Title"
                name="title"
                onChange={onInputChange}
                required
              />
              {errors.title && (
                <span className="error text-danger"> {errors.title}</span>
              )}
              {errors.firebase && (
                <span className="error text-danger"> {errors.firebase}</span>
              )}
            </div>
            <div className="content">
              <div className="time">
                <strong>How long does it take to cook?</strong>
                <input
                  value={formData.time}
                  type="number"
                  className="form-control"
                  placeholder="Time Needed"
                  name="time"
                  onChange={onInputChange}
                  required
                />
                {errors.time && (
                  <span className="error text-danger"> {errors.time}</span>
                )}
                {errors.firebase && (
                  <span className="error text-danger"> {errors.firebase}</span>
                )}
              </div>
              <div className="ingredients">
                <strong>Ingredients needed:</strong>
                <Select
                  value={preselectedOptions}
                  options={options}
                  isMulti
                  onChange={onSelect}
                />
                {errors.ingredients && (
                  <span className="error text-danger">
                    {" "}
                    {errors.ingredients}
                  </span>
                )}
                {errors.firebase && (
                  <span className="error text-danger"> {errors.firebase}</span>
                )}
              </div>
              <div className="instructions">
                <strong>Instructions:</strong>
                <textarea
                  value={formData.instructions}
                  rows="9"
                  type="text"
                  className="form-control"
                  placeholder="Instructions"
                  name="instructions"
                  onChange={onInputChange}
                  required
                />
                {errors.instructions && (
                  <span className="error text-danger">
                    {" "}
                    {errors.instructions}
                  </span>
                )}
                {errors.firebase && (
                  <span className="error text-danger"> {errors.firebase}</span>
                )}
              </div>
            </div>
            <Link href={"/recipes/" + id}>
              <button
                type="submit"
                className="btn btn-sm btn-primary me-2 mt-4 mb-3"
              >
                Cancel
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-secondary me-2 mt-4 mb-3"
              onClick={onFormSubmit}
            >
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const getRecipe = async () => {
    if (id) {
      const recipeRef = await collection(firestore, "recipes");
      const docRef = await doc(recipeRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        const recipe = docSnap.data();
        return {
          image: recipe.image,
          title: recipe.title,
          time: recipe.time,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        };
      }
    }
  };
  const recipe = await getRecipe();
  return { props: { recipe } };
}
