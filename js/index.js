// f4b61fe97ed4569ed4d0c2eb3e4f14b6 
// http://food2fork.com/api/search 
import Search from './models/Search.js';
import * as searchView from './views/searchView.js';
import { elements, renderSpinner, clearSpinner } from './views/base.js';

// ------- State of the whole app --------
const state = {};





const controlSearch = async () => {
    // Get the query from view
    const query = searchView.getInput();
    console.log(query);
    
    if(query) {
        // creat new search object and add it to state
        state.search = new Search(query);
        
        // clear previous results and render spinner
        searchView.clearInput();
        searchView.clearResults();
        renderSpinner(elements.searchResultContainer);        
        
        // search for recipes
        await state.search.getResults();
        console.log(state.search.result);
        
        // render results on user interface
        clearSpinner();
        searchView.renderResults(state.search.result);
    }
    
}





// ------------ Event that happens after clicking of search button -----------
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



