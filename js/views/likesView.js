import {elements} from './base.js';



// --------------format recipe title in likes gallery section -----------
const limitRecipeTitle = (title, limit = 17) => {
    
    const newTitle = [];
    
    if (title.length > limit) {
        title.split(' ').reduce( (previous, current) => {
            if(previous + current.length <= limit) {
                newTitle.push(current);
            }
            return previous + current.length;
        }, 0);
        
        return `${newTitle.join(' ')} ...`;
    } 
    
    return title;
};

// -------------------------- creat,render and remove page buttons -----------------------------------
const creatButton = (page, side) =>`<div class="likes-next ${side}-arrow" id="${side}" data-gotopage=${side == 'left'? page - 1 : page + 1}><ion-icon name="arrow-drop${side}"></ion-icon></div>`;

const renderButtons = (page) => {
    let markup;
    
    if (page === 1) {
        // no left button
        markup = creatButton(1, 'right');
        
    } else if (page === 2) {
        // both buttons
        markup = `${creatButton(2, 'left')}${creatButton(2, 'right')}`;
                    
    } else if (page === 3) {
        // no right button
        markup = creatButton(3, 'left');        
    }
    
    elements.likeButtonContainer.insertAdjacentHTML('beforeend', markup);
};

export const removeButton = () => {
    elements.likeButtonContainer.innerHTML = '';
};

// --------------render like in likes gallery after a like button is clicked -----------
export const renderResults = (likes, page = 1, resultsPerPage = 9) => { 
    console.log(likes);
    elements.likesList.innerHTML = '';
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    likes.slice(start, end).forEach(renderLike);

    renderButtons(page);
};

const renderLike = like => {
    
    const url = like.image;

    const markup = `<div class="like-item" style="background-image: linear-gradient(rgba(59, 59, 59, 0.2), rgba(59, 59, 59, 0.2)), url(${like.image}" data-recipeid=${like.id}><h4>${limitRecipeTitle(like.title)}</h4><p>45<span>min</span></p></div>`;     
    elements.likesList.insertAdjacentHTML("beforeend", markup);
}

// -------------- change like button icon if necessary -----------

export const toggleLikeButton = isLiked => {   
    if(isLiked)  document.querySelector('.full-recipe-likes').setAttribute('name', 'heart');
    else  document.querySelector('.full-recipe-likes').setAttribute('name', 'heart-empty');
};

