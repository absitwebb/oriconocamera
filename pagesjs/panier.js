//variable img bannière
let formContact = document.querySelector(".formContact");
let suitecommande = document.getElementById("suitecommande");
let blocPanierTitle = document.getElementById("blocPanier-title");
let ImgbanniereCommande = "public/img/panier.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Votre panier");

//on va chercher dans le localstorage le produit
// on le transforme en objet (parse)
let addProduit = JSON.parse(localStorage.getItem("produit"));

// on vérifie si il y à un produit
const basketaffich = async () => {
  // si addProduit est vrai
  if (addProduit) {
    await addProduit;

    // on cache le formulaire
    formContact.classList.add("affichcontactnone");
    //on affiche le formulaire lorsqu'on clique sur le bouton continuer du récapitulatif
    suitecommande.addEventListener("click", () => {
      formContact.classList.remove("affichcontactnone");
    });
    // si produit dans le panier on chande de titre
    blocPanierTitle.innerHTML = `<h2 id="titre-panier">Panier</h2>`;
  }
};
basketaffich();
