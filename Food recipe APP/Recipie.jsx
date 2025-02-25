import React, { useState, useEffect } from 'react';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });
  const [editindex, setEditindex] = useState(null);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert("All fields are required!");
      return;
    }

    if (editindex !== null) {
      // Update existing recipe
      const updatedRecipes = [...recipes];
      updatedRecipes[editindex] = newRecipe;
      setRecipes(updatedRecipes);
      setEditindex(null);
    } else {
      // Add new recipe
      setRecipes([...recipes, newRecipe]);
    }

    setNewRecipe({ title: '', ingredients: '', instructions: '' });
  };

  const handleDelete = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const handleedit = (index) => {
    setNewRecipe(recipes[index]);
    setEditindex(index);
  };

  return (
    <center style={{ backgroundColor:"grey",border :"1px dashed black", width:"50%",marginLeft:"25%",marginTop:"5%",borderRadius:"10px" ,height:"auto"}}>
      <div>
        <h1>Food Recipe App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Dish Name<br />
            <input type="text" name="title" value={newRecipe.title} onChange={handleChange}  />
          </label><br />
          <label>
            Ingredients<br />
            <input type="text" name="ingredients" value={newRecipe.ingredients} onChange={handleChange}  />
          </label><br />
          <br/>
          <label>
            Instructions<br />
            <input type="text" name="instructions" value={newRecipe.instructions} onChange={handleChange}  />
          </label><br /><br />
          <button type="submit">{editindex !== null ? "Update Recipe" : "Add Recipe"}</button>
        </form>

        <h2>Recipes</h2>
        <div className='main'>
          {recipes.length === 0 ? <p>No recipes added yet.</p> : (
            <table border={3} style={{backgroundColor:"ghostwhite",marginBottom:"5px"}}>
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Ingredients</th>
                  <th>Instructions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr key={index}>
                    <td>{recipe.title}</td>
                    <td>{recipe.ingredients}</td>
                    <td>{recipe.instructions}</td>
                    <td>
                      <button onClick={() => handleDelete(index)}>Delete</button>&nbsp;
                      <button onClick={() => handleedit(index)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </center>
  );
}

export default Recipe;
