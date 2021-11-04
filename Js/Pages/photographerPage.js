// Gestion de l'affichage de la page photographe

class PhotographerPage {

    price;
    totalLikes;
    banniere;

    constructor(props, domTarget) {
        this.dataManager = new DataManager(props);
        this.DOM = domTarget;
        this.id = parseInt(window.location.search.slice(4));
        this.filters = [
            "Popularité",
            "Date",
            "Titre"
        ];
        this.currentFilter = this.filters[0];
        this.firstRender();
    }


    /**
     * Gestion des premiers affichage des éléments statiques
     *
     * @return  {HTMLElement} 
     */
    async firstRender() {
        this.DOM.innerText = "";
        await this.addLogo(this.DOM)
        await this.showProfilPhotographe();
        this.addFilterImage();
        this.mediaProfilIn = document.createElement('div');
        this.mediaProfilIn.setAttribute('class', 'mediaProfilIn');
        this.DOM.appendChild(this.mediaProfilIn);
        await this.showMediaProfil();
        await this.showFormModal();
        this.banniere = new BanierePhotographe(this.DOM, this.totalLikes, this.price);
    }


    /**
     * Gestion de l'affichage des media en fonction de l'interaction de l'utilisateur 
     *
     * @return  {HTMLElement}  
     */
    async render() {
        this.mediaProfilIn.innerText = "";
        await this.showMediaProfil();
    }


    /**
     * Affichage de la vignette photographe en récuperant la class "PhofilPhotographe"
     *
     * @return  {HTMLElement}
     */
    async showProfilPhotographe() {
        const data = await this.dataManager.getPhotographerById(this.id);
        this.price = data.price;
        const newProfil = new ProfilPhotographe(data, this.DOM);
    }


    /**
     * Ajout du bouton de filtre des images en récuperant la class newFilterImage
     *
     * @return  {HTMLElement} 
     */
    async addFilterImage() {
        const newFilterImage = new FilterImage(this.DOM, this.filters, this.updateFilter.bind(this));
    }


    /**
     * Affichage des media en récuperant la class mediaProfil
     *
     * @return  {HTMLElement}
     */
    async showMediaProfil() {
        const data = await this.dataManager.getOrderedMedia(this.id, this.currentFilter);
        this.list = data;

        const titreOption = document.querySelector('.titreOption');
        this.totalLikes = 0;
        data.forEach(media => {
            new MediaProfil(media, this.mediaProfilIn, {
                lightbox: this.showLightbox.bind(this),
                likes: this.updateLikesToTotal.bind(this)
            });
            this.totalLikes += media.likes;
        });
    }


    /**
     * Affichage de la lightbox en récuperant la class lightbox 
     *
     * @return  {HTMLElement}
     */
    async showLightbox(dataMedia) {
        new Lightbox(this.DOM, { ...dataMedia, list: this.list });
    }


    /**
     * Affichage du formulaire en récuperant la class FormModal
     *
     * @return  {Form}  [return description]
     */
    async showFormModal() {
        const data = await this.dataManager.getPhotographerById(this.id);

        const form = new FormModal(this.DOM, data.name);
    }

    /**
     * [addLikesToTotal description]
     *
     * @param   {Boolean}  add  true : ajoute false : retitre
     *
     * @return  {void}       [return description]
     */
    updateLikesToTotal(add) {
        this.totalLikes += add ? 1 : -1;
        this.banniere.updateLikes(this.totalLikes);
    }


    /**
     * Gestion du filtre des images 
     *
     * @param   {ListeningState}  filter  [filter description]
     *
     * @return  {[Array}          [return description]
     */
    updateFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }


    /**
     * Ajout du logo
     *
     * @param   {HTMLElement}  parent  [parent description]
     *
     * @return  {HTMLElement}          [return description]
     */
    addLogo(parent) {
        this.logo = document.createElement('a');
        this.logo.classList.add('logoPhotographerPage')
        this.logo.setAttribute('href', 'index.html')
        this.logo.innerHTML = `
            <img class='logoFishEye' alt='logo du site fish eye' src='Sample_Photos/logo/logo.png'>
        `;
        parent.appendChild(this.logo);
    }

}