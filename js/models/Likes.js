export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike(id, title, image) {
        const like = {
            id: id,
            title: title,
            image: image
        }
            this.likes.push(like);
            return like;
        
    }
    
    deleteLike(id) {
        const index = this.likes.findIndex(current => current.id === id);
        this.likes.splice(index, 1)
    }
    
    checkIfLiked(id) {
        return this.likes.findIndex(current => current.id === id) !== -1;
    }    
    
}