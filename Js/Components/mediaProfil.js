//Ajout des media en fonction de leurs type

class MediaProfil {
    constructor(data, domTarget, callbacks) {
        this.DOM = document.createElement("article");
        this.DOM.setAttribute("class", 'photographerImg')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
        this.DOM.onclick = ()=>callbacks.lightbox(data);
        this.likeCallback = callbacks.likes;
        this.liked = false;
        this.render();
    }

    render() {
        this.DOM.innerHTML = this.image ? this.templateImage() : this.templateVideo();
        const bottom = document.createElement("div");
        this.DOM.appendChild(bottom);
        bottom.innerHTML = `
                    <div class="bottomLeft">
                        <span class="titleImg">${this.title}</span>
                        <span class="priceImg">${this.price}<span class="sigle">€</span></span>
                    </div>    
        `;
        this.showLikes(bottom);
    }


    templateImage() {
        return `<img class="photoImg" src="Sample_Photos/${this.image}" alt="${this.title}"> `;
    }

    templateVideo() {
        return `<video autoplay loop> 
                        <source src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.title}">
                    </video> 
        `;
    }

    showLikes(domTarget){
        const container = document.createElement("div");
        //container.className = "likeGlobal";
        container.innerHTML = `
                        <span class="likesImg">${this.likes}</span>
                        <i class="fas fa-heart"></i>
                        `;
        container.onclick = this.likeClick.bind(this);
        domTarget.appendChild(container);
    }
    likeClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.liked = !this.liked;
        if (this.liked) this.likes++;
        else this.likes--;
        this.likeCallback(this.liked);
        this.render();
    }
}