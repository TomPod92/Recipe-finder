import {elements} from './base.js';


// clear previous full recipe before loading new one
export const clearResults = () => {
    elements.fullRecipeContainer.innerHTML = '';
};


// render full recipe
export const renderFullRecipe = (recipe) => {
    const markup = `
                <div class="box">
                    <div class="full-recipe-photo"><img src="${recipe.image}" alt="${recipe.title}"></div>
                    <h4 class="full-recipe-header">${recipe.title}</h4>
                    <ion-icon name="heart-empty" class="full-recipe-likes"></ion-icon>
                </div>

                <div class="full-recipe-details">
                    <div class="details-buttons">
                        <div class="timer">
                            <ion-icon name="timer"></ion-icon><span class="minutes">45</span>minutes
                        </div>
                        <div class="number">
                            <ion-icon name="people"></ion-icon><span class="servings">2</span>servings
                            <ion-icon name="add-circle"></ion-icon>
                            <ion-icon name="remove-circle"></ion-icon>
                        </div>
                    </div>
                </div>

                <div class="full-recipe-ingredients">
                    <ul class="ingredients-list">
                        ${renderIngredientsList(recipe.ingredients)}    
                    </ul>
                </div>

                <div class="full-recipe-buttons">
                    <button class="button button-cart">Add to shopping cart<ion-icon name="cart"></ion-icon></button>

                    <button class="button button-cook"><a href="${recipe.url}" target="_blank">How to cook it</a><ion-icon name="restaurant"></ion-icon></button>
                </div>
    `;
    elements.fullRecipeContainer.insertAdjacentHTML("beforeend", markup);
    renderIngredientsList(recipe.ingredients);
};


// render ingredients list
const renderIngredientsList = (recipeList) => {
    let markup = ``;
    
    recipeList.forEach( (current) => {
        markup += `
                    <li class="ingredients-list-item">
                        <ion-icon name="arrow-round-forward" class="bulletpoint"></ion-icon>
                        <span class="count">1</span>
                        <span class="unit">kg</span>
                        <span class="description">${current}</span>
                    </li>
                `;  
    });
    return markup;   
}
