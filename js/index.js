// f4b61fe97ed4569ed4d0c2eb3e4f14b6 
// http://food2fork.com/api/search 
import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import List from './models/List.js';
import Likes from './models/Likes.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import * as listView from './views/listView.js';
import * as likesView from './views/likesView.js';
import * as scrollView from './views/scrollView.js';
import { elements, renderSpinner, clearSpinner } from './views/base.js';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

// ------- State of the whole app --------
const state = {};

window.state = state;
state.likes = new Likes();
//------------------------------------------------------------------
// ------------------- SEARCH FORM CONTROLLER ----------------------
//------------------------------------------------------------------
const controlSearch = async () => {
    // Get the query from view
    const query = searchView.getInput();

    if(query) {
        // creat new search object and add it to state
        state.search = new Search(query);
        
        // clear previous results, render spinner and scroll to next section
        searchView.clearInput();
        searchView.clearResults();
        renderSpinner(elements.searchResultContainer); 
        scrollView.scrollIt(elements.searchResultContainer);
        
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
            console.log(error);
        }
    }
};

// ------------ Event that happens after clicking on search button -----------
elements.searchForm.addEventListener('submit', (event) => {
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
        
        // clear previous results, render spinner and scroll to next section
        recipeView.clearResults();
        renderSpinner(elements.fullRecipeContainer);
        scrollView.scrollIt(elements.test);
        
        
        try {
            // search for a recipe and standardize ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.standardizeIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
        
            // render results on user interface
            console.log(state.recipe);
            
            clearSpinner();
            recipeView.renderFullRecipe(state.recipe, state.likes.checkIfLiked(recipeId));
            
        } catch (error) {
            alert('Something went wrong during recipe processing, please try again.');
            console.log(error);
        }   
    }
};

// ------------ Event that happens after clicking on single recipe -----------
elements.searchResultList.addEventListener('click', (event) => { 
    let id;
    
    if (event.target.className){
        id = event.target.dataset.recipeid;
        console.log(id);
    } else {
        id = event.target.parentNode.dataset.recipeid;
        console.log(id);
    }

    controlRecipe(id);
});


// ------------ Event that happens after clicking on increase or desrease servings -----------
elements.fullRecipeContainer.addEventListener('click', (event) => {
    if (event.target.closest('.increase')) {
        state.recipe.updateServings('increase');
        recipeView.updateServingsIngredients(state.recipe);
        //console.log('increase was clicked');
    } else if (event.target.closest('.decrease')) {
        //console.log('decrease was clicked');
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('decrease');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
});

//------------------------------------------------------------------
// ------------------ SHOPPING LIST CONTROLLER ---------------------
//------------------------------------------------------------------
window.l = new List();


// ------------ Event that happens after clicking on "add to shopping cart" -----------
elements.fullRecipeContainer.addEventListener('click', event => {
    if(event.target.closest('.button-cart')){
        controlList();
    } 
});

const controlList = () => {
    // creat new list if there is none yet
    if(!state.list) state.list = new List();
    
    // add each ingredient to the list and render it in UI
    state.recipe.ingredients.forEach(current => {
        const item = state.list.addItem(current.count, current.unit, current.ingredient);
        listView.renderItem(item);
    }); 
    document.querySelector('.button-cart').style.display="none";
};

// ------------ Removing specific item from shopping cart and update shopping list -----------

elements.shoppingList.addEventListener('click', (event) => {
    const id = event.target.closest('.shopping-list-item').dataset.itemid;
    
    // delete button
    if(event.target.matches('.list-button, .list-button *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } 
    // update count
    else if (event.target.matches('.list-input')) {
        const value = parseFloat(event.target.value, 10);
        state.list.updateCount(id, value);
    }
});


//------------------------------------------------------------------
// ------------------ LIKES LIST CONTROLLER ---------------------
//------------------------------------------------------------------

elements.fullRecipeContainer.addEventListener('click', event => {
   let id;
    
    if (event.target.matches('.full-recipe-likes, .full-recipe-likes *')){
        id = event.target.dataset.recipeid;
        console.log('it works');
        console.log(event.target);
        controlLike();
    }
});


const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    
    const currentID = state.recipe.id;
    
    if(!state.likes.checkIfLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.image)
        // Toggle like button
        likesView.toggleLikeButton(true);
        // Add like to UI
        likesView.renderResults(state.likes.likes);
        console.log(state.likes);
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);
        // Toggle like button
        likesView.toggleLikeButton(false);
        // Remove like from UI
        likesView.renderResults(state.likes.likes);
        console.log(state.likes);
    }
    
     //if there are no liked recipes, hide "all liked recipes" button
    if(state.likes.likes.length > 0) {
        document.querySelector('.allLikedRecipes').classList.add("show");
    }  else {
        document.querySelector('.allLikedRecipes').classList.remove("show");
    }
};

