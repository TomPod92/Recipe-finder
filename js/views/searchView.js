import { elements} from './base.js';

// --------get user input from search panel----------
export const getInput = () => elements.searchInput.value;

// --------------clear input field after a search button is clicked -----------
export const clearInput = () => {
    elements.searchInput.value = '';
};

// --------------clear recipe gallery results after a search button is clicked -----------
export const clearResults = () => {
  elements.searchResultList.innerHTML = '';  
};

// --------------format recipe title in recipe gallery section -----------
const limitRecipeTitle = (title, limit = 17) => {
    
    const newTitle = [];
    
    if (title.length > limit) {
        title.split(' ').reduce( (previous, current) => {
            if(previous + current.length <= limit) {
                newTitle.push(current);
            }
            return previous + current.length;
        }, 0);
        
        return `${newTitle.join(' ')} ...`;
    } 
    
    return title;
};

// --------------render recipes in recipe gallery after a search button is clicked -----------
const renderRecipe = recipe => {
    
    const url = recipe.image_url;

    const markup = `<div class="item" style="background-image: linear-gradient(rgba(59, 59, 59, 0.2), rgba(59, 59, 59, 0.2)), url(${recipe.image_url}"><h4>${limitRecipeTitle(recipe.title)}</h4><p>45<span>min</span></p></div>`;     
    
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};


