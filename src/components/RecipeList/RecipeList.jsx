import React, { useState, useEffect } from 'react';
import { useRecipeStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import './RecipeList.scss';

export const RecipeList = () => {
  const {
    recipes,
    selectedRecipes,
    updateRecipes,
    updateVisibleRecipes,
    toggleRecipes,
    deleteSelectedRecipes
  } = useRecipeStore();
  
  const navigate = useNavigate();
  const mainUrl = window.location.href;
  
  let [fetchPage, setFetchPage] = useState(1);
  let { visibleRecipes } = useRecipeStore();


  useEffect(() => {
    updateRecipes(fetchPage);
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleLeftClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleRightClick = (event, recipe) => {
    event.preventDefault();
    toggleRecipes(recipe);
  };

  const handleDelete = () => {
    deleteSelectedRecipes();
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && window.location.href === mainUrl) {
      visibleRecipes = updateVisibleRecipes();

      if (visibleRecipes % 25 === 0) {
        setFetchPage(fetchPage += 1);
        updateRecipes(fetchPage);
      }
    }
  }

  return (
    <>
    <h1>Beer Recipes</h1>
    
    <div className="recipes">
      {!recipes
        ? <Loader />
        : recipes.slice(0, visibleRecipes).map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleLeftClick(recipe)}
            onContextMenu={(event) => handleRightClick(event, recipe)}
            className={`recipe-card ${selectedRecipes.includes(recipe) ? "selected" : ""}`}
            style={{ backgroundColor: selectedRecipes.includes(recipe) ? 'lightblue' : 'white' }}
          >
            <div className="content">
              <h3 className="content__name">{recipe.name}</h3>
              <p className="content__description">{recipe.description}</p>
            </div>
          </div>
        ))}

      {selectedRecipes.length > 0 && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
    </>
  );
};
