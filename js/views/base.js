export const elements = {
    searchForm: document.querySelector('.form'), 
    searchInput: document.querySelector('.search-field'),
    searchResultContainer: document.querySelector('.upper'),
    searchResultList: document.querySelector('.grid-container'),
    buttonContainer: document.querySelector('.button-container'),
    fullRecipeContainer: document.querySelector('.left'),
    row: document.querySelector('.row')
}

export const renderSpinner = (parent) => {
    const loader = `<ion-icon name="refresh" class="loader"></ion-icon>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearSpinner = () => {
    const loader = document.querySelector('.loader');
    loader.parentElement.removeChild(loader);
};