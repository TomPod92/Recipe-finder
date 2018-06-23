import { elements} from './base.js';

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const markup = `<div class="item" id="${recipe.recipe_id} style="background-image: linear-gradient(rgba(59, 59, 59, 0.45), rgba(59, 59, 59, 0.45)), url('${recipe.image.url}');"><h4>${recipe.title}</h4><p>45<span>min</span></p></div>`;
    
    document.querySelector('.container').insertAdjacentHTML("beforeend", markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}
