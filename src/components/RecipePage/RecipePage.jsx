import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from '../../store';
import './RecipePage.scss';

export const RecipePage = () => {
  const { recipes } = useRecipeStore();
  const { recipeId } = useParams();
  
  const recipe = recipes.find((recipe) => recipe.id === +recipeId);
  
  const {
    name,
    image_url,
    description,
    abv,
    ibu,
    attenuation_level,
    contributed_by,
    food_pairing,
    ingredients: {hops, malt, yeast},
  } = recipe;
  
  const getIngredientListItems = (ingredient) => (
    <ul>
      {ingredient.map(({ name, amount: { unit, value } }, index) => (
        <li className="beer__info--list" key={index}>
          {name}: {value} {unit}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h1>{name} recipe</h1>

      <article className="beer">
        <div className="beer__image">
          <img
            src={image_url}
            alt="beer image"
            className="beer__image--img"  
          />
        </div>

        <div>
          <p className="beer__info">
            <span className="beer__info--title">Name:</span>
            {name}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">Description:</span>
            {description}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">ABV:</span>
            {abv}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">IBU:</span>
            {ibu}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">Attenuation level:</span>
            {attenuation_level}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">Contributed by:</span>
            {contributed_by}
          </p>

          <p className="beer__info">
            <span className="beer__info--title">Food pairing:</span>
            <ul>
              {food_pairing.map((item) => (
                <li className="beer__info--list" key={item}>{item};</li>
              ))}
            </ul>
          </p>

          <p className="beer__info">
            <span className="beer__info--title">Ingredients:</span>
            <ul>
              <li className="beer__info--list">{getIngredientListItems(hops)}</li>
              <li className="beer__info--list">{getIngredientListItems(malt)}</li>
              <li className="beer__info--list">{yeast}</li>
            </ul>
          </p>
        </div>
      </article>
    </>
  );
};