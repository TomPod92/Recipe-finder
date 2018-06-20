// f4b61fe97ed4569ed4d0c2eb3e4f14b6 
// http://food2fork.com/api/search 

import axios from 'axios';

async function getResults(query) {
    const key = `f4b61fe97ed4569ed4d0c2eb3e4f14b6`;
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
   
}

getResults('pasta');