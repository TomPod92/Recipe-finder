import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }
    
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count: count,
            unit: unit,
            ingredient: ingredient
        }
        console.log('it works');
        this.items.push(item);
        return item;
    }
    
    deleteItem(id) {
        const index = this.items.findIndex(current => current.id === id);
        this.items.splice(index, 1);
    }
    
    updateCount(id, newCount) {
        this.items.find(current => current.id === id).count = newCount;
    }
}