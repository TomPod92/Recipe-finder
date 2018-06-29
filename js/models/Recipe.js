import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const key = `f4b61fe97ed4569ed4d0c2eb3e4f14b6`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;

            const result = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            //console.log(result);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
            
        } catch (error) {
            console.log(error);
            alert('Ups, something went wrong, please try again.')
        }
    }
}
