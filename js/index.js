// f4b61fe97ed4569ed4d0c2eb3e4f14b6 
// http://food2fork.com/api/search 
import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import { elements, renderSpinner, clearSpinner } from './views/base.js';

// ------- State of the whole app --------
const state = {};



//------------------------------------------------------------------
// ------------------- SEARCH FORM CONTROLLER ----------------------
//------------------------------------------------------------------
const controlSearch = async () => {
    // Get the query from view
    //const query = searchView.getInput();
    const query = 'pizza';
    //console.log(query);
    
    if(query) {
        // creat new search object and add it to state
        state.search = new Search(query);
        
        // clear previous results and render spinner
        searchView.clearInput();
        searchView.clearResults();
        renderSpinner(elements.searchResultContainer);        
        
        try {
            // search for recipes
            await state.search.getResults();
            console.log(state.search.result);

            // render results on user interface
            clearSpinner();
            searchView.renderResults(state.search.result);
            
        } catch(error) {
            alert('Ups, there is something wrong with the search');
            clearSpinner();
        }
    }
}

// ------------ Event that happens after clicking on search button -----------
elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();    
});

window.addEventListener('load', (event) => {
    event.preventDefault();
    controlSearch();    
});



// ----------- Events for left and right buttons ----------------------
elements.searchResultContainer.addEventListener('click', event => {
    const button = event.target.closest('.next');

    if(button) {
        const goToPage = parseInt(button.dataset.gotopage, 10);
        searchView.clearResults();
        searchView.removeButton();
        searchView.renderResults(state.search.result, goToPage);
    }
});


//------------------------------------------------------------------
// ------------------- FULL RECIPE CONTROLLER ----------------------
//------------------------------------------------------------------

// get full recipe details from API based on id
const controlRecipe = async (id) => {
    const recipeId = id;
    
    if(recipeId) {
        // creat new recipe object and add it to state
        state.recipe = new Recipe(recipeId);
        
        // clear previous results and render spinner
        recipeView.clearResults();
        renderSpinner(elements.fullRecipeContainer);
        
        try {
            // search for a recipe
            await state.recipe.getRecipe();
        
            // render results on user interface
            console.log(state.recipe);
            
            clearSpinner();
            recipeView.renderFullRecipe(state.recipe);
            
        } catch (error) {
            alert('Something went wrong during recipe processing, please try again.')
        }   
    }
}

// ------------ Event that happens after clicking on single recipe -----------
document.querySelector('.grid-container').addEventListener('click', (event) => { 
    let id;
    
    if( event.target.className){
        id = event.target.dataset.recipeid;
        console.log(id);
    } else {
        id = event.target.parentNode.dataset.recipeid;
        console.log(id);
    }

    controlRecipe(id);
});




