import {elements} from './base.js';


// render single item in shopping list
export const renderItem = (item) => {
    const markup = `
    <div class="shopping-list-item  clearfix" data-itemid=${item.id}>
        <div><input type="number" min="0" value="${item.count}" step="${item.count}" class="list-input"></div>
        <div class="list-unit">${item.unit} </div>
        <div class="list-description">${item.ingredient}</div>
        <div class="list-button">
            <ion-icon name="trash"></ion-icon>
        </div>
    </div>
    `;
    
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};


//delete specific item form shopping list
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if(item) item.parentElement.removeChild(item);
};