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
    
    calcTime() {
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }
    
    calcServings() { 
        this.servings = 4; 
    }
    
    standardizeIngredients() {
        
        const units = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const newUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        
        const newIngredients = this.ingredients.map( (current) => {
            // unform units
            let ingredient = current.toLowerCase();
            
            units.forEach( (currentUnit, index) => {
               ingredient = ingredient.replace(currentUnit, newUnits[index] ) 
            });
            
            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // parse ingredients into count, unit and ingredient
            const arrayIngredient = ingredient.split(' ');
            const unitIndex = arrayIngredient.findIndex(element => newUnits.includes(element));
            
            let objectIngredient;
            
            if (unitIndex > -1) {
                // there is a unit in that ingredient
                const arrayCount = arrayIngredient.slice(0, unitIndex); 
                let count;
                
                if (arrayCount.length === 1) {count = eval(arrayIngredient[0].replace('-','+'));} 
                else {count = eval(arrayIngredient.slice(0, unitIndex).join('+')) ;}
                
                objectIngredient = {
                    count: Math.round(count*10)/10,
                    unit: arrayIngredient[unitIndex],
                    ingredient: arrayIngredient.slice(unitIndex+1).join(' ')
                };
                if(isNaN(objectIngredient.count)) {
                    objectIngredient.count =  1;
                }
                
            } else if (parseInt(arrayIngredient[0], 10)) {
                // there is no unit, but first element is a number
                objectIngredient = {
                    count: Math.round(parseInt(arrayIngredient[0], 10)*10)/10,
                    unit: '',
                    ingredient: arrayIngredient.slice(1).join(' ')
                };
                
                if(isNaN(objectIngredient.count)) {
                    objectIngredient.count =  1;
                }
            } else if(unitIndex === -1) {
                // there is no unit in that ingredient
                
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                };
            }
            
            
            return objectIngredient;
        });
        
        this.ingredients = newIngredients;
    }
    
    updateServings(type) {
        // update servings
        const newServings = type === 'increase' ? this.servings + 1 : this.servings - 1
        
        // update ingredients
        this.ingredients.forEach(current => {
            current.count = current.count * (newServings / this.servings);
        })
        
        this.servings = newServings;
      
    }
}
