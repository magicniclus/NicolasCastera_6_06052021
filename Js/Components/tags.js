// Création des tags pour le header

class Tags {
    /**
     * [constructor description]
     *
     * @param   {String}  props      nom du tag
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Function}  callback
     * 
     */
    constructor (props, domTarget, callback) {
        this.valide = false;
        this.DOM = document.createElement('button');
        //this.DOM.classList.add('tag')
        domTarget.appendChild(this.DOM);
        this.DOM.innerHTML = `#${props}`;
        this.DOM.onclick = () => {
            callback(props);
            console.log(this.valide);
        this.valide = !this.valide;
        this.DOM.classList.toggle("active"); 
        };
    }
}