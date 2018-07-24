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

// -------------------------- creat,render and remove page buttons -----------------------------------
const creatButton = (page, side) =>`<div class="next ${side}-arrow" id="${side}" data-gotopage=${side == 'left'? page - 1 : page + 1}><ion-icon name="arrow-drop${side}"></ion-icon></div>`;

const renderButtons = (page) => {
    let markup;
    
    if (page === 1) {
        // no left button
        markup = creatButton(1, 'right');   
    } else if (page === 2) {
        // both buttons
        markup = `${creatButton(2, 'left')}${creatButton(2, 'right')}`;
    } else if (page === 3) {
        // both buttons
        markup = `${creatButton(3, 'left')}${creatButton(3, 'right')}`;         
    } else if (page === 4) {
        // both buttons
        markup = `${creatButton(4, 'left')}${creatButton(4, 'right')}`;           
    } else if (page === 5) {
        // both buttons
        markup = `${creatButton(5, 'left')}${creatButton(5, 'right')}`;       
    } else if (page === 6) {
        // both buttons
        markup = `${creatButton(6, 'left')}${creatButton(6, 'right')}`;          
    } else if (page === 7) {
        // no right button
        markup = creatButton(6, 'left');          
    }
    
    elements.buttonContainer.insertAdjacentHTML('beforeend', markup);
};

export const removeButton = () => {
    elements.buttonContainer.innerHTML = '';
};

// --------------render recipes in recipe gallery after a search button is clicked -----------
export const renderResults = (recipes, page = 1, resultsPerPage = 9) => { 
    if(window.innerWidth < 601) resultsPerPage = 4;
    
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page);
};

const renderRecipe = recipe => {
    
    const url = recipe.image_url;

    const markup = `<div class="item" style="background-image: linear-gradient(rgba(59, 59, 59, 0.2), rgba(59, 59, 59, 0.2)), url(${recipe.image_url}" data-recipeid=${recipe.recipe_id}><h4>${limitRecipeTitle(recipe.title)}</h4><p>45<span>min</span></p></div>`;     
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
}




