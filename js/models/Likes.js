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
        
            this.persistData();
            return like;
        
    }
    
    deleteLike(id) {
        const index = this.likes.findIndex(current => current.id === id);
        this.likes.splice(index, 1)
        this.persistData();
    }
    
    checkIfLiked(id) {
        return this.likes.findIndex(current => current.id === id) !== -1;
    }
    
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        if(storage) this.likes = storage;
    }
    
}