// ----------- Events for left and right buttons in likes section ----------------------
elements.likesGallery.addEventListener('click', event => {
    const button = event.target.closest('.likes-next');

    if(button) {
        const goToPage = parseInt(button.dataset.gotopage, 10);
        likesView.removeButton();
        likesView.renderResults(state.likes.likes, goToPage);
    }
});

// ------------ Event that happens after clicking on single recipe in likes section -----------
elements.likesList.addEventListener('click', (event) => { 
    let id;
    
    if (event.target.className){
        id = event.target.dataset.recipeid;
        console.log(id);
    } else {
        id = event.target.parentNode.dataset.recipeid;
        console.log(id);
    }

    controlRecipe(id);
});


//------------------------------------------------------------------
// ----------------------- PRINT CONTROLLER ------------------------
//------------------------------------------------------------------

// !!!!!!!!!!!!!IT WORKS BUT CUTS HALFWAY!!!!!!!!!
//document.querySelector('.print-button').addEventListener('click', ()=> {
//    const element = document.getElementById("testing");
//
//    html2canvas(element).then(function(canvas) {
//        // Export the canvas to its data URI representation
//            const img = canvas.toDataURL("image/png");
//            let doc = new jspdf();
//                doc.addImage(img, 'JPEG', 0, 0);
//                doc.save('test.pdf');
//        // Open the image in a new window
//        //window.open(base64image , "_blank");
//    });
//});

// !!!!!!!!!!! IT WORKS !!!!!!!!!!!!!!
document.querySelector('.print-button').addEventListener('click', () => {

    makeNewPdf(state.list.items);
});

const makeNewPdf = (list) => {
    let doc = new jspdf();
    const fontSize = 16;
    const offsetY = 4.797777777777778;
    const lineHeight = 6.49111111111111;

    doc.setFontSize(fontSize)

    list.forEach((current, index) => {
        doc.text(10, 10 + lineHeight * index + offsetY, `${current.count} ${current.unit} ${current.ingredient}`);
    })
    doc.save('shopping-list.pdf');
};


// !!!!!!!!!!!!!!!!!!!!! IT WORKS PERFECTLY !!!!!!!!!!!!!!!!
//document.querySelector('.print-button').addEventListener('click', () => {
//
//    makeNewPdf();
//});
//
//const makeNewPdf = () => {
//    var pdf = new jspdf();
//
//    const fontSize = 16;
//    const offsetY = 4.797777777777778;
//    const lineHeight = 6.49111111111111;
//
//    pdf.setFontSize(fontSize);
//
//    pdf.text(10, 10 + lineHeight * 0 + offsetY, 'This is a template to make a jsPDF document.');
//    pdf.text(10, 10 + lineHeight * 1 + offsetY, 'You can modify the PDF document by changing the code in script.js.');
//    pdf.text(10, 10 + lineHeight * 2 + offsetY, 'You can use this template to quickly preview your jsPDF codes.');
//    pdf.save('test.pdf');
//    return pdf;
//
//};

 