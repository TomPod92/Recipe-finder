// f4b61fe97ed4569ed4d0c2eb3e4f14b6 
// http://food2fork.com/api/search 
import Search from './models/Search.js';
import * as searchView from './views/searchView.js';
import { elements } from './views/base.js';

// -------State of the whole app--------
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
        
        // search for recipes
        await state.search.getResults();
        console.log(state.search.result);
        
        // render results on user interface
        searchView.renderResults(state.search.result);
    }
    
}






elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();    
});



